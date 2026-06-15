// ── AUTH & USER SYSTEM ──
const AUTH = {
  user: null,
  db: null, // localStorage-based DB
};

// ── DATABASE (localStorage) ──
const DB = {
  get(key) {
    try { return JSON.parse(localStorage.getItem('deutsch_' + key)); } catch { return null; }
  },
  set(key, val) {
    try { localStorage.setItem('deutsch_' + key, JSON.stringify(val)); return true; } catch { return false; }
  },
  remove(key) {
    localStorage.removeItem('deutsch_' + key);
  }
};

// ── USER SCHEMA ──
function createUser(name, email, nativeLanguage) {
  return {
    id: 'user_' + Date.now(),
    name,
    email,
    nativeLanguage,
    createdAt: new Date().toISOString(),
    // Progress
    xp: 0,
    streak: 0,
    lastActive: new Date().toDateString(),
    wordsLearned: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    // Level tracking
    currentLevel: 'A1',
    levelsCompleted: [],
    // Module completion
    lessonsCompleted: [],
    diagnosticScores: [],
    // Certificate data
    certificates: [],
    // Daily plan
    planCompletedToday: [],
    // CEFR progress per skill
    skills: {
      listening: { score: 0, attempts: 0 },
      grammar: { score: 0, attempts: 0 },
      vocabulary: { score: 0, attempts: 0 },
      speaking: { score: 0, attempts: 0 },
      writing: { score: 0, attempts: 0 },
      reading: { score: 0, attempts: 0 },
    }
  };
}

// ── CEFR LEVEL TESTS ──
const LEVEL_TESTS = {
  A1: {
    label: 'A1 — Beginner',
    description: 'Basic phrases, simple introductions, familiar topics',
    passMark: 60,
    skills: ['listening', 'grammar', 'vocabulary', 'speaking', 'writing'],
    xpRequired: 0,
  },
  A2: {
    label: 'A2 — Elementary',
    description: 'Routine tasks, simple communication, personal information',
    passMark: 65,
    skills: ['listening', 'grammar', 'vocabulary', 'speaking', 'writing', 'reading'],
    xpRequired: 500,
  },
  B1: {
    label: 'B1 — Intermediate',
    description: 'Main points of clear topics, travel, personal interests',
    passMark: 70,
    skills: ['listening', 'grammar', 'vocabulary', 'speaking', 'writing', 'reading'],
    xpRequired: 2000,
  },
};

// ── AUTH FUNCTIONS ──
function initAuth() {
  const savedUser = DB.get('currentUser');
  if (savedUser) {
    AUTH.user = savedUser;
    syncStateWithUser();
    showApp();
  } else {
    showAuthScreen();
  }
}

function register(name, email, nativeLanguage) {
  if (!name || !email) return false;
  const user = createUser(name.trim(), email.trim().toLowerCase(), nativeLanguage);
  DB.set('user_' + user.id, user);
  DB.set('currentUser', user);
  AUTH.user = user;
  syncStateWithUser();
  showApp();
  showNotif(`Welcome, ${name}! Let's get you to B1. 🇩🇪`);
  return true;
}

function login(email) {
  // Find user by email
  const keys = Object.keys(localStorage).filter(k => k.startsWith('deutsch_user_'));
  for (const key of keys) {
    try {
      const user = JSON.parse(localStorage.getItem(key));
      if (user && user.email === email.trim().toLowerCase()) {
        DB.set('currentUser', user);
        AUTH.user = user;
        syncStateWithUser();
        showApp();
        showNotif(`Welcome back, ${user.name}! 👋`);
        return true;
      }
    } catch {}
  }
  return false;
}

function logout() {
  saveUserProgress();
  DB.remove('currentUser');
  AUTH.user = null;
  showAuthScreen();
}

function saveUserProgress() {
  if (!AUTH.user) return;
  AUTH.user.xp = state.xp;
  AUTH.user.streak = state.streak;
  AUTH.user.wordsLearned = state.wordsLearned;
  AUTH.user.totalCorrect = state.totalCorrect;
  AUTH.user.totalAnswered = state.totalAnswered;
  AUTH.user.lastActive = new Date().toDateString();
  DB.set('user_' + AUTH.user.id, AUTH.user);
  DB.set('currentUser', AUTH.user);
}

function syncStateWithUser() {
  if (!AUTH.user) return;
  state.xp = AUTH.user.xp || 0;
  state.streak = AUTH.user.streak || 1;
  state.wordsLearned = AUTH.user.wordsLearned || 0;
  state.totalCorrect = AUTH.user.totalCorrect || 0;
  state.totalAnswered = AUTH.user.totalAnswered || 0;
  // Check streak
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (AUTH.user.lastActive === yesterday) {
    state.streak = (AUTH.user.streak || 0) + 1;
  } else if (AUTH.user.lastActive !== today) {
    state.streak = 1;
  }
  updateStats();
}

// Auto-save every 30 seconds
setInterval(() => { if (AUTH.user) saveUserProgress(); }, 30000);

// ── UI SHOW/HIDE ──
function showAuthScreen() {
  document.getElementById('auth-overlay').style.display = 'flex';
  document.getElementById('main-shell').style.display = 'none';
}

function showApp() {
  document.getElementById('auth-overlay').style.display = 'none';
  document.getElementById('main-shell').style.display = 'grid';
  if (AUTH.user) {
    document.getElementById('user-name-display').textContent = AUTH.user.name;
    document.getElementById('user-level-display').textContent = AUTH.user.currentLevel || 'A1';
  }
  updateStats();
}

// ── AUTH FORM HANDLING ──
function switchToLogin() {
  document.getElementById('auth-register').style.display = 'none';
  document.getElementById('auth-login').style.display = 'block';
  document.getElementById('auth-tab-register').classList.remove('active');
  document.getElementById('auth-tab-login').classList.add('active');
}

function switchToRegister() {
  document.getElementById('auth-login').style.display = 'none';
  document.getElementById('auth-register').style.display = 'block';
  document.getElementById('auth-tab-login').classList.remove('active');
  document.getElementById('auth-tab-register').classList.add('active');
}

function submitRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const lang = document.getElementById('reg-lang').value;
  const err = document.getElementById('reg-error');
  if (!name || !email) { err.textContent = 'Name and email are required.'; return; }
  if (!email.includes('@')) { err.textContent = 'Enter a valid email.'; return; }
  const ok = register(name, email, lang);
  if (!ok) { err.textContent = 'Something went wrong. Try again.'; }
}

function submitLogin() {
  const email = document.getElementById('login-email').value.trim();
  const err = document.getElementById('login-error');
  if (!email) { err.textContent = 'Enter your email.'; return; }
  const ok = login(email);
  if (!ok) { err.textContent = 'No account found with that email. Register first.'; }
}

// ── SKILL TRACKING ──
function recordSkillScore(skill, correct, total) {
  if (!AUTH.user) return;
  if (!AUTH.user.skills[skill]) AUTH.user.skills[skill] = { score: 0, attempts: 0 };
  AUTH.user.skills[skill].score = Math.round(
    (AUTH.user.skills[skill].score * AUTH.user.skills[skill].attempts + (correct / total * 100)) /
    (AUTH.user.skills[skill].attempts + 1)
  );
  AUTH.user.skills[skill].attempts++;
  saveUserProgress();
  checkLevelEligibility();
}

function checkLevelEligibility() {
  if (!AUTH.user) return;
  const level = AUTH.user.currentLevel || 'A1';
  const test = LEVEL_TESTS[level];
  if (!test) return;
  if (state.xp >= test.xpRequired) {
    const skillAvg = Object.values(AUTH.user.skills)
      .filter(s => s.attempts > 0)
      .reduce((sum, s) => sum + s.score, 0) /
      Math.max(Object.values(AUTH.user.skills).filter(s => s.attempts > 0).length, 1);
    if (skillAvg >= test.passMark) showLevelUnlock(level);
  }
}

function showLevelUnlock(level) {
  const existing = document.getElementById('level-unlock-banner');
  if (existing) return;
  const banner = document.createElement('div');
  banner.id = 'level-unlock-banner';
  banner.style.cssText = 'position:fixed;bottom:80px;right:24px;background:var(--black);color:white;padding:16px 20px;border-radius:var(--radius-lg);z-index:1000;max-width:280px;box-shadow:0 8px 32px rgba(0,0,0,0.3)';
  banner.innerHTML = `
    <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:4px">YOU'RE READY</div>
    <div style="font-size:18px;font-weight:700;margin-bottom:8px">Take the ${level} Test 🎯</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:12px">Your scores qualify you to attempt the ${level} certificate exam.</div>
    <button onclick="nav('certificates');document.getElementById('level-unlock-banner').remove()" style="width:100%;padding:10px;background:white;color:black;border:none;border-radius:var(--radius);font-weight:600;cursor:pointer;font-size:13px">Take the test →</button>
    <button onclick="this.parentElement.remove()" style="width:100%;padding:8px;background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:12px;margin-top:4px">Dismiss</button>
  `;
  document.body.appendChild(banner);
}

// ── CERTIFICATE SYSTEM ──
function issueCertificate(level, scores) {
  if (!AUTH.user) return null;
  const cert = {
    id: 'CERT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    userId: AUTH.user.id,
    userName: AUTH.user.name,
    level,
    cefrLevel: level,
    issueDate: new Date().toISOString(),
    scores,
    overallScore: Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length),
    verificationUrl: `https://esa8urcookies.github.io/deutsch-app/verify?id=`,
    appName: 'Deutsch.app',
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  };
  cert.verificationUrl += cert.id;
  if (!AUTH.user.certificates) AUTH.user.certificates = [];
  AUTH.user.certificates.push(cert);
  AUTH.user.levelsCompleted = AUTH.user.levelsCompleted || [];
  if (!AUTH.user.levelsCompleted.includes(level)) AUTH.user.levelsCompleted.push(level);
  // Advance level
  const levels = ['A1', 'A2', 'B1', 'B2'];
  const nextIndex = levels.indexOf(level) + 1;
  if (nextIndex < levels.length) AUTH.user.currentLevel = levels[nextIndex];
  saveUserProgress();
  return cert;
}

function generateCertificatePDF(cert) {
  // Generate a printable HTML certificate in a new window
  const issueDate = new Date(cert.issueDate).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const validUntil = new Date(cert.validUntil).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const skillLabels = {
    listening: 'Listening Comprehension',
    grammar: 'Grammar Accuracy',
    vocabulary: 'Vocabulary',
    speaking: 'Speaking Output',
    writing: 'Free Writing',
    reading: 'Reading Comprehension',
  };

  const certHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Certificate — ${cert.userName} — ${cert.cefrLevel}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #f5f5f3; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 40px; }
  .cert { width: 794px; min-height: 560px; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .cert-top { background: #0e0e0e; color: white; padding: 48px 56px 40px; position: relative; }
  .cert-top::after { content: ''; position: absolute; bottom: -20px; left: 0; right: 0; height: 40px; background: #0e0e0e; clip-path: ellipse(55% 100% at 50% 0%); }
  .cert-logo { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: rgba(255,255,255,0.5); margin-bottom: 32px; letter-spacing: -0.5px; }
  .cert-logo span { color: white; }
  .cert-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px; }
  .cert-level { font-family: 'Space Grotesk', sans-serif; font-size: 64px; font-weight: 700; color: white; letter-spacing: -3px; line-height: 1; margin-bottom: 4px; }
  .cert-level-name { font-size: 18px; color: rgba(255,255,255,0.6); font-weight: 400; }
  .cert-body { padding: 56px 56px 40px; }
  .cert-certifies { font-size: 13px; color: #a0a09c; margin-bottom: 8px; }
  .cert-name { font-family: 'Space Grotesk', sans-serif; font-size: 38px; font-weight: 700; color: #0e0e0e; letter-spacing: -1px; margin-bottom: 16px; border-bottom: 2px solid #0e0e0e; padding-bottom: 16px; }
  .cert-desc { font-size: 14px; color: #636360; line-height: 1.6; margin-bottom: 32px; max-width: 500px; }
  .cert-scores { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 36px; }
  .score-item { background: #f7f7f6; border-radius: 8px; padding: 12px 14px; }
  .score-num { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; color: #0e0e0e; }
  .score-lbl { font-size: 11px; color: #a0a09c; margin-top: 2px; }
  .cert-footer { display: flex; justify-content: space-between; align-items: flex-end; padding-top: 24px; border-top: 1px solid #eeeeec; }
  .cert-meta { font-size: 12px; color: #a0a09c; line-height: 1.8; }
  .cert-meta strong { color: #0e0e0e; }
  .cert-id { font-size: 11px; color: #d8d8d5; font-family: monospace; }
  .cert-overall { text-align: right; }
  .cert-overall .big { font-family: 'Space Grotesk', sans-serif; font-size: 48px; font-weight: 700; color: #0e0e0e; letter-spacing: -2px; }
  .cert-overall .sm { font-size: 12px; color: #a0a09c; }
  .verify-box { background: #f7f7f6; border-radius: 8px; padding: 10px 14px; margin-top: 16px; }
  .verify-box .vl { font-size: 10px; color: #a0a09c; text-transform: uppercase; letter-spacing: 0.06em; }
  .verify-box .vu { font-size: 11px; color: #0e0e0e; font-family: monospace; word-break: break-all; }
  @media print { body { background: white; padding: 0; } .cert { box-shadow: none; border-radius: 0; } }
</style>
</head>
<body>
<div class="cert">
  <div class="cert-top">
    <div class="cert-logo"><span>Deutsch</span>.app</div>
    <div class="cert-label">CEFR Certificate of Achievement</div>
    <div class="cert-level">${cert.cefrLevel}</div>
    <div class="cert-level-name">${LEVEL_TESTS[cert.cefrLevel]?.description || 'German Language Proficiency'}</div>
  </div>
  <div class="cert-body">
    <div class="cert-certifies">This certifies that</div>
    <div class="cert-name">${cert.userName}</div>
    <div class="cert-desc">has successfully demonstrated German language proficiency at the <strong>${cert.cefrLevel}</strong> level of the Common European Framework of Reference for Languages (CEFR), achieving a score of <strong>${cert.overallScore}%</strong> across all assessed skills.</div>
    <div class="cert-scores">
      ${Object.entries(cert.scores).map(([skill, score]) => `
        <div class="score-item">
          <div class="score-num">${score}%</div>
          <div class="score-lbl">${skillLabels[skill] || skill}</div>
        </div>
      `).join('')}
    </div>
    <div class="cert-footer">
      <div>
        <div class="cert-meta">
          <strong>Issue date:</strong> ${issueDate}<br>
          <strong>Valid until:</strong> ${validUntil}<br>
          <strong>Standard:</strong> CEFR (Council of Europe)
        </div>
        <div class="cert-id" style="margin-top:8px">ID: ${cert.id}</div>
        <div class="verify-box">
          <div class="vl">Verify this certificate</div>
          <div class="vu">${cert.verificationUrl}</div>
        </div>
      </div>
      <div class="cert-overall">
        <div class="big">${cert.overallScore}%</div>
        <div class="sm">Overall score</div>
      </div>
    </div>
  </div>
</div>
<script>window.onload = () => window.print();<\/script>
</body>
</html>`;

  const win = window.open('', '_blank');
  win.document.write(certHTML);
  win.document.close();
}

// ── CERTIFICATE PAGE ──
function initCertificates() {
  renderCertificatePage();
}

function renderCertificatePage() {
  const c = document.getElementById('cert-content');
  if (!AUTH.user) { c.innerHTML = '<p style="color:var(--gray-600)">Please log in to access certificates.</p>'; return; }

  const user = AUTH.user;
  const levels = ['A1', 'A2', 'B1'];
  const earnedCerts = user.certificates || [];

  c.innerHTML = `
    <div style="max-width:680px">
      <div style="margin-bottom:28px">
        <h2 style="font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:700;margin-bottom:8px">Your Certificates</h2>
        <p style="font-size:14px;color:var(--gray-600);line-height:1.6">CEFR-aligned certificates you've earned. Each certificate is downloadable as a PDF and includes a verification URL employers can check.</p>
      </div>

      ${earnedCerts.length > 0 ? `
        <div style="margin-bottom:32px">
          <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--gray-400);margin-bottom:12px">Earned certificates</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${earnedCerts.map(cert => `
              <div style="background:var(--black);color:white;border-radius:var(--radius-lg);padding:24px 28px;display:flex;align-items:center;gap:20px">
                <div style="font-family:'Space Grotesk',sans-serif;font-size:42px;font-weight:700;letter-spacing:-2px;min-width:80px">${cert.cefrLevel}</div>
                <div style="flex:1">
                  <div style="font-size:16px;font-weight:600;margin-bottom:2px">${cert.userName}</div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:4px">Issued ${new Date(cert.issueDate).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>
                  <div style="font-size:12px;color:rgba(255,255,255,0.3);font-family:monospace">${cert.id}</div>
                </div>
                <div style="text-align:right">
                  <div style="font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;margin-bottom:4px">${cert.overallScore}%</div>
                  <button onclick='generateCertificatePDF(${JSON.stringify(cert).replace(/'/g,"\\'")})'
                    style="padding:8px 16px;background:white;color:black;border:none;border-radius:var(--radius);font-size:12px;font-weight:600;cursor:pointer">
                    ↓ Download PDF
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--gray-400);margin-bottom:12px">Available level tests</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:32px">
        ${levels.map(level => {
          const test = LEVEL_TESTS[level];
          const earned = earnedCerts.find(c => c.cefrLevel === level);
          const eligible = state.xp >= test.xpRequired;
          const skillAvg = Object.values(user.skills || {})
            .filter(s => s.attempts > 0)
            .reduce((sum, s, _, arr) => sum + s.score / arr.length, 0);
          const readyToTest = eligible && skillAvg >= 40;

          return `
            <div style="background:var(--white);border:1px solid ${earned ? 'var(--green)' : 'var(--gray-100)'};border-radius:var(--radius-lg);padding:20px 24px;display:flex;align-items:center;gap:16px">
              <div style="font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:${earned ? 'var(--green)' : 'var(--black)'};min-width:56px">${level}</div>
              <div style="flex:1">
                <div style="font-size:15px;font-weight:600;margin-bottom:2px">${test.label}</div>
                <div style="font-size:13px;color:var(--gray-600);margin-bottom:6px">${test.description}</div>
                <div style="font-size:12px;color:var(--gray-400)">Requires ${test.xpRequired} XP · ${test.passMark}% pass mark · ${test.skills.length} skills tested</div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                ${earned
                  ? `<div style="color:var(--green);font-weight:600;font-size:14px">✓ Earned</div><div style="font-size:12px;color:var(--gray-400)">${earned.overallScore}%</div>`
                  : readyToTest
                    ? `<button onclick="startLevelTest('${level}')" style="padding:10px 18px;background:var(--black);color:white;border:none;border-radius:var(--radius);font-size:13px;font-weight:600;cursor:pointer">Take test →</button>`
                    : `<div style="font-size:12px;color:var(--gray-400);text-align:center">Need ${Math.max(0, test.xpRequired - state.xp)} more XP</div><div style="width:80px;height:4px;background:var(--gray-100);border-radius:2px;margin-top:6px"><div style="height:100%;background:var(--gray-400);border-radius:2px;width:${Math.min(100, state.xp / Math.max(test.xpRequired,1) * 100)}%"></div></div>`
                }
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="background:var(--gray-50);border-radius:var(--radius-lg);padding:20px 24px">
        <div style="font-size:13px;font-weight:600;color:var(--black);margin-bottom:6px">About these certificates</div>
        <div style="font-size:13px;color:var(--gray-600);line-height:1.7">Deutsch.app certificates are aligned to the Common European Framework of Reference for Languages (CEFR) — the international standard used across Europe. They are accepted by many employers and educational institutions as proof of language proficiency. For official government or immigration purposes, a Goethe-Institut or telc examination is required.</div>
      </div>
    </div>
  `;
}

// ── LEVEL TEST ──
const LEVEL_TEST_QS = {
  A1: {
    listening: [
      {phrase:'Guten Morgen! Wie heißen Sie?',q:'What is being asked?',opts:['What time is it?','What is your name?','Where are you from?','How are you?'],correct:1,explain:'Wie heißen Sie = What is your name?'},
      {phrase:'Ich komme aus Amerika.',q:'Where does the person come from?',opts:['Germany','America','England','Spain'],correct:1,explain:'komme aus = come from. Amerika = America.'},
    ],
    grammar: [
      {q:'Ich ___ Student.',opts:['bin','bist','ist','sind'],correct:0,explain:'ich + sein = bin. First person singular.'},
      {q:'Das ist ___ Buch.',opts:['ein','eine','einen','einem'],correct:0,explain:'Buch is neuter, nominative = ein.'},
    ],
    vocabulary: [
      {q:'What does "Entschuldigung" mean?',opts:['Thank you','Please','Excuse me','Goodbye'],correct:2,explain:'Entschuldigung = Excuse me / Sorry.'},
      {q:'What does "Wo ist die Toilette?" mean?',opts:['Where is the exit?','Where is the toilet?','Where is the train?','Where is the hotel?'],correct:1,explain:'Wo ist = where is. Toilette = toilet.'},
    ],
    writing: [
      {prompt:'Write 3 sentences introducing yourself in German. Include your name, where you are from, and what you do.',minWords:10},
    ],
    speaking: [
      {de:'Ich heiße [your name]. Ich komme aus [your country].',en:'My name is... I come from...',tip:'Basic self-introduction — A1 core phrase.'},
    ],
  },
  A2: {
    listening: LISTENING_QS.slice(0, 4),
    grammar: GRAMMAR_QS.slice(0, 6),
    vocabulary: GRAMMAR_QS.slice(6, 10),
    writing: [
      {prompt:'Write 6–8 sentences about your daily routine in German. Use present tense and at least one "weil" sentence.',minWords:40},
    ],
    speaking: [
      {de:'Ich wohne seit fünf Jahren in Berlin und arbeite als Reinigungskraft.',en:'I have lived in Berlin for five years and work as a cleaner.',tip:'"seit" + present tense for ongoing situations.'},
      {de:'Könnten Sie mir bitte helfen? Ich suche den Bahnhof.',en:'Could you please help me? I\'m looking for the train station.',tip:'Conditional "Könnten" + direction asking.'},
    ],
  },
  B1: {
    listening: LISTENING_QS,
    grammar: GRAMMAR_QS,
    vocabulary: GRAMMAR_QS.slice(0, 8),
    writing: [
      {prompt:'Write 10–12 sentences about a challenge you faced recently and how you solved it. Use past tense, connectors (weil, obwohl, trotzdem), and varied vocabulary.',minWords:80},
    ],
    speaking: [
      {de:'Obwohl ich seit fünf Jahren in Deutschland lebe, finde ich die Sprache immer noch schwierig.',en:'Although I have lived in Germany for five years, I still find the language difficult.',tip:'"obwohl" sends verb to end of clause.'},
    ],
  },
};

let levelTestState = {
  level: null,
  phase: 'intro', // intro → listening → grammar → vocabulary → speaking → writing → results
  li: 0, gi: 0, vi: 0, si: 0, wi: 0,
  scores: { listening: 0, grammar: 0, vocabulary: 0, speaking: 0, writing: 0 },
  maxScores: { listening: 0, grammar: 0, vocabulary: 0, speaking: 0, writing: 0 },
};

function startLevelTest(level) {
  const qs = LEVEL_TEST_QS[level];
  if (!qs) return;
  levelTestState = {
    level,
    phase: 'listening',
    li: 0, gi: 0, vi: 0, si: 0, wi: 0,
    scores: { listening: 0, grammar: 0, vocabulary: 0, speaking: 0, writing: 0 },
    maxScores: {
      listening: qs.listening.length,
      grammar: qs.grammar.length,
      vocabulary: qs.vocabulary.length,
      speaking: qs.speaking.length,
      writing: qs.writing.length,
    },
  };
  renderLevelTest();
}

function renderLevelTest() {
  const c = document.getElementById('cert-content');
  const { level, phase } = levelTestState;
  const qs = LEVEL_TEST_QS[level];

  if (phase === 'results') {
    const pcts = {};
    Object.keys(levelTestState.scores).forEach(skill => {
      const max = levelTestState.maxScores[skill];
      pcts[skill] = max > 0 ? Math.round(levelTestState.scores[skill] / max * 100) : 75;
    });
    const overall = Math.round(Object.values(pcts).reduce((a, b) => a + b, 0) / Object.values(pcts).length);
    const passed = overall >= LEVEL_TESTS[level].passMark;

    if (passed) {
      const cert = issueCertificate(level, pcts);
      c.innerHTML = `
        <div style="max-width:560px">
          <div style="background:var(--black);color:white;border-radius:var(--radius-xl);padding:40px;text-align:center;margin-bottom:24px">
            <div style="font-size:48px;margin-bottom:8px">🎓</div>
            <div style="font-family:'Space Grotesk',sans-serif;font-size:42px;font-weight:700;letter-spacing:-2px;margin-bottom:4px">${level} Passed</div>
            <div style="font-size:15px;color:rgba(255,255,255,0.5);margin-bottom:20px">${overall}% overall · Certificate issued</div>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
              ${Object.entries(pcts).map(([s,p]) => `<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 14px"><div style="font-size:20px;font-weight:700">${p}%</div><div style="font-size:11px;color:rgba(255,255,255,0.4)">${s}</div></div>`).join('')}
            </div>
          </div>
          <div style="display:flex;gap:10px">
            <button onclick='generateCertificatePDF(${JSON.stringify(cert).replace(/'/g,"\\'")})'
              style="flex:1;padding:14px;background:var(--black);color:white;border:none;border-radius:var(--radius-lg);font-size:14px;font-weight:600;cursor:pointer">↓ Download Certificate</button>
            <button onclick="renderCertificatePage()" style="padding:14px 20px;border:1px solid var(--gray-200);border-radius:var(--radius-lg);background:white;cursor:pointer;font-size:14px">Back</button>
          </div>
        </div>
      `;
    } else {
      c.innerHTML = `
        <div style="max-width:520px">
          <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-xl);padding:36px;text-align:center;margin-bottom:20px">
            <div style="font-size:42px;margin-bottom:8px">📚</div>
            <div style="font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;margin-bottom:4px">Not yet — ${overall}%</div>
            <div style="font-size:14px;color:var(--gray-600);margin-bottom:20px">You need ${LEVEL_TESTS[level].passMark}% to pass. Keep studying and try again.</div>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:20px">
              ${Object.entries(pcts).map(([s,p]) => `<div style="background:${p >= LEVEL_TESTS[level].passMark ? 'var(--green-light)' : 'var(--red-light)'};border-radius:8px;padding:10px 14px"><div style="font-size:18px;font-weight:700;color:${p >= LEVEL_TESTS[level].passMark ? 'var(--green)' : 'var(--red)'}">${p}%</div><div style="font-size:11px;color:var(--gray-600)">${s}</div></div>`).join('')}
            </div>
            <div style="font-size:14px;color:var(--gray-600)">Focus on your red scores. Come back when you feel ready.</div>
          </div>
          <div style="display:flex;gap:10px">
            <button onclick="startLevelTest('${level}')" style="flex:1;padding:14px;background:var(--black);color:white;border:none;border-radius:var(--radius-lg);font-size:14px;font-weight:600;cursor:pointer">Try again</button>
            <button onclick="renderCertificatePage()" style="padding:14px 20px;border:1px solid var(--gray-200);border-radius:var(--radius-lg);background:white;cursor:pointer;font-size:14px">Back</button>
          </div>
        </div>
      `;
    }
    return;
  }

  // Render current phase question
  if (phase === 'listening') {
    if (levelTestState.li >= qs.listening.length) { levelTestState.phase = 'grammar'; renderLevelTest(); return; }
    const q = qs.listening[levelTestState.li];
    const total = qs.listening.length;
    c.innerHTML = `
      <div style="max-width:540px">
        <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${level} Test · Listening ${levelTestState.li+1}/${total}</div>
        <div style="height:4px;background:var(--gray-100);border-radius:2px;margin-bottom:24px"><div style="height:100%;background:var(--black);border-radius:2px;width:${levelTestState.li/total*100}%"></div></div>
        <div class="quiz-card">
          <div style="background:var(--gray-50);border-radius:var(--radius);padding:16px;text-align:center;margin-bottom:16px">
            <div id="lt-phrase" style="font-size:18px;font-weight:600;filter:blur(10px);transition:filter 0.3s;margin-bottom:10px">${q.phrase}</div>
            <button class="btn-secondary" onclick="ltPlay('${q.phrase.replace(/'/g,"\\'")}')">▶ Play audio</button>
          </div>
          <div class="quiz-q">${q.q}</div>
          <div class="quiz-opts" id="lt-opts">${q.opts.map((o,i)=>`<button class="quiz-opt" onclick="ltAnswer(this,${i},${q.correct},'${(q.explain||'').replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div>
          <div class="quiz-feedback" id="lt-feedback"></div>
        </div>
        <div class="btn-row right"><button class="btn-primary" id="lt-next" onclick="levelTestState.li++;renderLevelTest()" style="display:none">Next →</button></div>
      </div>
    `;
    window._ltPlayed = 0;
  } else if (phase === 'grammar') {
    if (levelTestState.gi >= qs.grammar.length) { levelTestState.phase = 'vocabulary'; renderLevelTest(); return; }
    const q = qs.grammar[levelTestState.gi];
    c.innerHTML = `
      <div style="max-width:540px">
        <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${level} Test · Grammar ${levelTestState.gi+1}/${qs.grammar.length}</div>
        <div style="height:4px;background:var(--gray-100);border-radius:2px;margin-bottom:24px"><div style="height:100%;background:var(--black);border-radius:2px;width:${levelTestState.gi/qs.grammar.length*100}%"></div></div>
        <div class="quiz-card">
          <div class="quiz-q">"${q.q}"</div>
          <div class="quiz-opts" id="ltg-opts">${q.opts.map((o,i)=>`<button class="quiz-opt" onclick="ltgAnswer(this,${i},${q.correct},'${(q.explain||'').replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div>
          <div class="quiz-feedback" id="ltg-feedback"></div>
        </div>
        <div class="btn-row right"><button class="btn-primary" id="ltg-next" onclick="levelTestState.gi++;renderLevelTest()" style="display:none">Next →</button></div>
      </div>
    `;
  } else if (phase === 'vocabulary') {
    if (levelTestState.vi >= qs.vocabulary.length) { levelTestState.phase = 'speaking'; renderLevelTest(); return; }
    const q = qs.vocabulary[levelTestState.vi];
    c.innerHTML = `
      <div style="max-width:540px">
        <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${level} Test · Vocabulary ${levelTestState.vi+1}/${qs.vocabulary.length}</div>
        <div style="height:4px;background:var(--gray-100);border-radius:2px;margin-bottom:24px"><div style="height:100%;background:var(--black);border-radius:2px;width:${levelTestState.vi/qs.vocabulary.length*100}%"></div></div>
        <div class="quiz-card">
          <div class="quiz-q">"${q.q}"</div>
          <div class="quiz-opts" id="ltv-opts">${q.opts.map((o,i)=>`<button class="quiz-opt" onclick="ltvAnswer(this,${i},${q.correct},'${(q.explain||'').replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div>
          <div class="quiz-feedback" id="ltv-feedback"></div>
        </div>
        <div class="btn-row right"><button class="btn-primary" id="ltv-next" onclick="levelTestState.vi++;renderLevelTest()" style="display:none">Next →</button></div>
      </div>
    `;
  } else if (phase === 'speaking') {
    if (levelTestState.si >= qs.speaking.length) { levelTestState.phase = 'writing'; renderLevelTest(); return; }
    const sq = qs.speaking[levelTestState.si];
    c.innerHTML = `
      <div style="max-width:520px">
        <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${level} Test · Speaking ${levelTestState.si+1}/${qs.speaking.length}</div>
        <div style="height:4px;background:var(--gray-100);border-radius:2px;margin-bottom:24px"><div style="height:100%;background:var(--black);border-radius:2px;width:${levelTestState.si/qs.speaking.length*100}%"></div></div>
        <div class="speak-prompt-box">
          <div class="speak-topic-label">Say this sentence in German</div>
          <div class="speak-topic-text">${sq.de}</div>
          <div class="speak-topic-hint">${sq.en}</div>
        </div>
        <button class="btn-secondary" style="width:100%;justify-content:center;margin-bottom:12px" onclick="speakText('${sq.de.replace(/'/g,"\\'")}')">▶ Hear it first</button>
        <div style="font-size:14px;font-weight:500;margin-bottom:10px">Rate your attempt honestly:</div>
        <div class="rate-grid">
          <button class="rate-btn" onclick="ltSpeak(0)">Couldn't say it</button>
          <button class="rate-btn" onclick="ltSpeak(1)">Broken attempt</button>
          <button class="rate-btn" onclick="ltSpeak(2)">Got it roughly</button>
          <button class="rate-btn" onclick="ltSpeak(3)">Said it cleanly</button>
          <button class="rate-btn" onclick="ltSpeak(3)">Perfect</button>
        </div>
        <div style="margin-top:10px;padding:10px 14px;background:var(--amber-light);border-radius:var(--radius);font-size:13px;color:var(--amber)">${sq.tip}</div>
        <div class="btn-row right"><button class="btn-primary" id="lts-next" onclick="levelTestState.si++;renderLevelTest()" style="display:none">Next →</button></div>
      </div>
    `;
  } else if (phase === 'writing') {
    if (levelTestState.wi >= qs.writing.length) { levelTestState.phase = 'results'; renderLevelTest(); return; }
    const wq = qs.writing[levelTestState.wi];
    c.innerHTML = `
      <div style="max-width:560px">
        <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${level} Test · Writing</div>
        <div style="height:4px;background:var(--gray-100);border-radius:2px;margin-bottom:24px"><div style="height:100%;background:var(--black);border-radius:2px;width:80%"></div></div>
        <div class="quiz-card">
          <div class="quiz-q">Free Writing</div>
          <div class="quiz-q-sub">${wq.prompt}</div>
          <div style="font-size:12px;color:var(--gray-400);margin-bottom:12px">Minimum ${wq.minWords} words</div>
          <textarea class="dump-textarea" id="ltw-ta" rows="6" placeholder="Schreib hier auf Deutsch..." oninput="document.getElementById('ltw-wc').textContent=this.value.trim().split(/\\s+/).filter(w=>w).length+' words'"></textarea>
          <div style="font-size:12px;color:var(--gray-400);margin-top:6px" id="ltw-wc">0 words</div>
          <div class="quiz-feedback" id="ltw-fb"></div>
          <button class="btn-primary" style="margin-top:12px" onclick="ltWriteSubmit(${wq.minWords})">Submit →</button>
        </div>
        <div class="btn-row right"><button class="btn-primary" id="ltw-next" onclick="levelTestState.wi++;renderLevelTest()" style="display:none">Next →</button></div>
      </div>
    `;
  }
}

// Answer handlers
function ltPlay(phrase) {
  window._ltPlayed = (window._ltPlayed||0) + 1;
  if (window._ltPlayed >= 2) { const el = document.getElementById('lt-phrase'); if(el) el.style.filter='blur(0)'; }
  speakText(phrase);
}
function ltAnswer(el, i, correct, explain) {
  document.querySelectorAll('#lt-opts .quiz-opt').forEach(o=>{o.disabled=true;o.onclick=null});
  document.getElementById('lt-phrase').style.filter='blur(0)';
  const fb = document.getElementById('lt-feedback');
  if(i===correct){el.classList.add('correct');levelTestState.scores.listening++;fb.className='quiz-feedback show ok';fb.textContent='✓ '+explain;}
  else{el.classList.add('wrong');document.querySelectorAll('#lt-opts .quiz-opt')[correct].classList.add('correct');fb.className='quiz-feedback show bad';fb.textContent='✗ '+explain;}
  document.getElementById('lt-next').style.display='inline-flex';
}
function ltgAnswer(el,i,correct,explain){
  document.querySelectorAll('#ltg-opts .quiz-opt').forEach(o=>{o.disabled=true;o.onclick=null});
  const fb=document.getElementById('ltg-feedback');
  if(i===correct){el.classList.add('correct');levelTestState.scores.grammar++;fb.className='quiz-feedback show ok';fb.textContent='✓ '+explain;}
  else{el.classList.add('wrong');document.querySelectorAll('#ltg-opts .quiz-opt')[correct].classList.add('correct');fb.className='quiz-feedback show bad';fb.textContent='✗ '+explain;}
  document.getElementById('ltg-next').style.display='inline-flex';
}
function ltvAnswer(el,i,correct,explain){
  document.querySelectorAll('#ltv-opts .quiz-opt').forEach(o=>{o.disabled=true;o.onclick=null});
  const fb=document.getElementById('ltv-feedback');
  if(i===correct){el.classList.add('correct');levelTestState.scores.vocabulary++;fb.className='quiz-feedback show ok';fb.textContent='✓ '+explain;}
  else{el.classList.add('wrong');document.querySelectorAll('#ltv-opts .quiz-opt')[correct].classList.add('correct');fb.className='quiz-feedback show bad';fb.textContent='✗ '+explain;}
  document.getElementById('ltv-next').style.display='inline-flex';
}
function ltSpeak(score){
  levelTestState.scores.speaking += score/3;
  const next = document.getElementById('lts-next');
  if(next) next.style.display='inline-flex';
}
function ltWriteSubmit(minWords){
  const text=(document.getElementById('ltw-ta')||{}).value||'';
  const wc=text.trim().split(/\s+/).filter(w=>w).length;
  const fb=document.getElementById('ltw-fb');
  if(wc < minWords){fb.className='quiz-feedback show bad';fb.textContent=`Write at least ${minWords} words. You have ${wc}.`;return;}
  const hasVerb=/\b(bin|habe|mache|gehe|wohne|arbeite|lerne|war|hatte|gibt|ist|sind|kann|muss)\b/i.test(text);
  const hasPast=/\b(habe|hatte|war|bin|machte|gearbeitet|gewesen|gemacht)\b/i.test(text);
  const hasConn=/\b(weil|aber|und|oder|dass|wenn|obwohl|trotzdem|deshalb)\b/i.test(text);
  const score=Math.min((wc>=minWords*1.5?0.4:wc>=minWords?0.3:0.1)+(hasVerb?0.2:0)+(hasPast?0.2:0)+(hasConn?0.2:0),1);
  levelTestState.scores.writing=score;
  fb.className=`quiz-feedback show ${score>=0.5?'ok':'bad'}`;
  fb.textContent=score>=0.7?'Strong writing. Good variety.':score>=0.5?'Decent. Use more connectors.':'Too simple. Push for variety.';
  document.getElementById('ltw-next').style.display='inline-flex';
}
