// ── AI TUTOR — Klaus ──
const AI = {
  mode: 'chat',
  history: [],
  msgCount: 0,
  corrections: 0,
  xpFromChat: 0,
  isTyping: false,
  speechOn: false,
  recognition: null,
};

const QUICK_PHRASES = [
  { de: 'Ich verstehe nicht.', en: 'I don\'t understand.' },
  { de: 'Kannst du das wiederholen?', en: 'Can you repeat that?' },
  { de: 'Wie sagt man ... auf Deutsch?', en: 'How do you say ... in German?' },
  { de: 'Was bedeutet das?', en: 'What does that mean?' },
  { de: 'Ich bin müde.', en: 'I\'m tired.' },
  { de: 'Das ist schwierig.', en: 'That\'s difficult.' },
];

const MODE_CONFIGS = {
  chat: {
    label: 'Free chat',
    system: `You are Klaus, a friendly but brutally honest German language tutor for an English speaker named Esai who lives in Berlin and has been there 5 years but is still around A2 level. Your job: have natural conversations in a mix of German and English, gently correct his German mistakes inline, teach him naturally through conversation. 

Rules:
- Keep responses SHORT (2-5 sentences max usually)
- Mix German and English naturally — write German phrases with English translations in parentheses
- When Esai writes German, ALWAYS correct any mistakes first, then continue the conversation
- Be direct and real, not overly cheerful
- Ask follow-up questions to keep conversation going
- Format corrections clearly: ~~wrong~~ → **correct** (explanation)
- Encourage speaking but don't be a cheerleader about it
- Reference Berlin, daily life, his work, soccer, faith when relevant`,
    suggestions: ['Tell me about your day in German', 'Correct my sentence: Ich bin gehen zur Arbeit', 'How do I say "I\'m running late"?', 'Ask me a question in German'],
  },
  correct: {
    label: 'Correct my German',
    system: `You are Klaus, a German tutor. The user will write German sentences and you will correct them with surgical precision.

For each input:
1. Show the original
2. Show the corrected version with ** around fixed words
3. List each error with a clear one-line explanation
4. Give the grammar rule that applies
5. Give one example sentence using the same rule

Be direct. No fluff. Format cleanly. Keep explanations short and memorable.`,
    suggestions: ['Ich bin gegangen zu die Schule', 'Er hat ein Hund kauft', 'Weil ich bin müde, ich schlafe früh', 'Ich wohne hier seit fünf Jahre'],
  },
  drill: {
    label: 'Grammar drill',
    system: `You are Klaus, a German tutor running a grammar drill session. Give the user one grammar challenge at a time. Wait for their answer. Then:
- Say if it's correct or wrong
- Explain the rule in one sentence
- Give the next drill immediately

Drill types to rotate through: article + case (give a noun, they supply der/die/das/den/dem etc), verb conjugation (give infinitive + subject, they conjugate), fill-the-blank sentences, quick translation (English → German), "weil" sentence building.

Be fast-paced. Short responses. One question at a time. Keep score mentally and report it every 5 questions.`,
    suggestions: ['Start the drill', 'Give me case drills only', 'Give me verb conjugation drills', 'Make it harder'],
  },
  vocab: {
    label: 'Vocab builder',
    system: `You are Klaus, a German vocabulary coach. Help Esai expand his German vocabulary.

Methods:
- Introduce words in context (real sentences, not just definitions)
- Group words by theme (work, daily life, emotions, etc)
- Teach word families (arbeiten → die Arbeit → der Arbeiter → arbeitslos)
- Point out false friends and tricky pairs
- Use spaced repetition by testing recently taught words
- When he asks about a word, give: the word, gender (for nouns), plural form, one example sentence, one common phrase it appears in

Keep responses tight. Teach 2-3 words at a time max.`,
    suggestions: ['Teach me work-related words', 'What\'s the difference between kennen and wissen?', 'Teach me emotion words', 'Word family for "fahren"'],
  },
  scenario: {
    label: 'Real scenario',
    system: `You are Klaus, and you're running a real-life German scenario roleplay with Esai.

Pick a scenario and stay IN CHARACTER as the other person in the scenario. Common Berlin scenarios: ordering at a Bäckerei, talking to a landlord (Vermieter), at the Bürgeramt (registration office), buying something at a market, calling a doctor's office, talking to a colleague, asking for directions, at the Supermarkt checkout.

Rules:
- Announce the scenario and your character at the start
- Speak mostly in German (you're playing a German speaker)
- Respond naturally as that character would
- After each exchange, show in [brackets] what you noticed about their German
- If they get stuck, give them a hint in English
- End the scenario after 6-8 exchanges and give a debrief`,
    suggestions: ['Bäckerei — ordering breakfast', 'Landlord calling about rent', 'Bürgeramt — registering your address', 'Asking directions in Mitte'],
  },
  explain: {
    label: 'Explain grammar',
    system: `You are Klaus, a German grammar explainer. When given a grammar topic or a confusing sentence, explain it clearly and practically.

Format:
1. The rule in one sentence (plain English)
2. Why it works this way (brief)
3. The pattern to remember (bold the key part)
4. 3 real examples from daily life in Berlin
5. The #1 mistake people make with this rule
6. A quick 2-question mini quiz to check understanding

Avoid textbook jargon. Keep it real and relevant to A2 level. Reference things Esai encounters in real Berlin life.`,
    suggestions: ['Explain the dative case', 'Why does weil send the verb to the end?', 'When do I use sein vs haben in Perfekt?', 'Explain halb acht vs 7:30'],
  },
};

function initAITutor() {
  AI.history = [];
  AI.msgCount = 0;
  AI.corrections = 0;
  AI.xpFromChat = 0;
  renderAIMessages();
  renderQuickPhrases();
  setMode('chat', document.querySelector('.ai-mode-btn'));
  addAIMessage('ai', `Hey Esai. I'm Klaus — your German tutor. I'm not here to make you feel good, I'm here to make you better. 

Pick a mode above or just start talking. Ask me anything in English or try writing something in German and I'll tell you exactly what's wrong.

Let's go. **Fang an.** (Start.)`, false);
}

function setMode(mode, el) {
  AI.mode = mode;
  document.querySelectorAll('.ai-mode-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  const config = MODE_CONFIGS[mode];
  document.getElementById('ai-mode-pill').textContent = config.label;
  renderSuggestions(config.suggestions);
  const modeMessages = {
    correct: 'Correction mode. Type or paste your German — I\'ll tear it apart and explain every mistake.',
    drill: 'Drill mode. I\'ll fire grammar challenges at you one by one. Type "start" when ready.',
    vocab: 'Vocab mode. Tell me a topic or ask about any word. I\'ll teach you in context.',
    scenario: 'Scenario mode. Pick a real Berlin situation from the suggestions and I\'ll play the other person. Full German immersion.',
    explain: 'Explain mode. Ask me any grammar question — cases, word order, tenses, whatever confuses you.',
  };
  if (modeMessages[mode]) {
    addAIMessage('ai', modeMessages[mode], false);
  }
}

function renderSuggestions(suggestions) {
  const el = document.getElementById('ai-suggestions');
  if (!el) return;
  el.innerHTML = suggestions.map(s =>
    `<button class="suggestion-chip" onclick="useSuggestion('${s.replace(/'/g, "\\'")}')">${s}</button>`
  ).join('');
}

function useSuggestion(text) {
  const input = document.getElementById('ai-input');
  if (input) { input.value = text; input.focus(); autoResize(input); }
}

function renderQuickPhrases() {
  const el = document.getElementById('ai-quick-phrases');
  if (!el) return;
  el.innerHTML = QUICK_PHRASES.map(p =>
    `<button class="quick-phrase" onclick="useSuggestion('${p.de.replace(/'/g, "\\'")}')">
      <strong>${p.de}</strong>${p.en}
    </button>`
  ).join('');
}

function addAIMessage(role, text, save = true) {
  const container = document.getElementById('ai-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  const avatar = role === 'user' ? 'E' : '🇩🇪';
  const formatted = formatAIText(text);
  div.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-bubble">${formatted}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  if (save) {
    AI.history.push({ role: role === 'user' ? 'user' : 'assistant', content: text });
  }
}

function formatAIText(text) {
  return text
    .replace(/~~(.+?)~~/g, '<span class="correction">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]/g, '<span class="explain">[$1]</span>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/`(.+?)`/g, '<code style="background:var(--gray-100);padding:1px 5px;border-radius:3px;font-size:13px">$1</code>');
}

function showTyping() {
  const container = document.getElementById('ai-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'msg ai';
  div.id = 'typing-indicator';
  div.innerHTML = `
    <div class="msg-avatar">🇩🇪</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function aiKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIMsg(); }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

async function sendAIMsg() {
  const input = document.getElementById('ai-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text || AI.isTyping) return;

  input.value = '';
  input.style.height = 'auto';
  addAIMessage('user', text);
  AI.msgCount++;
  updateAIStats();

  AI.isTyping = true;
  showTyping();

  try {
    const config = MODE_CONFIGS[AI.mode];
    const messages = [
      ...AI.history.slice(-12), // keep last 12 for context
      { role: 'user', content: text }
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: config.system,
        messages: messages,
      })
    });

    const data = await response.json();
    hideTyping();
    AI.isTyping = false;

    if (data.content && data.content[0]) {
      const reply = data.content[0].text;
      addAIMessage('ai', reply);

      // detect corrections and save them
      const correctionMatches = reply.match(/~~.+?~~/g);
      if (correctionMatches) {
        AI.corrections += correctionMatches.length;
        saveCorrectionToPanel(text, reply, correctionMatches);
      }

      // XP
      const xpEarned = AI.mode === 'drill' ? 20 : AI.mode === 'correct' ? 15 : 10;
      AI.xpFromChat += xpEarned;
      addXP(xpEarned);

      // speak response if mode is scenario
      if (AI.mode === 'scenario') {
        const germanOnly = reply.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim();
        speakText(germanOnly.substring(0, 200));
      }
    } else if (data.error) {
      addAIMessage('ai', `Error: ${data.error.message}. Check your API key in the settings.`);
    }
  } catch (err) {
    hideTyping();
    AI.isTyping = false;
    addAIMessage('ai', `Connection error. Make sure you\'re online. (${err.message})`);
  }

  updateAIStats();
}

function saveCorrectionToPanel(userText, reply, matches) {
  const list = document.getElementById('ai-corrections-list');
  if (!list) return;
  if (list.querySelector('.no-corrections')) list.innerHTML = '';
  const item = document.createElement('div');
  item.style.cssText = 'background:var(--red-light);border-radius:var(--radius-sm);padding:8px 10px;font-size:12px;color:var(--red);border-left:3px solid var(--red)';
  item.innerHTML = `<div style="font-weight:600;margin-bottom:2px">~~${matches[0].replace(/~~/g, '')}~~</div><div style="color:var(--gray-600)">${userText.substring(0, 40)}...</div>`;
  list.prepend(item);
  // keep only last 5
  while (list.children.length > 5) list.removeChild(list.lastChild);
}

function updateAIStats() {
  const ms = document.getElementById('ai-stat-msgs');
  const cs = document.getElementById('ai-stat-corrections');
  const xs = document.getElementById('ai-stat-xp');
  if (ms) ms.textContent = AI.msgCount;
  if (cs) cs.textContent = AI.corrections;
  if (xs) xs.textContent = AI.xpFromChat;
}

function renderAIMessages() {
  const container = document.getElementById('ai-messages');
  if (container) container.innerHTML = '';
}

// ── SPEECH INPUT ──
function toggleAISpeech() {
  const btn = document.getElementById('ai-speak-btn');
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    addAIMessage('ai', 'Speech recognition isn\'t supported in this browser. Try Chrome.', false);
    return;
  }
  if (AI.speechOn) {
    AI.speechOn = false;
    if (AI.recognition) AI.recognition.stop();
    if (btn) btn.classList.remove('on');
    return;
  }
  AI.speechOn = true;
  if (btn) btn.classList.add('on');
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  AI.recognition = new SR();
  AI.recognition.lang = 'de-DE';
  AI.recognition.continuous = false;
  AI.recognition.interimResults = false;
  AI.recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    const input = document.getElementById('ai-input');
    if (input) { input.value = transcript; autoResize(input); }
    AI.speechOn = false;
    if (btn) btn.classList.remove('on');
  };
  AI.recognition.onerror = () => {
    AI.speechOn = false;
    if (btn) btn.classList.remove('on');
  };
  AI.recognition.onend = () => {
    AI.speechOn = false;
    if (btn) btn.classList.remove('on');
  };
  AI.recognition.start();
}
