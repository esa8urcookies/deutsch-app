// ── VOCABULARY DATA ──
const VOCAB = [
  // NOUNS
  {de:'der Bahnhof',en:'train station',type:'noun',gender:'m',example:'Ich gehe zum Bahnhof.',cat:'Travel'},
  {de:'die Wohnung',en:'apartment',type:'noun',gender:'f',example:'Ich wohne in einer Wohnung.',cat:'Daily Life'},
  {de:'der Termin',en:'appointment',type:'noun',gender:'m',example:'Ich habe einen Termin um zehn Uhr.',cat:'Daily Life'},
  {de:'die Arbeit',en:'work / job',type:'noun',gender:'f',example:'Ich gehe zur Arbeit.',cat:'Work'},
  {de:'der Arzt',en:'doctor (male)',type:'noun',gender:'m',example:'Ich brauche einen Arzt.',cat:'Health'},
  {de:'die Apotheke',en:'pharmacy',type:'noun',gender:'f',example:'Wo ist die nächste Apotheke?',cat:'Health'},
  {de:'die Rechnung',en:'bill / invoice',type:'noun',gender:'f',example:'Kann ich die Rechnung haben?',cat:'Shopping'},
  {de:'der Nachbar',en:'neighbor',type:'noun',gender:'m',example:'Mein Nachbar ist sehr nett.',cat:'Daily Life'},
  {de:'der Ausgang',en:'exit',type:'noun',gender:'m',example:'Wo ist der Ausgang?',cat:'Travel'},
  {de:'das Formular',en:'form (document)',type:'noun',gender:'n',example:'Ich muss das Formular ausfüllen.',cat:'Admin'},
  {de:'die Quittung',en:'receipt',type:'noun',gender:'f',example:'Kann ich eine Quittung bekommen?',cat:'Shopping'},
  {de:'der Aufzug',en:'elevator',type:'noun',gender:'m',example:'Ist der Aufzug kaputt?',cat:'Daily Life'},
  {de:'die Unterkunft',en:'accommodation',type:'noun',gender:'f',example:'Ich suche eine Unterkunft.',cat:'Travel'},
  {de:'das Krankenhaus',en:'hospital',type:'noun',gender:'n',example:'Das Krankenhaus ist in der Nähe.',cat:'Health'},
  {de:'der Führerschein',en:'driver\'s license',type:'noun',gender:'m',example:'Ich habe meinen Führerschein dabei.',cat:'Admin'},
  {de:'die Veranstaltung',en:'event',type:'noun',gender:'f',example:'Die Veranstaltung beginnt um 20 Uhr.',cat:'Social'},
  {de:'der Umzug',en:'move / relocation',type:'noun',gender:'m',example:'Mein Umzug ist nächsten Samstag.',cat:'Daily Life'},
  {de:'die Erkältung',en:'cold (illness)',type:'noun',gender:'f',example:'Ich habe eine Erkältung.',cat:'Health'},
  {de:'das Einzelzimmer',en:'single room',type:'noun',gender:'n',example:'Ich möchte ein Einzelzimmer.',cat:'Travel'},
  {de:'die Mehrwertsteuer',en:'VAT / sales tax',type:'noun',gender:'f',example:'Ist die Mehrwertsteuer inklusive?',cat:'Shopping'},
  // VERBS
  {de:'einkaufen',en:'to go shopping',type:'verb',example:'Ich kaufe jeden Tag ein.',cat:'Daily Life'},
  {de:'verstehen',en:'to understand',type:'verb',example:'Ich verstehe das nicht.',cat:'Communication'},
  {de:'brauchen',en:'to need',type:'verb',example:'Ich brauche Hilfe.',cat:'Daily Life'},
  {de:'bezahlen',en:'to pay',type:'verb',example:'Ich möchte bar bezahlen.',cat:'Shopping'},
  {de:'empfehlen',en:'to recommend',type:'verb',example:'Können Sie ein Restaurant empfehlen?',cat:'Social'},
  {de:'sich vorstellen',en:'to introduce yourself',type:'verb',example:'Darf ich mich vorstellen?',cat:'Social'},
  {de:'ausfüllen',en:'to fill out (a form)',type:'verb',example:'Bitte füllen Sie das Formular aus.',cat:'Admin'},
  {de:'aussteigen',en:'to get off (transport)',type:'verb',example:'Wo muss ich aussteigen?',cat:'Travel'},
  {de:'umsteigen',en:'to transfer / change (transport)',type:'verb',example:'Muss ich umsteigen?',cat:'Travel'},
  {de:'sich erkälten',en:'to catch a cold',type:'verb',example:'Ich habe mich erkältet.',cat:'Health'},
  {de:'verbringen',en:'to spend (time)',type:'verb',example:'Ich verbringe den Urlaub in Berlin.',cat:'Daily Life'},
  {de:'stattfinden',en:'to take place',type:'verb',example:'Das Konzert findet am Freitag statt.',cat:'Social'},
  {de:'sich beschweren',en:'to complain',type:'verb',example:'Ich möchte mich beschweren.',cat:'Communication'},
  {de:'verschieben',en:'to postpone',type:'verb',example:'Können wir den Termin verschieben?',cat:'Admin'},
  {de:'erreichen',en:'to reach / to achieve',type:'verb',example:'Ich kann Sie nicht erreichen.',cat:'Communication'},
  // ADJECTIVES
  {de:'pünktlich',en:'punctual / on time',type:'adjective',example:'Der Zug ist pünktlich.',cat:'Describing'},
  {de:'günstig',en:'affordable / cheap',type:'adjective',example:'Das ist sehr günstig.',cat:'Shopping'},
  {de:'fertig',en:'done / ready / finished',type:'adjective',example:'Ich bin fertig.',cat:'Daily Life'},
  {de:'kostenlos',en:'free of charge',type:'adjective',example:'Das ist kostenlos.',cat:'Shopping'},
  {de:'verfügbar',en:'available',type:'adjective',example:'Ist das Zimmer noch verfügbar?',cat:'Admin'},
  {de:'ausverkauft',en:'sold out',type:'adjective',example:'Die Tickets sind ausverkauft.',cat:'Shopping'},
  {de:'besetzt',en:'occupied / taken / busy',type:'adjective',example:'Dieser Platz ist besetzt.',cat:'Daily Life'},
  {de:'zuverlässig',en:'reliable',type:'adjective',example:'Er ist sehr zuverlässig.',cat:'Describing'},
  // PHRASES
  {de:'Ich hätte gerne...',en:'I would like...',type:'phrase',example:'Ich hätte gerne einen Kaffee.',cat:'Ordering'},
  {de:'Könnten Sie das wiederholen?',en:'Could you repeat that?',type:'phrase',example:'Könnten Sie das bitte wiederholen?',cat:'Communication'},
  {de:'Das macht Sinn.',en:'That makes sense.',type:'phrase',example:'Ja, das macht Sinn.',cat:'Communication'},
  {de:'Ich muss kurz nachdenken.',en:'I need to think for a moment.',type:'phrase',example:'Ich muss kurz nachdenken.',cat:'Communication'},
  {de:'Es tut mir leid.',en:'I\'m sorry.',type:'phrase',example:'Es tut mir leid, ich verstehe das nicht.',cat:'Communication'},
  {de:'Wie lange dauert das?',en:'How long does that take?',type:'phrase',example:'Wie lange dauert die Fahrt?',cat:'Travel'},
  {de:'Ich freue mich darauf.',en:'I\'m looking forward to it.',type:'phrase',example:'Ich freue mich sehr darauf.',cat:'Social'},
  {de:'Das kommt darauf an.',en:'It depends.',type:'phrase',example:'Das kommt darauf an.',cat:'Communication'},
];

// ── GRAMMAR QUESTIONS ──
const GRAMMAR_QS = [
  {q:'___ Hund läuft schnell.',opts:['Ein','Eine','Der','Die'],correct:2,explain:'"Hund" (dog) is masculine → nominative = "der". "Ein" also works but the article here is definite.',topic:'Articles'},
  {q:'Ich habe gestern viel ___ (arbeiten).',opts:['arbeite','gearbeitet','gearbeiten','arbeiten'],correct:1,explain:'Past participle of "arbeiten" = "gearbeitet". Weak verbs: ge + stem + t.',topic:'Past Tense'},
  {q:'Er fährt ___ Berlin nach München.',opts:['von','aus','mit','durch'],correct:0,explain:'"von ... nach ..." = from ... to ... for cities. Core A2 structure.',topic:'Prepositions'},
  {q:'Ich kaufe ___ Mutter ein Geschenk.',opts:['meine','meiner','meinen','meinem'],correct:1,explain:'"Mutter" is dative (indirect object). Feminine dative = "meiner".',topic:'Cases'},
  {q:'___ du schon mal in Deutschland gewesen?',opts:['Bist','Hast','Warst','Wirst'],correct:0,explain:'"sein" uses "bist" in Perfekt. "gewesen" = been.',topic:'Perfekt'},
  {q:'Das ist das Buch, ___ ich lese.',opts:['der','die','das','den'],correct:2,explain:'Relative pronoun matches noun gender. "Buch" is neuter → "das".',topic:'Relative Clauses'},
  {q:'Ich gehe ___ Supermarkt.',opts:['zu dem','zum','in den','nach dem'],correct:1,explain:'"zum" = "zu dem" (contracted). "zum Supermarkt" for places you walk into.',topic:'Prepositions'},
  {q:'"gehen" in Perfekt: Ich ___ nach Hause ___.',opts:['habe...gegangen','bin...gegangen','habe...gegangt','bin...gehen'],correct:1,explain:'"gehen" is movement → uses "sein". "bin gegangen", not "habe".',topic:'Perfekt'},
  {q:'Ich lerne Deutsch, ___ ich in Berlin arbeite.',opts:['weil arbeite ich','weil ich arbeite','weil ich arbeiten','weil arbeiten ich'],correct:1,explain:'"weil" sends verb to END of clause. "...weil ich in Berlin arbeite."',topic:'Word Order'},
  {q:'___ dem Essen gehe ich spazieren.',opts:['Nach','Vor','Seit','Während'],correct:0,explain:'"nach" + dative for "after". "nach dem Essen" = after the meal.',topic:'Prepositions'},
  {q:'Er ___ jeden Tag Deutsch.',opts:['lerne','lernt','lernen','lernst'],correct:1,explain:'"er/sie/es" → 3rd person singular = stem + t. "lernen" → "lernt".',topic:'Verb Conjugation'},
  {q:'Ich habe ___ Freund angerufen.',opts:['mein','meinen','meiner','meinem'],correct:1,explain:'"Freund" is masculine. "anrufen" takes accusative. Masc. acc. → "meinen".',topic:'Cases'},
  {q:'Wie lange ___ du schon in Berlin?',opts:['bist','lebst','wohnst','wohnst du'],correct:2,explain:'"seit" + present tense: "Ich wohne seit 5 Jahren" — but "Wie lange wohnst du..." uses "wohnen".',topic:'Verb Conjugation'},
  {q:'___ ist es?  — Es ist halb acht.',opts:['7:30','8:30','8:00','7:00'],correct:0,explain:'"halb acht" = HALF before eight = 7:30. Most English speakers get this wrong.',topic:'Time'},
  {q:'Ich ___ gestern nicht schlafen.',opts:['kann','könnte','habe gekonnt','konnte'],correct:3,explain:'Modal verbs in narrative past use Präteritum: "können" → "konnte".',topic:'Modals'},
];

// ── LISTENING QUESTIONS ──
const LISTENING_QS = [
  {phrase:'Ich muss morgen früh aufstehen.',q:'What does this mean?',opts:['I had to wake up early yesterday','I have to wake up early tomorrow','I want to sleep longer','I woke up early this morning'],correct:1,explain:'"muss" = must (present), "morgen" = tomorrow, "früh aufstehen" = wake up early.'},
  {phrase:'Haben Sie einen Tisch für zwei Personen?',q:'Where would you hear this?',opts:['Pharmacy','Train station','Restaurant','Bank'],correct:2,explain:'"Tisch für zwei Personen" = table for two — restaurant phrase.'},
  {phrase:'Die Veranstaltung beginnt um halb acht.',q:'When does it start?',opts:['8:00','7:30','8:30','7:00'],correct:1,explain:'"halb acht" = 7:30 in German. This trips almost every English speaker.'},
  {phrase:'Es tut mir leid, ich verstehe das nicht ganz.',q:'What is the speaker saying?',opts:['They are angry','They partially don\'t understand','They understand completely','They are in a hurry'],correct:1,explain:'"nicht ganz" = not completely. Polite partial misunderstanding.'},
  {phrase:'Könnten Sie mir bitte den Weg zum Bahnhof erklären?',q:'What are they asking for?',opts:['A ticket to the station','Directions to the station','How long to the station','What time the train leaves'],correct:1,explain:'"den Weg erklären" = to explain the way. "zum Bahnhof" = to the station.'},
  {phrase:'Ich wohne seit fünf Jahren in Berlin, aber mein Deutsch ist noch nicht so gut.',q:'What does the person admit?',opts:['They just moved to Berlin','They\'ve lived in Berlin 5 years but their German isn\'t great','They speak perfect German','They don\'t want to learn German'],correct:1,explain:'"seit fünf Jahren" = for five years. "noch nicht so gut" = not yet that good.'},
];

// ── LESSONS ──
const LESSONS = [
  {
    id:0, title:'The German Cases — Why everything changes',
    tag:'Grammar', mins:8, done:false,
    content:`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:8px">The 4 German Cases</h2>
      <p style="font-size:15px;color:var(--gray-600);margin-bottom:24px">This is the #1 reason German feels confusing. Once you get this, everything else clicks.</p>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:12px">The idea in plain English</h3>
        <p style="font-size:14px;color:var(--gray-600);line-height:1.7">In English, word order tells you who does what: "The dog bites the man" vs "The man bites the dog." In German, the article changes to show this — so you can move words around and the meaning stays clear.</p>
      </div>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">The 4 cases at a glance</h3>
        <table style="width:100%;font-size:13px;border-collapse:collapse">
          <tr style="background:var(--gray-50)">
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">Case</th>
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">Job</th>
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">Example</th>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:500">Nominative</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--gray-600)">Subject (does the action)</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);font-style:italic">Der Mann kauft.</td>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:500">Accusative</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--gray-600)">Direct object (receives action)</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);font-style:italic">Er kauft <u>einen</u> Hund.</td>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:500">Dative</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--gray-600)">Indirect object (recipient)</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);font-style:italic">Er gibt <u>dem</u> Mann das Buch.</td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:500">Genitive</td>
            <td style="padding:10px;color:var(--gray-600)">Possession (of)</td>
            <td style="padding:10px;font-style:italic">Das ist das Buch <u>des</u> Mannes.</td>
          </tr>
        </table>
      </div>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">Article table — memorize this</h3>
        <table style="width:100%;font-size:13px;border-collapse:collapse">
          <tr style="background:var(--gray-50)">
            <th style="padding:10px;border-bottom:1px solid var(--gray-100)"></th>
            <th style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:600">Masc (der)</th>
            <th style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:600">Fem (die)</th>
            <th style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:600">Neut (das)</th>
            <th style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:600">Plural</th>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:600;background:var(--gray-50)">Nom</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100)">der / ein</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100)">die / eine</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100)">das / ein</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100)">die / —</td>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:600;background:var(--gray-50)">Acc</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--red);font-weight:500">den / einen</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100)">die / eine</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100)">das / ein</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100)">die / —</td>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:600;background:var(--gray-50)">Dat</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--blue);font-weight:500">dem / einem</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--blue);font-weight:500">der / einer</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--blue);font-weight:500">dem / einem</td>
            <td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--blue);font-weight:500">den / —</td>
          </tr>
        </table>
        <p style="font-size:13px;color:var(--gray-400);margin-top:10px">Red = only masculine changes in accusative. Blue = dative has its own set entirely.</p>
      </div>

      <div style="background:var(--amber-light);border-radius:var(--radius);padding:14px 16px;margin-bottom:16px">
        <p style="font-size:14px;color:var(--amber);font-weight:500">Shortcut: Only masculine changes in accusative (der → den, ein → einen). Everything else stays the same from nominative.</p>
      </div>

      <h3 style="font-size:16px;font-weight:600;margin-bottom:12px">Practice sentences</h3>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
        ${['Ich sehe <u>den</u> Mann. (acc, masc)','Ich helfe <u>dem</u> Mann. (dat, masc)','Ich kaufe <u>eine</u> Wohnung. (acc, fem — same as nom)','Ich gebe <u>der</u> Frau das Buch. (dat, fem)'].map(s=>`<div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius);padding:12px 16px;font-size:14px">${s}</div>`).join('')}
      </div>
    `
  },
  {
    id:1, title:'Perfekt — How to talk about the past',
    tag:'Grammar', mins:7, done:false,
    content:`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:8px">The Perfekt Tense</h2>
      <p style="font-size:15px;color:var(--gray-600);margin-bottom:24px">This is how Germans actually talk about the past in everyday speech. Not textbook Präteritum — Perfekt.</p>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px">The formula</h3>
        <div style="background:var(--black);color:var(--white);border-radius:var(--radius);padding:16px;text-align:center;font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;letter-spacing:-0.5px;margin-bottom:12px">haben/sein + [verb moved to end as past participle]</div>
        <p style="font-size:14px;color:var(--gray-600)">Example: Ich <strong>habe</strong> gestern viel <strong>gearbeitet</strong>. (I worked a lot yesterday.)</p>
      </div>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:12px">haben vs sein — the critical split</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div style="background:var(--green-light);border-radius:var(--radius);padding:14px">
            <div style="font-weight:600;color:var(--green);margin-bottom:8px">Use HABEN (most verbs)</div>
            <div style="font-size:13px;color:var(--green);line-height:1.8">Ich habe gegessen<br>Ich habe gearbeitet<br>Ich habe gekauft<br>Ich habe gesagt</div>
          </div>
          <div style="background:var(--blue-light);border-radius:var(--radius);padding:14px">
            <div style="font-weight:600;color:var(--blue);margin-bottom:8px">Use SEIN (movement + change of state)</div>
            <div style="font-size:13px;color:var(--blue);line-height:1.8">Ich bin gegangen<br>Ich bin gefahren<br>Ich bin gekommen<br>Ich bin aufgestanden</div>
          </div>
        </div>
      </div>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:12px">Past participle formation</h3>
        <table style="width:100%;font-size:13px;border-collapse:collapse">
          <tr style="background:var(--gray-50)">
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">Type</th>
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">Rule</th>
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">Example</th>
          </tr>
          ${[
            ['Regular (weak)','ge + stem + t','machen → gemacht'],
            ['Irregular (strong)','ge + changed stem + en','fahren → gefahren'],
            ['-ieren verbs','just stem + t (no ge-)','studieren → studiert'],
            ['Separable verbs','ge goes in the middle','aufmachen → aufgemacht'],
          ].map(([t,r,e])=>`<tr><td style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:500">${t}</td><td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--gray-600)">${r}</td><td style="padding:10px;border-bottom:1px solid var(--gray-100);font-style:italic">${e}</td></tr>`).join('')}
        </table>
      </div>
    `
  },
  {
    id:2, title:'Word Order — The verb always goes second',
    tag:'Grammar', mins:6, done:false,
    content:`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:8px">German Word Order</h2>
      <p style="font-size:15px;color:var(--gray-600);margin-bottom:24px">One rule covers 90% of it: the conjugated verb is always in position 2. After that, the verb frame fills the end.</p>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:12px">The verb-second (V2) rule</h3>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
          ${[
            ['Ich','gehe','jeden Tag','zur Arbeit.','-'],
            ['Jeden Tag','gehe','ich','zur Arbeit.','-'],
            ['Zur Arbeit','gehe','ich','jeden Tag.', '-'],
          ].map(([p1,v,p2,p3])=>`
          <div style="display:flex;gap:0;font-size:14px;border-radius:var(--radius);overflow:hidden">
            <div style="background:var(--gray-50);padding:10px 14px;border:1px solid var(--gray-100)">${p1}</div>
            <div style="background:var(--black);color:var(--white);padding:10px 14px;font-weight:600">${v}</div>
            <div style="background:var(--gray-50);padding:10px 14px;border:1px solid var(--gray-100);flex:1">${p2} ${p3}</div>
          </div>`).join('')}
        </div>
        <p style="font-size:13px;color:var(--gray-400)">Whatever comes first, the verb stays in slot 2. The subject just moves to slot 3 if something else goes first.</p>
      </div>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:12px">Verb FRAME — two-part verbs and Perfekt</h3>
        <p style="font-size:14px;color:var(--gray-600);margin-bottom:12px">When you have two verb parts, they split: conjugated verb stays in slot 2, second part goes to the END.</p>
        ${[
          'Ich <strong>habe</strong> gestern viel Deutsch <strong>gelernt</strong>.',
          'Ich <strong>muss</strong> morgen früh <strong>aufstehen</strong>.',
          'Wann <strong>bist</strong> du nach Hause <strong>gekommen</strong>?',
        ].map(s=>`<div style="background:var(--gray-50);border-radius:var(--radius);padding:12px 14px;font-size:14px;margin-bottom:8px">${s}</div>`).join('')}
      </div>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:12px">Subordinating conjunctions — verb to the END</h3>
        <p style="font-size:14px;color:var(--gray-600);margin-bottom:12px">After: <strong>weil, dass, wenn, obwohl, während, bevor, nachdem, seit</strong> — verb goes to the absolute end.</p>
        ${[
          'Ich lerne Deutsch, <strong>weil</strong> ich in Berlin <strong>arbeite</strong>.',
          'Ich weiß, <strong>dass</strong> er kein Geld <strong>hat</strong>.',
          '<strong>Wenn</strong> ich Zeit <strong>habe</strong>, gehe ich laufen.',
        ].map(s=>`<div style="background:var(--gray-50);border-radius:var(--radius);padding:12px 14px;font-size:14px;margin-bottom:8px">${s}</div>`).join('')}
      </div>
    `
  },
  {
    id:3, title:'Modal Verbs — können, müssen, wollen',
    tag:'Grammar', mins:7, done:false,
    content:`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:8px">Modal Verbs</h2>
      <p style="font-size:15px;color:var(--gray-600);margin-bottom:24px">Modals let you express ability, obligation, permission, and desire. Six verbs, massive range.</p>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <table style="width:100%;font-size:13px;border-collapse:collapse">
          <tr style="background:var(--gray-50)">
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">Modal</th>
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">Meaning</th>
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">ich form</th>
            <th style="padding:10px;text-align:left;font-weight:600;border-bottom:1px solid var(--gray-100)">Example</th>
          </tr>
          ${[
            ['können','can / to be able to','kann','Ich kann Deutsch sprechen.'],
            ['müssen','must / have to','muss','Ich muss arbeiten.'],
            ['wollen','to want to','will','Ich will nach Hause gehen.'],
            ['sollen','should / supposed to','soll','Ich soll um 8 Uhr dort sein.'],
            ['dürfen','may / allowed to','darf','Hier darf man nicht rauchen.'],
            ['mögen / möchten','to like / would like','mag / möchte','Ich möchte einen Kaffee.'],
          ].map(([m,mn,ich,ex])=>`<tr><td style="padding:10px;border-bottom:1px solid var(--gray-100);font-weight:600">${m}</td><td style="padding:10px;border-bottom:1px solid var(--gray-100);color:var(--gray-600)">${mn}</td><td style="padding:10px;border-bottom:1px solid var(--gray-100);font-family:'Space Grotesk',sans-serif;font-weight:600">${ich}</td><td style="padding:10px;border-bottom:1px solid var(--gray-100);font-style:italic">${ex}</td></tr>`).join('')}
        </table>
      </div>

      <div style="background:var(--amber-light);border-radius:var(--radius);padding:14px 16px;margin-bottom:16px">
        <p style="font-size:14px;color:var(--amber);font-weight:500">Word order rule: modal goes in slot 2 (conjugated), infinitive goes to the END. "Ich <u>muss</u> morgen früh <u>aufstehen</u>."</p>
      </div>
    `
  },
  {
    id:4, title:'Dative Prepositions — in, an, auf, bei, mit...',
    tag:'Grammar', mins:6, done:false,
    content:`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:8px">Dative Prepositions</h2>
      <p style="font-size:15px;color:var(--gray-600);margin-bottom:24px">Certain prepositions ALWAYS trigger dative. Learn these as fixed pairs.</p>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:12px">Always dative</h3>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px">
          ${[
            ['mit','with','mit dem Bus fahren'],
            ['nach','after / to (cities)','nach Berlin fahren'],
            ['bei','at / with (person/place)','beim Arzt sein'],
            ['von','from / of','von der Arbeit kommen'],
            ['zu','to (person/place)','zur Schule gehen'],
            ['seit','since / for','seit drei Jahren'],
            ['aus','from / out of','aus Deutschland kommen'],
            ['gegenüber','opposite','gegenüber dem Bahnhof'],
          ].map(([p,m,ex])=>`
          <div style="background:var(--gray-50);border-radius:var(--radius);padding:12px">
            <span style="font-weight:700;font-size:16px">${p}</span>
            <span style="color:var(--gray-600);font-size:13px"> — ${m}</span>
            <div style="font-size:12px;color:var(--gray-400);font-style:italic;margin-top:4px">${ex}</div>
          </div>`).join('')}
        </div>
      </div>

      <div style="background:var(--blue-light);border-radius:var(--radius);padding:14px 16px;margin-bottom:16px">
        <p style="font-size:14px;color:var(--blue);font-weight:500">Contractions to memorize: zu + dem = zum · zu + der = zur · bei + dem = beim · von + dem = vom · an + dem = am · in + dem = im</p>
      </div>
    `
  },
];

// ── SPEAKING PROMPTS ──
const SPEAK_PROMPTS = [
  {de:'Alltag — Daily routine',hint:'Morgenroutine, Arbeit, Essen'},
  {de:'Familie & Freunde',hint:'Beschreib Menschen in deinem Leben'},
  {de:'Wo du wohnst',hint:'Berlin, dein Zimmer, deine Straße'},
  {de:'Vergangene Woche',hint:'Was hast du gemacht? Perfekt nutzen!'},
  {de:'Deine Pläne',hint:'Was willst du machen? möchten, wollen, werden'},
  {de:'Essen & Trinken',hint:'Was magst du? Was isst du oft?'},
  {de:'Arbeit & Geld',hint:'Deine Arbeit, Einkaufen, Rechnungen'},
  {de:'Sport & Hobbys',hint:'Fußball, Surfen, Musik — alles'},
  {de:'Über dich selbst',hint:'Woher kommst du? Wie lange bist du hier?'},
  {de:'Freie Runde',hint:'Alles was du noch sagen kannst'},
];
