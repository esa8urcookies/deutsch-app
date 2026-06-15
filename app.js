// ── STATE ──
const state = {
  xp: 0, streak: 1, wordsLearned: 0, totalCorrect: 0, totalAnswered: 0,
  planDone: [true, false, false, false],
  vocabFilter: 'all', vocabIndex: 0, vocabCorrect: 0, vocabShown: 0, vocabRevealed: false,
  wgBest: 0, wgPlayed: 0, wgTotalCorrect: 0, wgTotalAttempted: 0,
  wgTimer: null, wgSecs: 60, wgStreak: 0, wgCorrect: 0, wgTotal: 0, wgCurrentWord: null,
  gqIndex: 0, gqScore: 0, gqActive: false,
  lqIndex: 0,
  bdPhase: 'intro', bdTimer: null, bdSecs: 600,
  spPhase: 'intro', spTimer: null, spSecs: 600, spTopicIndex: 0, spTopicSecs: 60, spLog: [],
  micOn: false,
};

// ── NAVIGATION ──
function nav(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const navMap = {home:'home',vocab:'vocab',lessons:'lessons',wordgame:'wordgame',diagnostic:'diagnostic',braindump:'braindump',speaking:'speaking',grammar:'grammar',listening:'listening'};
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick') && n.getAttribute('onclick').includes(`'${page}'`)) n.classList.add('active');
  });
  if (page === 'grammar') initGrammarQuiz();
  if (page === 'listening') initListeningQuiz();
  if (page === 'diagnostic') initDiagnostic();
  if (page === 'braindump') initBrainDump();
  if (page === 'speaking') initSpeakingDrill();
  updateStats();
}

// ── STATS ──
function addXP(amt) {
  state.xp += amt;
  updateStats();
  showNotif(`+${amt} XP ⚡`);
}

function updateStats() {
  const acc = state.totalAnswered > 0 ? Math.round((state.totalCorrect / state.totalAnswered) * 100) : 0;
  document.getElementById('xp-display').textContent = state.xp;
  document.getElementById('vocab-xp') && (document.getElementById('vocab-xp').textContent = state.xp);
  document.getElementById('gq-xp-disp') && (document.getElementById('gq-xp-disp').textContent = state.xp);
  document.getElementById('ld-xp') && (document.getElementById('ld-xp').textContent = state.xp);
  document.getElementById('sb-streak').textContent = state.streak;
  document.getElementById('sb-xp').textContent = state.xp;
  document.getElementById('stat-streak').textContent = state.streak;
  document.getElementById('stat-words').textContent = state.wordsLearned;
  document.getElementById('stat-correct').textContent = acc + '%';
  document.getElementById('stat-xp').textContent = state.xp;
}

function showNotif(msg) {
  const n = document.getElementById('notif');
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 2000);
}

function markPlan(i) {
  state.planDone[i] = true;
  const el = document.getElementById('plan-' + i);
  if (el) { el.classList.add('done'); el.textContent = '✓'; }
}

// ── VOCAB FLASHCARDS ──
function getFilteredVocab() {
  if (state.vocabFilter === 'all') return VOCAB;
  return VOCAB.filter(v => v.type === state.vocabFilter);
}

function setVocabFilter(f, el) {
  state.vocabFilter = f;
  state.vocabIndex = 0;
  state.vocabCorrect = 0;
  state.vocabShown = 0;
  document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  loadCard();
}

function loadCard() {
  const words = getFilteredVocab();
  if (!words.length) return;
  const w = words[state.vocabIndex % words.length];
  state.vocabRevealed = false;

  document.getElementById('fc-cat').textContent = w.cat || '';
  document.getElementById('fc-german').textContent = w.de;
  document.getElementById('fc-type').textContent = w.type === 'noun' ? `noun · ${w.gender === 'm' ? 'masculine' : w.gender === 'f' ? 'feminine' : 'neuter'}` : w.type;
  document.getElementById('fc-english').textContent = w.en;
  document.getElementById('fc-english').classList.remove('show');
  document.getElementById('fc-example').textContent = w.example || '';
  document.getElementById('fc-example').classList.remove('show');
  document.getElementById('fc-hint').textContent = 'tap to reveal';
  document.getElementById('fc-actions').style.display = 'none';

  const total = words.length;
  const cur = (state.vocabIndex % total) + 1;
  document.getElementById('fc-count').textContent = `${cur}/${total}`;
  document.getElementById('fc-prog').style.width = ((cur - 1) / total * 100) + '%';
  document.getElementById('fc-score').textContent = `${state.vocabCorrect} ✓`;
}

function revealCard() {
  if (state.vocabRevealed) return;
  state.vocabRevealed = true;
  document.getElementById('fc-english').classList.add('show');
  document.getElementById('fc-example').classList.add('show');
  document.getElementById('fc-hint').textContent = 'did you know it?';
  document.getElementById('fc-actions').style.display = 'flex';
}

function gradeCard(correct) {
  state.totalAnswered++;
  if (correct) {
    state.totalCorrect++;
    state.vocabCorrect++;
    state.wordsLearned++;
    addXP(10);
  }
  state.vocabIndex++;
  loadCard();
}

// init vocab
loadCard();

// ── LESSONS ──
function renderLessons() {
  const container = document.getElementById('lesson-list');
  container.innerHTML = LESSONS.map((l, i) => `
    <div class="lesson-item" onclick="openLesson(${l.id})">
      <div class="lesson-num">0${i + 1}</div>
      <div class="lesson-info">
        <h4>${l.title}</h4>
        <p>${l.tag} · ${l.mins} min read</p>
      </div>
      <div class="lesson-badge ${l.done ? 'badge-done' : 'badge-new'}">${l.done ? '✓ Done' : 'New'}</div>
    </div>
  `).join('');
}

function openLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;
  nav('lesson-detail');
  document.getElementById('lesson-detail-content').innerHTML = `
    <div style="max-width:640px">
      ${lesson.content}
      <div style="margin-top:28px;padding-top:20px;border-top:1px solid var(--gray-100)">
        <button class="btn-primary" onclick="completeLesson(${id})">Mark as complete ✓</button>
      </div>
    </div>
  `;
}

function completeLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (lesson) lesson.done = true;
  addXP(50);
  showNotif('Lesson complete! +50 XP');
  setTimeout(() => { nav('lessons'); renderLessons(); }, 800);
}

renderLessons();

// ── WORD GAME ──
let wgWords = [];
let wgMissed = [];

function buildWGWords() {
  wgWords = VOCAB.map(v => ({
    de: v.de, en: v.en.toLowerCase(),
    alts: [v.en.toLowerCase().split('/')[0].trim(), v.en.toLowerCase().split('/')[1]?.trim()].filter(Boolean)
  })).sort(() => Math.random() - 0.5);
}

function startWordGame() {
  buildWGWords();
  state.wgSecs = 60; state.wgStreak = 0; state.wgCorrect = 0; state.wgTotal = 0;
  state.wgPlayed++;
  document.getElementById('wg-intro').style.display = 'none';
  document.getElementById('wg-end').style.display = 'none';
  document.getElementById('wg-game').style.display = 'block';
  wgMissed = [];
  nextWGWord();
  if (state.wgTimer) clearInterval(state.wgTimer);
  state.wgTimer = setInterval(() => {
    state.wgSecs--;
    document.getElementById('wg-time').textContent = state.wgSecs;
    document.getElementById('wg-timer-bar').style.width = (state.wgSecs / 60 * 100) + '%';
    if (state.wgSecs <= 0) { clearInterval(state.wgTimer); endWordGame(); }
  }, 1000);
  document.getElementById('wg-input').focus();
}

function nextWGWord() {
  if (!wgWords.length) buildWGWords();
  state.wgCurrentWord = wgWords.shift();
  document.getElementById('wg-word').textContent = state.wgCurrentWord.de;
  document.getElementById('wg-hint').textContent = state.wgCurrentWord.de.startsWith('der ') ? 'masculine' : state.wgCurrentWord.de.startsWith('die ') ? 'feminine' : state.wgCurrentWord.de.startsWith('das ') ? 'neuter' : '';
  document.getElementById('wg-input').value = '';
  document.getElementById('wg-input').className = 'game-input';
  document.getElementById('wg-feedback').textContent = '';
  document.getElementById('wg-input').focus();
}

function wgKeydown(e) { if (e.key === 'Enter') submitWG(); }

function submitWG() {
  const val = document.getElementById('wg-input').value.trim().toLowerCase();
  if (!val || !state.wgCurrentWord) return;
  state.wgTotal++;
  const correct = state.wgCurrentWord.alts.some(a => a && val.includes(a.split('(')[0].trim())) ||
    val.replace(/[^a-z]/g, '') === state.wgCurrentWord.en.replace(/[^a-z]/g, '');
  if (correct) {
    state.wgCorrect++;
    state.wgStreak++;
    state.totalCorrect++; state.totalAnswered++;
    if (state.wgStreak > state.wgBest) state.wgBest = state.wgStreak;
    document.getElementById('wg-input').className = 'game-input correct';
    document.getElementById('wg-feedback').style.color = 'var(--green)';
    document.getElementById('wg-feedback').textContent = '✓ Richtig!';
    addXP(state.wgStreak >= 5 ? 15 : 10);
    setTimeout(nextWGWord, 400);
  } else {
    state.wgStreak = 0;
    state.totalAnswered++;
    wgMissed.push(state.wgCurrentWord);
    document.getElementById('wg-input').className = 'game-input wrong';
    document.getElementById('wg-feedback').style.color = 'var(--red)';
    document.getElementById('wg-feedback').textContent = `✗ "${state.wgCurrentWord.en}"`;
    setTimeout(nextWGWord, 900);
  }
  document.getElementById('wg-streak-live').textContent = state.wgStreak;
  document.getElementById('wg-correct-live').textContent = state.wgCorrect;
  document.getElementById('wg-streak').textContent = state.wgStreak;
}

function skipWG() { state.wgStreak = 0; document.getElementById('wg-streak-live').textContent = 0; nextWGWord(); }

function endWordGame() {
  document.getElementById('wg-game').style.display = 'none';
  document.getElementById('wg-end').style.display = 'block';
  const acc = state.wgTotal > 0 ? Math.round(state.wgCorrect / state.wgTotal * 100) : 0;
  state.wgTotalCorrect += state.wgCorrect;
  state.wgTotalAttempted += state.wgTotal;
  document.getElementById('wg-final-streak').textContent = '🔥' + state.wgBest;
  document.getElementById('wg-final-correct').textContent = state.wgCorrect;
  document.getElementById('wg-final-total').textContent = state.wgTotal;
  document.getElementById('wg-final-acc').textContent = acc + '%';
  document.getElementById('wg-best').textContent = state.wgBest;
  document.getElementById('wg-total-played').textContent = state.wgPlayed;
  const totalAcc = state.wgTotalAttempted > 0 ? Math.round(state.wgTotalCorrect / state.wgTotalAttempted * 100) + '%' : '—';
  document.getElementById('wg-accuracy').textContent = totalAcc;
  addXP(state.wgCorrect * 5);
}

function showWGIntro() {
  document.getElementById('wg-game').style.display = 'none';
  document.getElementById('wg-end').style.display = 'none';
  document.getElementById('wg-intro').style.display = 'block';
}

// ── GRAMMAR QUIZ ──
let gqQuestions = [];

function initGrammarQuiz() {
  if (state.gqActive) return;
  state.gqActive = true;
  gqQuestions = [...GRAMMAR_QS].sort(() => Math.random() - 0.5).slice(0, 10);
  state.gqIndex = 0; state.gqScore = 0;
  renderGQ();
}

function renderGQ() {
  const content = document.getElementById('gq-content');
  if (state.gqIndex >= gqQuestions.length) {
    const pct = Math.round(state.gqScore / gqQuestions.length * 100);
    state.gqActive = false;
    addXP(state.gqScore * 15);
    content.innerHTML = `
      <div style="max-width:520px">
        <div class="result-hero">
          <div class="result-level">${pct}%</div>
          <div class="result-level-sub">${state.gqScore}/${gqQuestions.length} correct</div>
          <div class="result-scores">
            <div class="rs-item"><div class="rs-num">+${state.gqScore * 15}</div><div class="rs-lbl">XP earned</div></div>
          </div>
        </div>
        <div class="result-card">
          <div class="verdict-text">${
            pct >= 80 ? 'Solid grammar instincts. Keep it up — consistency is everything.' :
            pct >= 60 ? 'Decent base. A few systematic gaps — especially cases and word order.' :
            'Grammar needs focused work. Run lessons on Cases and Word Order next.'
          }</div>
        </div>
        <div class="btn-row">
          <button class="btn-primary" onclick="state.gqActive=false;initGrammarQuiz()">Try again →</button>
          <button class="btn-secondary" onclick="nav('lessons')">Study the grammar →</button>
        </div>
      </div>
    `;
    return;
  }

  const q = gqQuestions[state.gqIndex];
  const pct = (state.gqIndex / gqQuestions.length * 100);
  content.innerHTML = `
    <div class="quiz-wrap">
      <div class="prog-row">
        <span>Question ${state.gqIndex + 1} of ${gqQuestions.length}</span>
        <span style="font-size:12px;background:var(--accent-light);color:var(--accent);padding:3px 10px;border-radius:20px;font-weight:600">${q.topic}</span>
      </div>
      <div class="prog-track-full"><div class="prog-fill-full" style="width:${pct}%"></div></div>
      <div class="quiz-card">
        <div class="quiz-q">Fill the gap:</div>
        <div class="quiz-q-sub" style="font-size:18px;font-weight:600;color:var(--black)">"${q.q}"</div>
        <div class="quiz-opts" id="gq-opts">
          ${q.opts.map((o, i) => `<button class="quiz-opt" onclick="answerGQ(this,${i})">${o}</button>`).join('')}
        </div>
        <div class="quiz-feedback" id="gq-feedback"></div>
      </div>
      <div class="btn-row right">
        <button class="btn-primary" id="gq-next" onclick="nextGQ()" style="display:none">Next →</button>
      </div>
    </div>
  `;
}

function answerGQ(el, i) {
  const q = gqQuestions[state.gqIndex];
  document.querySelectorAll('#gq-opts .quiz-opt').forEach(o => { o.disabled = true; o.onclick = null; });
  const fb = document.getElementById('gq-feedback');
  state.totalAnswered++;
  if (i === q.correct) {
    el.classList.add('correct'); state.gqScore++; state.totalCorrect++;
    fb.className = 'quiz-feedback show ok'; fb.textContent = '✓ Correct. ' + q.explain;
    addXP(15);
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('#gq-opts .quiz-opt')[q.correct].classList.add('correct');
    fb.className = 'quiz-feedback show bad'; fb.textContent = '✗ Wrong. ' + q.explain;
  }
  document.getElementById('gq-next').style.display = 'inline-flex';
}

function nextGQ() { state.gqIndex++; renderGQ(); }

// ── LISTENING QUIZ ──
function initListeningQuiz() {
  state.lqIndex = 0;
  renderLQ();
}

function renderLQ() {
  const content = document.getElementById('lq-content');
  if (state.lqIndex >= LISTENING_QS.length) {
    content.innerHTML = `
      <div style="max-width:480px">
        <div class="result-hero">
          <div class="result-level">Done!</div>
          <div class="result-level-sub">Listening drill complete</div>
        </div>
        <div class="btn-row">
          <button class="btn-primary" onclick="initListeningQuiz()">Run it again →</button>
        </div>
      </div>
    `;
    return;
  }

  const q = LISTENING_QS[state.lqIndex];
  const pct = (state.lqIndex / LISTENING_QS.length * 100);
  content.innerHTML = `
    <div class="quiz-wrap">
      <div class="prog-row">
        <span>Question ${state.lqIndex + 1} of ${LISTENING_QS.length}</span>
        <span style="font-size:12px;color:var(--gray-400)">Listening</span>
      </div>
      <div class="prog-track-full"><div class="prog-fill-full" style="width:${pct}%"></div></div>
      <div class="quiz-card">
        <div style="background:var(--gray-50);border-radius:var(--radius);padding:20px;text-align:center;margin-bottom:16px">
          <div id="lq-phrase" style="font-size:20px;font-weight:600;filter:blur(10px);transition:filter 0.3s;margin-bottom:12px">${q.phrase}</div>
          <button class="btn-secondary" onclick="lqPlay()" id="lq-play-btn">▶ Play audio</button>
        </div>
        <div class="quiz-q">${q.q}</div>
        <div class="quiz-opts" id="lq-opts">
          ${q.opts.map((o, i) => `<button class="quiz-opt" onclick="answerLQ(this,${i})">${o}</button>`).join('')}
        </div>
        <div class="quiz-feedback" id="lq-feedback"></div>
      </div>
      <div class="btn-row right">
        <button class="btn-primary" id="lq-next" onclick="nextLQ()" style="display:none">Next →</button>
      </div>
    </div>
  `;
  window._lqPlayed = 0;
}

function lqPlay() {
  const q = LISTENING_QS[state.lqIndex];
  window._lqPlayed = (window._lqPlayed || 0) + 1;
  if (window._lqPlayed >= 2) {
    document.getElementById('lq-phrase').style.filter = 'blur(0)';
    document.getElementById('lq-play-btn').textContent = '▶ Play again';
  }
  const u = new SpeechSynthesisUtterance(q.phrase);
  u.lang = 'de-DE'; u.rate = 0.82;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function answerLQ(el, i) {
  const q = LISTENING_QS[state.lqIndex];
  document.querySelectorAll('#lq-opts .quiz-opt').forEach(o => { o.disabled = true; o.onclick = null; });
  document.getElementById('lq-phrase').style.filter = 'blur(0)';
  const fb = document.getElementById('lq-feedback');
  state.totalAnswered++;
  if (i === q.correct) {
    el.classList.add('correct'); state.totalCorrect++;
    fb.className = 'quiz-feedback show ok'; fb.textContent = '✓ ' + q.explain;
    addXP(12);
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('#lq-opts .quiz-opt')[q.correct].classList.add('correct');
    fb.className = 'quiz-feedback show bad'; fb.textContent = '✗ ' + q.explain;
  }
  document.getElementById('lq-next').style.display = 'inline-flex';
}

function nextLQ() { state.lqIndex++; renderLQ(); }

// ── DIAGNOSTIC ──
const DIAG = {
  phase: 'intro', li: 0, gi: 0, oi: 0, vi: 0, si: 0, wi: 0,
  ls: 0, gs: 0, os: 0, vs: 0, ss: 0, ws: 0,
  orderPlaced: [], orderBank: [],
};

const DIAG_ORDER = [
  {en:"I go to the supermarket every day.",words:["jeden","ich","gehe","Tag","zum","Supermarkt"],correct:"Ich gehe jeden Tag zum Supermarkt",explain:"Verb second. Time phrases can front-load but verb stays in slot 2."},
  {en:"Yesterday I was not at home.",words:["zu","war","nicht","ich","Hause","gestern"],correct:"Gestern war ich nicht zu Hause",explain:"'Gestern' fronted → 'war' still in slot 2, 'ich' moves to slot 3."},
  {en:"I must work because I have no money.",words:["weil","ich","arbeiten","muss","habe","kein","Geld"],correct:"Ich muss arbeiten weil ich kein Geld habe",explain:"'weil' sends verb to END of its clause → 'habe' last."},
];

const DIAG_WRITE = [
  {title:"Introduce yourself",prompt:"Write 5–8 sentences about yourself in German. Name, where you're from, where you live, what you do, one hobby.",sub:"No translation — write directly in German."},
  {title:"Describe your last week",prompt:"In German, describe what you did last week. Use at least one 'weil' and one Perfekt sentence.",sub:"Use 'habe...', 'bin...', 'weil...'"},
];

function initDiagnostic() {
  DIAG.phase = 'intro';
  Object.assign(DIAG, {li:0,gi:0,oi:0,vi:0,si:0,wi:0,ls:0,gs:0,os:0,vs:0,ss:0,ws:0});
  renderDiag();
}

function renderDiag() {
  const c = document.getElementById('diag-content');
  const {phase} = DIAG;

  if (phase === 'intro') {
    c.innerHTML = `
      <div class="diag-intro">
        <h2>Full German Diagnostic</h2>
        <p>Six modules. No hints. No encouragement. This tells you where you actually are — listening, grammar, word order, vocabulary, speaking, and free writing.</p>
        <div class="module-pills">
          ${[['👂','Listening comprehension'],['⚡','Grammar accuracy'],['🔀','Word order / sentences'],['📚','Vocabulary depth'],['🎙️','Speaking output'],['✍️','Free writing']].map(([ic,lb])=>`<div class="mpill"><span class="mpill-icon">${ic}</span>${lb}</div>`).join('')}
        </div>
        <button class="btn-primary full" onclick="DIAG.phase='listen';renderDiag()">Start — no going back →</button>
      </div>
    `;
  } else if (phase === 'listen') {
    if (DIAG.li >= LISTENING_QS.length) { DIAG.phase = 'grammar'; renderDiag(); return; }
    const q = LISTENING_QS[DIAG.li];
    c.innerHTML = `
      <div class="quiz-wrap">
        <div class="prog-row"><span>Module 1/6 — Listening (${DIAG.li+1}/${LISTENING_QS.length})</span></div>
        <div class="prog-track-full"><div class="prog-fill-full" style="width:${DIAG.li/LISTENING_QS.length*100}%"></div></div>
        <div class="quiz-card">
          <div style="background:var(--gray-50);border-radius:var(--radius);padding:20px;text-align:center;margin-bottom:16px">
            <div id="dlq-phrase" style="font-size:20px;font-weight:600;filter:blur(10px);transition:filter 0.3s;margin-bottom:12px">${q.phrase}</div>
            <button class="btn-secondary" onclick="diagLQPlay()">▶ Play audio</button>
          </div>
          <div class="quiz-q">${q.q}</div>
          <div class="quiz-opts" id="dlq-opts">${q.opts.map((o,i)=>`<button class="quiz-opt" onclick="diagLQAnswer(this,${i})">${o}</button>`).join('')}</div>
          <div class="quiz-feedback" id="dlq-fb"></div>
        </div>
        <div class="btn-row right"><button class="btn-primary" id="dlq-next" onclick="DIAG.li++;renderDiag()" style="display:none">Next →</button></div>
      </div>
    `;
    window._dlqPlayed = 0;
  } else if (phase === 'grammar') {
    if (DIAG.gi >= GRAMMAR_QS.length) { DIAG.phase = 'order'; renderDiag(); return; }
    const q = GRAMMAR_QS[DIAG.gi];
    c.innerHTML = `
      <div class="quiz-wrap">
        <div class="prog-row"><span>Module 2/6 — Grammar (${DIAG.gi+1}/${GRAMMAR_QS.length})</span><span style="font-size:12px;background:var(--accent-light);color:var(--accent);padding:3px 10px;border-radius:20px;font-weight:600">${q.topic}</span></div>
        <div class="prog-track-full"><div class="prog-fill-full" style="width:${DIAG.gi/GRAMMAR_QS.length*100}%"></div></div>
        <div class="quiz-card">
          <div class="quiz-q-sub" style="font-size:18px;font-weight:600;color:var(--black);margin-bottom:16px">"${q.q}"</div>
          <div class="quiz-opts" id="dgq-opts">${q.opts.map((o,i)=>`<button class="quiz-opt" onclick="diagGQAnswer(this,${i})">${o}</button>`).join('')}</div>
          <div class="quiz-feedback" id="dgq-fb"></div>
        </div>
        <div class="btn-row right"><button class="btn-primary" id="dgq-next" onclick="DIAG.gi++;renderDiag()" style="display:none">Next →</button></div>
      </div>
    `;
  } else if (phase === 'order') {
    if (DIAG.oi >= DIAG_ORDER.length) { DIAG.phase = 'vocab'; renderDiag(); return; }
    const q = DIAG_ORDER[DIAG.oi];
    DIAG.orderPlaced = []; DIAG.orderBank = [...q.words].sort(() => Math.random() - 0.5);
    c.innerHTML = `
      <div class="quiz-wrap">
        <div class="prog-row"><span>Module 3/6 — Word Order (${DIAG.oi+1}/${DIAG_ORDER.length})</span></div>
        <div class="prog-track-full"><div class="prog-fill-full" style="width:${DIAG.oi/DIAG_ORDER.length*100}%"></div></div>
        <div class="quiz-card">
          <div style="font-size:14px;color:var(--gray-600);margin-bottom:4px">English: <strong>"${q.en}"</strong></div>
          <div style="font-size:13px;color:var(--gray-400);margin-bottom:10px">Tap words to build the German sentence:</div>
          <div style="font-size:12px;font-weight:600;color:var(--gray-400);margin-bottom:6px;text-transform:uppercase">Your answer:</div>
          <div class="sentence-zone" id="d-slot"></div>
          <div style="font-size:12px;font-weight:600;color:var(--gray-400);margin-bottom:6px;text-transform:uppercase">Words:</div>
          <div class="word-bank-zone" id="d-bank"></div>
          <div class="quiz-feedback" id="dorder-fb"></div>
          <div class="btn-row">
            <button class="btn-secondary" onclick="diagOrderReset()">Reset</button>
            <button class="btn-primary" onclick="diagOrderCheck()">Check →</button>
          </div>
        </div>
        <div class="btn-row right"><button class="btn-primary" id="dorder-next" onclick="DIAG.oi++;renderDiag()" style="display:none">Next →</button></div>
      </div>
    `;
    renderOrderChips();
  } else if (phase === 'vocab') {
    const vqs = GRAMMAR_QS.filter(q => q.topic === 'Articles' || q.topic === 'Cases').slice(0, 4);
    if (DIAG.vi >= vqs.length) { DIAG.phase = 'speak'; renderDiag(); return; }
    const q = vqs[DIAG.vi];
    c.innerHTML = `
      <div class="quiz-wrap">
        <div class="prog-row"><span>Module 4/6 — Vocabulary & Cases (${DIAG.vi+1}/${vqs.length})</span></div>
        <div class="prog-track-full"><div class="prog-fill-full" style="width:${DIAG.vi/vqs.length*100}%"></div></div>
        <div class="quiz-card">
          <div class="quiz-q-sub" style="font-size:18px;font-weight:600;color:var(--black);margin-bottom:16px">"${q.q}"</div>
          <div class="quiz-opts" id="dvq-opts">${q.opts.map((o,i)=>`<button class="quiz-opt" onclick="diagVQAnswer(this,${i},${q.correct},'${q.explain.replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div>
          <div class="quiz-feedback" id="dvq-fb"></div>
        </div>
        <div class="btn-row right"><button class="btn-primary" id="dvq-next" onclick="DIAG.vi++;renderDiag()" style="display:none">Next →</button></div>
      </div>
    `;
  } else if (phase === 'speak') {
    if (DIAG.si >= 4) { DIAG.phase = 'write'; renderDiag(); return; }
    const sq = [
      {de:'Könnten Sie mir bitte helfen?',en:'Could you please help me?',tip:'Focus: conditional "Könnten" — more polite than "Können".'},
      {de:'Ich wohne seit fünf Jahren in Berlin.',en:'I have lived in Berlin for five years.',tip:'"seit" + present tense — German uses present where English uses perfect.'},
      {de:'Entschuldigung, wie komme ich zum Bahnhof?',en:'Excuse me, how do I get to the train station?',tip:'"wie komme ich zu..." — essential direction phrase.'},
      {de:'Das habe ich leider nicht verstanden.',en:'I\'m sorry, I didn\'t understand that.',tip:'"habe...verstanden" — Perfekt. "leider" softens it.'},
    ][DIAG.si];
    c.innerHTML = `
      <div style="max-width:520px">
        <div class="prog-row"><span>Module 5/6 — Speaking (${DIAG.si+1}/4)</span></div>
        <div class="prog-track-full"><div class="prog-fill-full" style="width:${DIAG.si/4*100}%"></div></div>
        <div class="speak-prompt-box">
          <div class="speak-topic-label">Say this in German</div>
          <div class="speak-topic-text">${sq.de}</div>
          <div class="speak-topic-hint">${sq.en}</div>
        </div>
        <button class="btn-secondary" style="width:100%;justify-content:center;margin-bottom:12px" onclick="speakText('${sq.de.replace(/'/g,"\\'")}')">▶ Hear the pronunciation</button>
        <p style="font-size:14px;font-weight:500;color:var(--gray-800);margin-bottom:10px">Rate your attempt honestly:</p>
        <div class="rate-grid">
          <button class="rate-btn" onclick="diagSpeak(0)">Couldn't say it</button>
          <button class="rate-btn" onclick="diagSpeak(1)">Broken / guessing</button>
          <button class="rate-btn" onclick="diagSpeak(2)">Got it, rough</button>
          <button class="rate-btn" onclick="diagSpeak(3)">Said it cleanly</button>
          <button class="rate-btn" onclick="diagSpeak(3)">Nailed it</button>
        </div>
        <div style="margin-top:12px;padding:12px;background:var(--amber-light);border-radius:var(--radius);font-size:13px;color:var(--amber)">${sq.tip}</div>
        <div class="btn-row right"><button class="btn-primary" id="dsp-next" onclick="DIAG.si++;renderDiag()" style="display:none">Next →</button></div>
      </div>
    `;
  } else if (phase === 'write') {
    if (DIAG.wi >= DIAG_WRITE.length) { DIAG.phase = 'results'; renderDiag(); return; }
    const wq = DIAG_WRITE[DIAG.wi];
    c.innerHTML = `
      <div style="max-width:560px">
        <div class="prog-row"><span>Module 6/6 — Free Writing (${DIAG.wi+1}/${DIAG_WRITE.length})</span></div>
        <div class="prog-track-full"><div class="prog-fill-full" style="width:${DIAG.wi/DIAG_WRITE.length*100}%"></div></div>
        <div class="quiz-card">
          <div class="quiz-q">${wq.title}</div>
          <div class="quiz-q-sub">${wq.prompt}</div>
          <div style="font-size:12px;color:var(--gray-400);margin-bottom:12px">${wq.sub}</div>
          <textarea class="dump-textarea" id="dwrite-ta" rows="6" placeholder="Schreib hier auf Deutsch..." oninput="document.getElementById('dwrite-wc').textContent=this.value.trim().split(/\\s+/).filter(w=>w).length+' words'"></textarea>
          <div style="font-size:12px;color:var(--gray-400);margin-top:6px" id="dwrite-wc">0 words</div>
          <div class="quiz-feedback" id="dwrite-fb"></div>
          <div class="btn-row" style="margin-top:12px">
            <button class="btn-primary" onclick="diagWriteSubmit()">Submit →</button>
          </div>
        </div>
        <div class="btn-row right"><button class="btn-primary" id="dwrite-next" onclick="DIAG.wi++;renderDiag()" style="display:none">Next →</button></div>
      </div>
    `;
  } else if (phase === 'results') {
    const total = LISTENING_QS.length + GRAMMAR_QS.length + DIAG_ORDER.length;
    const got = DIAG.ls + DIAG.gs + DIAG.os;
    const pct = p => Math.round(p * 100);
    const lp = pct(DIAG.ls / LISTENING_QS.length);
    const gp = pct(DIAG.gs / GRAMMAR_QS.length);
    const op = pct(DIAG.os / DIAG_ORDER.length);
    const sp = pct(DIAG.ss / (4 * 3));
    const wp = pct(DIAG.ws);
    const overall = Math.round((lp + gp + op + sp + wp) / 5);
    const level = overall >= 75 ? 'B1' : overall >= 55 ? 'A2+' : overall >= 35 ? 'A2' : 'A1–A2';
    addXP(overall * 2);
    c.innerHTML = `
      <div style="max-width:580px">
        <div class="result-hero">
          <div class="result-level">${level}</div>
          <div class="result-level-sub">${overall}% overall · Your honest baseline</div>
          <div class="result-scores">
            <div class="rs-item"><div class="rs-num">${lp}%</div><div class="rs-lbl">Listening</div></div>
            <div class="rs-item"><div class="rs-num">${gp}%</div><div class="rs-lbl">Grammar</div></div>
            <div class="rs-item"><div class="rs-num">${op}%</div><div class="rs-lbl">Word Order</div></div>
            <div class="rs-item"><div class="rs-num">${sp}%</div><div class="rs-lbl">Speaking</div></div>
            <div class="rs-item"><div class="rs-num">${wp}%</div><div class="rs-lbl">Writing</div></div>
          </div>
        </div>
        <div class="result-card">
          <h3>Verdict</h3>
          <p class="verdict-text">${
            overall >= 75 ? 'You\'re at B1 territory. The gap now isn\'t knowledge — it\'s production fluency. You need to speak more.' :
            overall >= 55 ? 'A2+ level. The foundation is there but it collapses under pressure. Daily speaking drills are your #1 priority.' :
            overall >= 35 ? 'Honest A2. Functional survival German with significant gaps in grammar and word order. Fixable with consistent daily work.' :
            'A1–A2. This is your real starting point — which means everything from here is progress. Start with the Cases lesson.'
          }</p>
        </div>
        <div class="result-card">
          <h3>Focus areas</h3>
          ${[
            [gp < 60, '⚡ Grammar — especially cases (nominative/accusative/dative) and past tense (Perfekt vs Präteritum).'],
            [op < 60, '🔀 Word order — verb-second rule and "weil/dass" sending verb to end.'],
            [lp < 60, '👂 Listening — daily exposure. Deutsche Welle slow German, 15 min every day.'],
            [sp < 60, '🎙️ Speaking — you understand more than you can say. Forced output daily.'],
            [wp < 60, '✍️ Writing — connectors (weil, aber, trotzdem) and basic Perfekt structures.'],
          ].filter(([show]) => show).map(([, txt]) => `<div class="gap-item"><span class="gap-icon">${txt.slice(0,2)}</span><span>${txt.slice(3)}</span></div>`).join('') || '<div style="color:var(--green);font-size:14px">Strong across the board. Focus on speaking output now.</div>'}
        </div>
        <div class="btn-row">
          <button class="btn-primary" onclick="nav('lessons')">Study lessons →</button>
          <button class="btn-secondary" onclick="initDiagnostic()">Retake test</button>
        </div>
      </div>
    `;
  }
}

function diagLQPlay() {
  const q = LISTENING_QS[DIAG.li];
  window._dlqPlayed = (window._dlqPlayed || 0) + 1;
  if (window._dlqPlayed >= 2) document.getElementById('dlq-phrase').style.filter = 'blur(0)';
  speakText(q.phrase);
}

function diagLQAnswer(el, i) {
  const q = LISTENING_QS[DIAG.li];
  document.querySelectorAll('#dlq-opts .quiz-opt').forEach(o => { o.disabled = true; o.onclick = null; });
  document.getElementById('dlq-phrase').style.filter = 'blur(0)';
  const fb = document.getElementById('dlq-fb');
  if (i === q.correct) { el.classList.add('correct'); DIAG.ls++; fb.className = 'quiz-feedback show ok'; fb.textContent = '✓ ' + q.explain; addXP(12); }
  else { el.classList.add('wrong'); document.querySelectorAll('#dlq-opts .quiz-opt')[q.correct].classList.add('correct'); fb.className = 'quiz-feedback show bad'; fb.textContent = '✗ ' + q.explain; }
  document.getElementById('dlq-next').style.display = 'inline-flex';
}

function diagGQAnswer(el, i) {
  const q = GRAMMAR_QS[DIAG.gi];
  document.querySelectorAll('#dgq-opts .quiz-opt').forEach(o => { o.disabled = true; o.onclick = null; });
  const fb = document.getElementById('dgq-fb');
  if (i === q.correct) { el.classList.add('correct'); DIAG.gs++; fb.className = 'quiz-feedback show ok'; fb.textContent = '✓ ' + q.explain; addXP(15); }
  else { el.classList.add('wrong'); document.querySelectorAll('#dgq-opts .quiz-opt')[q.correct].classList.add('correct'); fb.className = 'quiz-feedback show bad'; fb.textContent = '✗ ' + q.explain; }
  document.getElementById('dgq-next').style.display = 'inline-flex';
}

function renderOrderChips() {
  const slot = document.getElementById('d-slot');
  const bank = document.getElementById('d-bank');
  if (!slot || !bank) return;
  slot.innerHTML = DIAG.orderPlaced.map((w, i) => `<span class="word-chip in-slot" onclick="diagUnplace(${i})">${w}</span>`).join('') || '<span style="font-size:13px;color:var(--gray-400);padding:8px">tap words below...</span>';
  bank.innerHTML = DIAG.orderBank.map((w, i) => `<span class="word-chip" onclick="diagPlace(${i})">${w}</span>`).join('');
}

function diagPlace(i) { DIAG.orderPlaced.push(DIAG.orderBank.splice(i, 1)[0]); renderOrderChips(); }
function diagUnplace(i) { DIAG.orderBank.push(DIAG.orderPlaced.splice(i, 1)[0]); renderOrderChips(); }
function diagOrderReset() { const q = DIAG_ORDER[DIAG.oi]; DIAG.orderBank = [...q.words].sort(() => Math.random() - 0.5); DIAG.orderPlaced = []; renderOrderChips(); document.getElementById('dorder-fb').className = 'quiz-feedback'; document.getElementById('dorder-next').style.display = 'none'; }

function diagOrderCheck() {
  const q = DIAG_ORDER[DIAG.oi];
  const attempt = DIAG.orderPlaced.join(' ');
  const norm = s => s.toLowerCase().replace(/[.,!?]/g, '').trim();
  const fb = document.getElementById('dorder-fb');
  if (!attempt) { fb.className = 'quiz-feedback show bad'; fb.textContent = 'Build the sentence first.'; return; }
  if (norm(attempt) === norm(q.correct)) { DIAG.os++; fb.className = 'quiz-feedback show ok'; fb.textContent = '✓ Correct! ' + q.explain; addXP(20); }
  else { fb.className = 'quiz-feedback show bad'; fb.textContent = `✗ Correct: "${q.correct}" — ${q.explain}`; }
  document.getElementById('dorder-next').style.display = 'inline-flex';
}

function diagVQAnswer(el, i, correct, explain) {
  document.querySelectorAll('#dvq-opts .quiz-opt').forEach(o => { o.disabled = true; o.onclick = null; });
  const fb = document.getElementById('dvq-fb');
  if (i === correct) { el.classList.add('correct'); DIAG.vs++; fb.className = 'quiz-feedback show ok'; fb.textContent = '✓ ' + explain; addXP(12); }
  else { el.classList.add('wrong'); document.querySelectorAll('#dvq-opts .quiz-opt')[correct].classList.add('correct'); fb.className = 'quiz-feedback show bad'; fb.textContent = '✗ ' + explain; }
  document.getElementById('dvq-next').style.display = 'inline-flex';
}

function diagSpeak(score) {
  DIAG.ss += score;
  const fb = `<div class="btn-row right"><button class="btn-primary" id="dsp-next" onclick="DIAG.si++;renderDiag()">Next →</button></div>`;
  const existing = document.getElementById('dsp-next');
  if (!existing) document.querySelector('.rate-grid').insertAdjacentHTML('afterend', fb);
  else document.getElementById('dsp-next').style.display = 'inline-flex';
  addXP(score * 5);
}

function diagWriteSubmit() {
  const text = (document.getElementById('dwrite-ta') || {}).value || '';
  const wc = text.trim().split(/\s+/).filter(w => w).length;
  const fb = document.getElementById('dwrite-fb');
  if (wc < 3) { fb.className = 'quiz-feedback show bad'; fb.textContent = 'Write at least a few words.'; return; }
  const hasVerb = /\b(bin|habe|mache|gehe|wohne|arbeite|lerne|war|hatte|gibt|ist|sind|kann|muss|will|wurde)\b/i.test(text);
  const hasPast = /\b(habe|hatte|war|bin|wurden|machte|gearbeitet|gewesen|gemacht)\b/i.test(text);
  const hasConn = /\b(weil|aber|und|oder|dass|wenn|obwohl|trotzdem|deshalb)\b/i.test(text);
  const score = Math.min((wc >= 30 ? 0.4 : wc >= 15 ? 0.25 : 0.1) + (hasVerb ? 0.2 : 0) + (hasPast ? 0.2 : 0) + (hasConn ? 0.2 : 0), 1);
  DIAG.ws = Math.max(DIAG.ws, score);
  const msg = score >= 0.8 ? 'Strong output. Good verb and connector variety.' : score >= 0.5 ? 'Decent. Watch verb placement and try to use "weil" in sentences.' : 'Short or limited range. Push past simple sentences.';
  fb.className = `quiz-feedback show ${score >= 0.5 ? 'ok' : 'bad'}`;
  fb.textContent = msg;
  document.getElementById('dwrite-next').style.display = 'inline-flex';
  addXP(Math.round(score * 40));
}

// ── BRAIN DUMP ──
function initBrainDump() {
  state.bdPhase = 'intro';
  renderBD();
}

function renderBD() {
  const c = document.getElementById('bd-content');
  if (state.bdPhase === 'intro') {
    c.innerHTML = `
      <div style="max-width:520px">
        <h2 style="font-size:26px;font-weight:700;margin-bottom:10px">Brain Dump</h2>
        <p style="font-size:15px;color:var(--gray-600);margin-bottom:24px">Two phases that show what's actually in your head — not what you think is there.</p>
        ${[['🌊','Word Flood — 10 min','Type every German word you know. No grammar needed. Just dump everything.'],['🎙️','Speaking Dump — 10 min','Speak everything you can. Topic prompts rotate every 60 seconds.']].map(([ic,t,d])=>`<div style="display:flex;gap:14px;align-items:flex-start;background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:16px 18px;margin-bottom:10px"><span style="font-size:24px">${ic}</span><div><strong style="font-size:15px">${t}</strong><p style="font-size:13px;color:var(--gray-600);margin-top:4px">${d}</p></div></div>`).join('')}
        <button class="btn-primary full" style="margin-top:8px" onclick="state.bdPhase='wordflood';renderBD();startBDTimer()">Start Word Flood →</button>
      </div>
    `;
  } else if (state.bdPhase === 'wordflood') {
    c.innerHTML = `
      <div style="max-width:580px">
        <div class="timer-block">
          <div class="timer-display" id="bd-timer">10:00</div>
          <div class="timer-info">
            <div class="t-label">words typed</div>
            <div class="t-stat" id="bd-wcount">0</div>
          </div>
          <div>
            <div style="font-size:11px;color:var(--gray-400);margin-bottom:3px">unique</div>
            <div style="font-size:20px;font-weight:600" id="bd-unique">0</div>
          </div>
        </div>
        <div class="timer-prog"><div class="timer-prog-fill" id="bd-prog" style="width:100%"></div></div>
        <p style="font-size:14px;color:var(--gray-600);margin-bottom:12px">Type every German word you know. Separate by commas or spaces. Don't stop to think.</p>
        <textarea class="dump-textarea" id="bd-area" placeholder="Hund, Katze, gehen, ich bin, Bahnhof, weil, Arbeit, pünktlich..." style="min-height:220px" oninput="updateBDStats()" autofocus></textarea>
        <div class="btn-row" style="margin-top:12px">
          <button class="btn-secondary" onclick="finishBDWordFlood()">Done — show my words</button>
        </div>
      </div>
    `;
  } else if (state.bdPhase === 'wordresults') {
    const words = (window._bdWords || []);
    const nouns = words.filter(w => /^[A-ZÄÖÜ]/.test(w));
    const verbs = words.filter(w => /en$|ern$/.test(w.toLowerCase()) && !/^[A-ZÄÖÜ]/.test(w));
    c.innerHTML = `
      <div style="max-width:580px">
        <h2 style="font-size:22px;font-weight:700;margin-bottom:16px">Word Flood Results</h2>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
          ${[['📚',words.length,'total words'],['🔤',nouns.length,'nouns'],['🏃',verbs.length,'verbs']].map(([ic,n,l])=>`<div class="stat-card" style="text-align:center"><div style="font-size:22px">${ic}</div><div class="stat-num">${n}</div><div class="stat-lbl">${l}</div></div>`).join('')}
        </div>
        <div style="background:var(--amber-light);border-radius:var(--radius);padding:14px 16px;margin-bottom:16px;font-size:14px;color:var(--amber)">
          ${words.length >= 100 ? 'Strong vocabulary base for A2.' : words.length >= 50 ? 'A2 range. Real gaps will show in grammar.' : 'Below A2 active vocab. But now you know — and you can build.'} ${verbs.length < 10 ? ' Very low verb count — this is why your sentences feel stuck.' : ''}
        </div>
        <div class="word-cloud">${words.slice(0, 60).map(w => `<span class="wtag ${/^[A-ZÄÖÜ]/.test(w) ? 'noun' : /en$/.test(w.toLowerCase()) ? 'verb' : ''}">${w}</span>`).join('')}</div>
        <div class="btn-row" style="margin-top:20px">
          <button class="btn-primary" onclick="state.bdPhase='speakdump';renderBD();startBDSpeakTimer()">Phase 2: Speaking Dump →</button>
        </div>
      </div>
    `;
  } else if (state.bdPhase === 'speakdump') {
    c.innerHTML = `
      <div style="max-width:560px">
        <div class="timer-block">
          <div class="timer-display" id="bds-timer">10:00</div>
          <div class="timer-info">
            <div class="t-label">attempts</div>
            <div class="t-stat" id="bds-attempts">0</div>
          </div>
        </div>
        <div class="timer-prog"><div class="timer-prog-fill" id="bds-prog" style="width:100%"></div></div>
        <div class="speak-prompt-box" style="margin-bottom:14px">
          <div class="speak-topic-label">Current topic — changes every 60s</div>
          <div class="speak-topic-text" id="bds-topic">${SPEAK_PROMPTS[0].de}</div>
          <div class="speak-topic-hint" id="bds-hint">${SPEAK_PROMPTS[0].hint}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.3);margin-top:8px">next topic in <span id="bds-next">60</span>s</div>
        </div>
        <button class="mic-btn-big" id="bds-mic" onclick="toggleBDSMic()">🎙️ <span id="bds-mic-lbl">Tap to speak</span></button>
        <div style="font-size:14px;font-weight:500;margin-bottom:10px">Rate this attempt:</div>
        <div class="rate-grid">
          <button class="rate-btn" onclick="logBDSpeak(0)">Barely anything</button>
          <button class="rate-btn" onclick="logBDSpeak(1)">Few words</button>
          <button class="rate-btn" onclick="logBDSpeak(2)">Broken sentence</button>
          <button class="rate-btn" onclick="logBDSpeak(3)">Full sentence</button>
          <button class="rate-btn" onclick="logBDSpeak(4)">Multiple sentences</button>
        </div>
        <div id="bds-log" style="margin-top:12px;font-size:13px;color:var(--gray-400)"></div>
        <div class="btn-row" style="margin-top:14px">
          <button class="btn-secondary" onclick="finishBDSpeak()">Done — see results</button>
        </div>
      </div>
    `;
  }
}

let _bdInterval = null, _bdsInterval = null;

function startBDTimer() {
  state.bdSecs = 600;
  if (_bdInterval) clearInterval(_bdInterval);
  _bdInterval = setInterval(() => {
    state.bdSecs--;
    const m = Math.floor(state.bdSecs / 60), s = state.bdSecs % 60;
    const el = document.getElementById('bd-timer');
    if (el) el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    const prog = document.getElementById('bd-prog');
    if (prog) prog.style.width = (state.bdSecs / 600 * 100) + '%';
    if (state.bdSecs <= 0) { clearInterval(_bdInterval); finishBDWordFlood(); }
  }, 1000);
}

function updateBDStats() {
  const text = (document.getElementById('bd-area') || {}).value || '';
  const words = text.split(/[\s,;.\n]+/).map(w => w.trim()).filter(w => w.length > 1);
  const unique = [...new Set(words.map(w => w.toLowerCase()))];
  const wc = document.getElementById('bd-wcount');
  const uc = document.getElementById('bd-unique');
  if (wc) wc.textContent = words.length;
  if (uc) uc.textContent = unique.length;
}

function finishBDWordFlood() {
  clearInterval(_bdInterval);
  const text = (document.getElementById('bd-area') || {}).value || '';
  window._bdWords = [...new Set(text.split(/[\s,;.\n]+/).map(w => w.trim()).filter(w => w.length > 1))];
  addXP(window._bdWords.length * 2);
  state.bdPhase = 'wordresults';
  renderBD();
}

let _bdsLog = [], _bdsTopicI = 0, _bdsTopicSecs = 60;

function startBDSpeakTimer() {
  state.spSecs = 600; _bdsLog = []; _bdsTopicI = 0; _bdsTopicSecs = 60;
  if (_bdsInterval) clearInterval(_bdsInterval);
  _bdsInterval = setInterval(() => {
    state.spSecs--; _bdsTopicSecs--;
    const m = Math.floor(state.spSecs / 60), s = state.spSecs % 60;
    const el = document.getElementById('bds-timer');
    if (el) el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    const prog = document.getElementById('bds-prog');
    if (prog) prog.style.width = (state.spSecs / 600 * 100) + '%';
    const nx = document.getElementById('bds-next');
    if (nx) nx.textContent = _bdsTopicSecs;
    if (_bdsTopicSecs <= 0) {
      _bdsTopicI = (_bdsTopicI + 1) % SPEAK_PROMPTS.length;
      _bdsTopicSecs = 60;
      const tp = document.getElementById('bds-topic');
      const th = document.getElementById('bds-hint');
      if (tp) tp.textContent = SPEAK_PROMPTS[_bdsTopicI].de;
      if (th) th.textContent = SPEAK_PROMPTS[_bdsTopicI].hint;
    }
    if (state.spSecs <= 0) { clearInterval(_bdsInterval); finishBDSpeak(); }
  }, 1000);
}

function toggleBDSMic() {
  const btn = document.getElementById('bds-mic');
  const lbl = document.getElementById('bds-mic-lbl');
  state.micOn = !state.micOn;
  if (btn) btn.classList.toggle('on', state.micOn);
  if (lbl) lbl.textContent = state.micOn ? 'Recording...' : 'Tap to speak';
}

function logBDSpeak(score) {
  _bdsLog.push({ topic: SPEAK_PROMPTS[_bdsTopicI].de, score });
  const el = document.getElementById('bds-attempts');
  if (el) el.textContent = _bdsLog.length;
  const log = document.getElementById('bds-log');
  const labels = ['Barely anything', 'Few words', 'Broken sentence', 'Full sentence', 'Multiple sentences'];
  if (log) log.innerHTML = `Latest: <strong>${labels[score]}</strong> on "${SPEAK_PROMPTS[_bdsTopicI].de}"`;
  state.micOn = false;
  const btn = document.getElementById('bds-mic');
  if (btn) btn.classList.remove('on');
  addXP(score * 5);
}

function finishBDSpeak() {
  clearInterval(_bdsInterval);
  state.bdPhase = 'intro';
  renderBD();
  showNotif('Brain Dump complete! 🧠');
}

// ── SPEAKING DRILL ──
function initSpeakingDrill() {
  state.spPhase = 'intro';
  state.spLog = [];
  renderSpeakPage();
}

function renderSpeakPage() {
  const c = document.getElementById('sp-content');
  if (state.spPhase === 'intro') {
    c.innerHTML = `
      <div style="max-width:520px">
        <h2 style="font-size:24px;font-weight:700;margin-bottom:10px">Speaking Drill</h2>
        <p style="font-size:15px;color:var(--gray-600);margin-bottom:24px">10 minutes. Topic prompts rotate. Speak as much German as you can. The only rule: don't stay silent.</p>
        <button class="btn-primary full" onclick="state.spPhase='drill';renderSpeakPage();startSpDrill()">Start 10-min drill →</button>
      </div>
    `;
  } else if (state.spPhase === 'drill') {
    c.innerHTML = `
      <div style="max-width:560px">
        <div class="timer-block">
          <div class="timer-display" id="sp-drill-timer">10:00</div>
          <div class="timer-info">
            <div class="t-label">attempts</div>
            <div class="t-stat" id="sp-drill-att">0</div>
          </div>
        </div>
        <div class="timer-prog"><div class="timer-prog-fill" id="sp-drill-prog" style="width:100%"></div></div>
        <div class="speak-prompt-box">
          <div class="speak-topic-label">Topic — changes every 60s</div>
          <div class="speak-topic-text" id="sp-drill-topic">${SPEAK_PROMPTS[0].de}</div>
          <div class="speak-topic-hint" id="sp-drill-hint">${SPEAK_PROMPTS[0].hint}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.3);margin-top:8px">next in <span id="sp-drill-next">60</span>s</div>
        </div>
        <button class="mic-btn-big" id="sp-drill-mic" onclick="toggleSpDrillMic()">🎙️ <span id="sp-drill-mic-lbl">Tap to speak</span></button>
        <div style="font-size:14px;font-weight:500;margin-bottom:10px">Rate your attempt:</div>
        <div class="rate-grid">
          <button class="rate-btn" onclick="logSpDrill(0)">Barely anything</button>
          <button class="rate-btn" onclick="logSpDrill(1)">Few words</button>
          <button class="rate-btn" onclick="logSpDrill(2)">Broken sentence</button>
          <button class="rate-btn" onclick="logSpDrill(3)">Full sentence</button>
          <button class="rate-btn" onclick="logSpDrill(4)">Multiple sentences</button>
        </div>
        <div id="sp-drill-log" style="margin-top:12px;min-height:24px;font-size:13px;color:var(--gray-400)"></div>
        <div class="btn-row" style="margin-top:14px">
          <button class="btn-secondary" onclick="finishSpDrill()">Done early</button>
        </div>
      </div>
    `;
  }
}

let _spDrillInterval = null, _spDrillTopicI = 0, _spDrillTopicSecs = 60, _spDrillSecs = 600, _spDrillLog = [];

function startSpDrill() {
  _spDrillSecs = 600; _spDrillTopicI = 0; _spDrillTopicSecs = 60; _spDrillLog = [];
  if (_spDrillInterval) clearInterval(_spDrillInterval);
  _spDrillInterval = setInterval(() => {
    _spDrillSecs--; _spDrillTopicSecs--;
    const m = Math.floor(_spDrillSecs / 60), s = _spDrillSecs % 60;
    const el = document.getElementById('sp-drill-timer');
    if (el) el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    const prog = document.getElementById('sp-drill-prog');
    if (prog) prog.style.width = (_spDrillSecs / 600 * 100) + '%';
    const nx = document.getElementById('sp-drill-next');
    if (nx) nx.textContent = _spDrillTopicSecs;
    if (_spDrillTopicSecs <= 0) {
      _spDrillTopicI = (_spDrillTopicI + 1) % SPEAK_PROMPTS.length;
      _spDrillTopicSecs = 60;
      const tp = document.getElementById('sp-drill-topic');
      const th = document.getElementById('sp-drill-hint');
      if (tp) tp.textContent = SPEAK_PROMPTS[_spDrillTopicI].de;
      if (th) th.textContent = SPEAK_PROMPTS[_spDrillTopicI].hint;
    }
    if (_spDrillSecs <= 0) { clearInterval(_spDrillInterval); finishSpDrill(); }
  }, 1000);
}

function toggleSpDrillMic() {
  const btn = document.getElementById('sp-drill-mic');
  const lbl = document.getElementById('sp-drill-mic-lbl');
  state.micOn = !state.micOn;
  if (btn) btn.classList.toggle('on', state.micOn);
  if (lbl) lbl.textContent = state.micOn ? 'Recording...' : 'Tap to speak';
}

function logSpDrill(score) {
  _spDrillLog.push(score);
  const el = document.getElementById('sp-drill-att');
  if (el) el.textContent = _spDrillLog.length;
  const labels = ['Barely anything', 'Few words', 'Broken', 'Full sentence', 'Multiple'];
  const log = document.getElementById('sp-drill-log');
  if (log) log.innerHTML = `Logged: <strong>${labels[score]}</strong>`;
  state.micOn = false;
  const btn = document.getElementById('sp-drill-mic');
  if (btn) btn.classList.remove('on');
  addXP(score * 5 + 5);
}

function finishSpDrill() {
  clearInterval(_spDrillInterval);
  state.spPhase = 'intro';
  renderSpeakPage();
  showNotif('Speaking drill done! 🎙️');
}

// ── UTILITIES ──
function speakText(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'de-DE'; u.rate = 0.82;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}
