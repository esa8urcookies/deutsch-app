// ── COURSES SYSTEM ──

const COURSE_CATALOG = [
  {
    id:'first48', icon:'🛬', title:'First 48 Hours', track:'Survival', free:true,
    accent:'#2d6a4f', levelColor:'#d8f3dc', levelText:'#2d6a4f',
    levels:['A0','A1'], tags:['survival','free'],
    sub:'Zero German. Just landed. Survive the airport, U-Bahn, and your first night.',
    desc:'The course nobody makes. Before A1 grammar there are 50 words and phrases that keep you alive in Germany. This covers all of them through real Berlin situations with Klaus.',
    cert:'Survival Badge — Day 1 Ready',
    why:'Every immigrant needs this. You land, your phone is dead, the taxi driver speaks only German. This is that moment.',
    situations:['Finding your apartment from the airport','Supermarket checkout','Asking for help on the U-Bahn','Paying for things','Reading street signs and transit maps'],
    vocab:['Numbers 1-100','Emergency phrases: Hilfe! Polizei! Feuer!','Yes/No/Please/Thank you/Sorry','Transport: U-Bahn, S-Bahn, Bus, Taxi','Directions: links, rechts, geradeaus','Shops: Supermarkt, Apotheke, Bäckerei'],
    scenarios:['Taxi driver who speaks only German','Supermarket self-checkout machine','Stranger asking if you need help','Ordering at a Bäckerei by pointing','Finding your address in an unfamiliar area'],
    klausMode:'You are a Berlin local. Esai just landed and speaks zero German. Play different characters — taxi driver, supermarket clerk, stranger on the street. Speak simple, slow German. Give hints when completely stuck. Celebrate small wins.',
    lessons:[
      {title:'Emergency words — 10 that save you', content:'Hilfe (help), Polizei (police), Feuer (fire), Arzt (doctor), Krankenwagen (ambulance). These go in before anything else.'},
      {title:'Numbers 1-100', content:'Eins, zwei, drei... Prices, bus numbers, apartment floors. You need these immediately.'},
      {title:'Yes/No/Please/Thank you', content:'Ja, Nein, Bitte, Danke, Entschuldigung. Five words that get you through the first week.'},
      {title:'Getting from A to B', content:'Links (left), rechts (right), geradeaus (straight on), hier (here), dort (there), nah (near), weit (far).'},
      {title:'Paying and shopping', content:'Wie viel kostet das? (How much?), Kann ich mit Karte zahlen? (Can I pay by card?), Haben Sie...? (Do you have...?)'},
    ],
  },
  {
    id:'anmeldung', icon:'🏛️', title:'Anmeldung & Admin', track:'Survival', free:true,
    accent:'#b45309', levelColor:'#fef3c7', levelText:'#b45309',
    levels:['A1'], tags:['survival','free'],
    sub:'Register your address, open a bank account, understand official German letters.',
    desc:'The Anmeldung is the most important thing you do in Germany. Without it you cannot get a bank account, register for health insurance, or receive official mail. This course walks you through every step in German.',
    cert:'Germany Survivor — Admin Ready',
    why:'In Germany, bureaucracy is in German. There are no exceptions. This course means you can handle it yourself.',
    situations:['Bürgeramt appointment for Anmeldung','Opening a bank account','First German letter that arrives','Calling a doctor for an appointment','Dealing with your landlord'],
    vocab:['Bürgeramt vocabulary','Anmeldeformular (registration form)','Bank: Girokonto, Überweisung, Kontoauszug','Krankenversicherung (health insurance)','Mietvertrag (rental contract) key terms','Vermieter (landlord) communication'],
    scenarios:['Bürgeramt clerk asking for documents','Bank employee explaining account options','Landlord calling about something in your flat','Doctor receptionist booking an appointment','Understanding your first official letter'],
    klausMode:'Play German bureaucracy characters — Bürgeramt clerk, bank employee, landlord, doctor receptionist. Be realistic — use formal German, ask for documents. Give hints if stuck but don\'t make it easy. This is real life.',
    lessons:[
      {title:'The Anmeldung — step by step', content:'You must register (Anmelden) at the Bürgeramt within 14 days of moving in. You need: Wohnungsgeberbestätigung from your landlord, passport, and the Anmeldeformular filled out. Book online: berlin.de/buergeramt'},
      {title:'Opening a German bank account', content:'Most banks require your Anmeldebestätigung (registration confirmation). Key phrases: Ich möchte ein Girokonto eröffnen (I want to open a current account). N26 and DKB often work for internationals.'},
      {title:'Health insurance (Krankenversicherung)', content:'Mandatory in Germany. Public (gesetzlich) or private (privat). Most employees are automatically enrolled. Key sentence: Ich bin bei [TK/AOK/DAK] versichert.'},
      {title:'Reading official German letters', content:'Absender (sender, top left), Betreff (subject), Datum (date), Frist (deadline — always check this). If you see Mahnung, act immediately — it\'s a reminder/warning about unpaid bills.'},
      {title:'Your Mietvertrag (rental contract)', content:'Kaution (deposit — max 3 Kaltmieten), Nebenkosten (additional costs), Kündigungsfrist (notice period — usually 3 months), Hausordnung (house rules). Never sign without reading these.'},
    ],
  },
  {
    id:'dailyberlin', icon:'🏙️', title:'Daily Berlin', track:'Survival', free:false,
    accent:'#1d4ed8', levelColor:'#dbeafe', levelText:'#1d4ed8',
    levels:['A2'], tags:['survival'],
    sub:'Supermarkt, U-Bahn, Bäckerei, neighbors, pay slips. Real everyday German.',
    desc:'After the first month, survival phrases stop being enough. This course covers the daily situations that trip people up — German recycling rules, understanding your Lohnabrechnung, SCHUFA, dealing with neighbors.',
    cert:'Daily Life A2 — Berlin Ready',
    why:'Berlin is one of the most livable cities in Europe — but only if you can navigate it. This course makes daily life actually manageable.',
    situations:['Supermarket self-checkout machine questions','Understanding your pay slip','Neighbor complaint about noise or recycling','Public transport disruptions','SCHUFA check when renting'],
    vocab:['Lohnabrechnung (pay slip): Brutto, Netto, Abzüge','Recycling: Gelber Sack, Altpapier, Restmüll, Biotonne','SCHUFA and what it means','BVG vocabulary: Linie, Richtung, Umstieg, Verspätung','Supermarket labels: Mindesthaltbarkeitsdatum, Bio, Angebot'],
    scenarios:['German recycling bin confusion with neighbor','Pay slip is wrong — calling HR','BVG announcement of line disruption','Haggling gently at a Flohmarkt','Calling your internet provider about an outage'],
    klausMode:'Play a realistic Berlin neighbor, HR colleague, BVG announcer, and customer service rep. Use real German speed and vocabulary. The recycling scenario should be genuinely confusing at first — that\'s the point.',
    lessons:[
      {title:'The German recycling system (Mülltrennung)', content:'Gelber Sack/Tonne: plastics, packaging. Blaue Tonne: paper/cardboard. Grüne/braune Tonne: organic. Schwarze Tonne: everything else. Glass at Glascontainer by colour: Weiß, Braun, Grün. Getting this wrong means neighbors leave angry notes.'},
      {title:'Understanding your Lohnabrechnung', content:'Bruttogehalt = gross salary. Nettogehalt = what you actually receive. Abzüge = deductions. Rentenversicherung (9.3%), Krankenversicherung (7.3%), Pflegeversicherung (1.525%), Arbeitslosenversicherung (1.3%), Lohnsteuer (varies).'},
      {title:'SCHUFA — what it is and why it matters', content:'SCHUFA is Germany\'s credit bureau. Landlords check it before renting. Banks check it for loans. Get your free SCHUFA Auskunft once per year at meineschufa.de. A negative SCHUFA entry can block you from renting.'},
      {title:'BVG and German public transport', content:'S-Bahn (surface rail), U-Bahn (underground), Tram (streetcar), Bus. Zone A+B covers almost all of Berlin. Tickets: Einzelfahrschein, Tageskarte, Monatskarte. Schwarzfahren (riding without ticket) = €60 fine.'},
      {title:'Shopping vocabulary that actually matters', content:'Mindesthaltbarkeitsdatum (MHD) = best before date. Verbrauchsdatum = use by (stricter). Angebot = on offer/sale. Bio = organic. Pfand = deposit on bottles (return for €0.25). Kasse = checkout. Tüte = bag (usually costs €0.10-0.30).'},
    ],
  },
  {
    id:'doctor', icon:'🩺', title:'Going to the Doctor', track:'Health', free:true,
    accent:'#c1121f', levelColor:'#ffe0e3', levelText:'#c1121f',
    levels:['A1','A2','B1','B2'], tags:['health','survival','free'],
    sub:'Describe symptoms, understand diagnoses, navigate every type of appointment.',
    desc:'Always free. Describing pain in a foreign language is one of the hardest things immigrants face. This covers pain types, duration, triggers, 8 specialist visits, and how to question your doctor.',
    cert:'Medical Communication — Patient German',
    why:'Healthcare is a human right. Language should never be a barrier to getting it. This course is free forever.',
    situations:['Making and attending a Hausarzt appointment','Emergency room visit','Describing specific symptoms precisely','Understanding your diagnosis and prescription','Asking for a Krankschreibung (sick note)'],
    vocab:['Pain types: stechend, brennend, dumpf, pochend, krampfartig','Duration: dauerhaft, kommt und geht, morgens schlimmer','Body parts: precise vocabulary beyond basics','Specialist terms: Zahnarzt, Frauenarzt, Orthopäde, HNO','Insurance: Kassenpatient, Privatpatient, Überweisung'],
    scenarios:['Hausarzt describing a week of back pain','Emergency room with chest tightness','Pharmacist explaining medication with side effects','Calling to cancel and rebook an appointment','Asking the doctor to explain a diagnosis more clearly'],
    klausMode:'Play doctor, pharmacist, and receptionist characters. For pain descriptions, ask follow-up questions like a real doctor: Seit wann? Wo genau? Strahlt es aus? Verstärkt sich der Schmerz bei Bewegung? This trains real medical German.',
    lessons:[
      {title:'Types of pain — the vocabulary that matters', content:'stechend = stabbing, brennend = burning, dumpf = dull/aching, pochend = throbbing, krampfartig = cramping, drückend = pressing, ziehend = pulling. Combine with location: stechende Schmerzen in der rechten Seite.'},
      {title:'Duration and triggers', content:'Seit wann? (Since when?) — seit drei Tagen (for three days), seit einer Woche (for a week). Triggers: nach dem Essen (after eating), bei Belastung (with exertion), morgens schlimmer (worse in the morning), dauerhaft (constant), kommt und geht (comes and goes).'},
      {title:'The 8 specialist visits', content:'Hausarzt (GP), Zahnarzt (dentist), Frauenarzt/Gynäkologe, Augenarzt (eye), Orthopäde (bones/joints), HNO (ear-nose-throat), Dermatologe (skin), Psychiater/Psychologe (mental health). Each needs different vocabulary.'},
      {title:'Understanding your prescription', content:'Rezept = prescription. Dosierung = dosage. Nebenwirkungen = side effects. Nüchtern einnehmen = take on empty stomach. Zu den Mahlzeiten = with meals. Vor dem Schlafen = before sleeping. Apothekenpflichtig = prescription-only.'},
      {title:'Asking the right questions', content:'Was bedeutet das genau? (What exactly does that mean?) Gibt es Alternativen? (Are there alternatives?) Wie lange wird das dauern? (How long will this last?) Muss ich wiederkommen? (Do I need to come back?) Kann ich das mit anderen Medikamenten nehmen? (Can I take this with other medications?)'},
    ],
  },
  {
    id:'jobhunter', icon:'💼', title:'Job Hunter German', track:'Career', free:false,
    accent:'#534ab7', levelColor:'#eeedfe', levelText:'#534ab7',
    levels:['A2','B1'], tags:['professional'],
    sub:'Bewerbung, Lebenslauf, interview phrases, salary negotiation — done right.',
    desc:'The German job application process is completely different from anywhere else. This teaches the Bewerbung format, the Lebenslauf with photo, salary negotiation, work contracts, and calling in sick correctly.',
    cert:'Career Ready — Job German A2-B1',
    why:'A2 German opens jobs in trades and hospitality. B1 opens white-collar work. This course is the bridge.',
    situations:['Writing a Bewerbung and Lebenslauf','HR manager phone screen','Job interview in German','Understanding your Arbeitsvertrag','Negotiating salary the right way'],
    vocab:['Bewerbung format vocabulary','Lebenslauf: Werdegang, Kenntnisse, Interessen','Interview: Stärken, Schwächen, Erfahrung, teamfähig','Work contract: Probezeit, Kündigungsfrist, Urlaubstage','Salary: Gehalt, Brutto, Netto, Gehaltsverhandlung'],
    scenarios:['HR manager calling about your application','Job interview: tell me about yourself','Negotiating salary without making it awkward','Understanding what benefits are being offered','Signing your first German work contract'],
    klausMode:'Play a German HR manager and interviewer. German interviews are more formal than US/UK. They expect specific questions about your Werdegang chronologically. Salary questions come late and indirectly. Be realistic about German workplace culture.',
    lessons:[
      {title:'The German Bewerbung', content:'Unlike US/UK applications, German Bewerbungen include: professional photo (Bewerbungsfoto), Deckblatt (cover page), Anschreiben (cover letter starting with "Sehr geehrte Frau/Herr..."), Lebenslauf (CV with photo and full dates), and Zeugnisse (certificates/references). Missing any of these is disqualifying.'},
      {title:'The Lebenslauf format', content:'Chronological, reverse order. Full dates for everything (MM/YYYY). Photo top right. Persönliche Daten: Geburtsdatum, Geburtsort, Nationalität, Familienstand (optional). Berufserfahrung → Ausbildung → Kenntnisse (skills) → Interessen. Max 2 pages.'},
      {title:'German interview phrases', content:'"Erzählen Sie mir von sich" (Tell me about yourself — start with your education, be chronological). "Was sind Ihre Stärken?" (Strengths — be specific, not generic). "Wo sehen Sie sich in 5 Jahren?" (Where do you see yourself in 5 years — show ambition but loyalty). Never say your weakness is "being a perfectionist."'},
      {title:'Salary negotiation in Germany', content:'Never ask "What does this pay?" directly in the first interview. Wait until they bring it up. Use: "Welche Gehaltsvorstellung haben Sie?" is their question. Your answer: "Ich stelle mir ein Jahresgehalt von X bis Y Euro vor, je nach den genauen Aufgaben." Research Glassdoor.de for ranges.'},
      {title:'Your Arbeitsvertrag (work contract)', content:'Probezeit (probation) = usually 6 months. During this, Kündigungsfrist is 2 weeks. After: 4 weeks to end of month (Kündigung zum Monatsende). Urlaubstage: legal minimum 20 days (5-day week), most offer 25-30. Überstunden clause — check if overtime is paid or "included."'},
    ],
  },
  {
    id:'plateau', icon:'📈', title:'Plateau Breaker', track:'Advanced', free:false,
    accent:'#0f6e56', levelColor:'#e1f5ee', levelText:'#0f6e56',
    levels:['B1','B2'], tags:['survival','professional'],
    sub:'Year 2-3 in Germany, stuck. Phone calls, disagreements, fast speech. This breaks the plateau.',
    desc:'For people who\'ve been in Germany 1-3 years but built a bubble. You understand 70% but speak 40%. This targets phone calls, expressing disagreement, fast native speech, and German idioms that actually come up.',
    cert:'Plateau Broken — B1 Confirmed',
    why:'This is the most underserved course in language learning. The plateau is real, specific, and solvable. Nobody else builds for it.',
    situations:['Phone call to cancel an appointment','Disagreeing with a colleague professionally','Understanding fast German in a meeting','Getting a joke and responding naturally','Complex complaint call to customer service'],
    vocab:['Konjunktiv II: könnte, würde, hätte, wäre','Opinion expressions: Ich finde dass, meiner Meinung nach','German idioms: Das ist mir Wurst, Ich drücke die Daumen','Telephone openers and closers','Disagreement language: Das sehe ich anders, Ich bezweifle dass'],
    scenarios:['Angry customer service call about internet outage','Team meeting where you must push back on a decision','German friend making a joke you half-understand','Neighbor speaking too fast about something serious','Phone call where you have to explain a complex situation'],
    klausMode:'This mode intentionally speaks at NATIVE speed. No slowing down. Use contractions and reductions (hab instead of habe, ne instead of eine). If the user asks you to repeat, do it once only then keep going. Force them to ask for clarification in German.',
    lessons:[
      {title:'Why you\'re stuck — the honest diagnosis', content:'You understand more than you speak because your input (listening/reading) has been growing but your output (speaking/writing) hasn\'t been forced. Your brain defaulted to the comfortable bubble. The plateau breaks when output is forced daily in uncomfortable situations.'},
      {title:'Phone calls — the hardest thing', content:'No body language, no visual context, often bad audio. Key phrases: "Ich rufe an wegen..." (I\'m calling about...), "Ich habe Sie leider nicht ganz verstanden, könnten Sie das wiederholen?" (I didn\'t quite catch that), "Könnten Sie etwas langsamer sprechen?" (Could you speak a bit slower?), "Ich rufe nochmal zurück" (I\'ll call back).'},
      {title:'Expressing opinions and disagreeing', content:'"Ich bin der Meinung, dass..." (I\'m of the opinion that...), "Das sehe ich etwas anders." (I see that somewhat differently), "Da bin ich nicht ganz einverstanden." (I don\'t fully agree), "Ich verstehe Ihren Punkt, aber..." (I understand your point, but...). German directness is valued — you don\'t need to soften as much as in English.'},
      {title:'German idioms you\'ll actually hear', content:'"Das ist mir Wurst" (I don\'t care — literally "that\'s sausage to me"), "Daumen drücken" (fingers crossed — literally "press thumbs"), "Auf dem Holzweg sein" (to be on the wrong track), "Schwein haben" (to be lucky), "Das kommt mir spanisch vor" (that seems fishy to me), "Ich verstehe nur Bahnhof" (I don\'t understand anything — literally "I only understand train station").'},
      {title:'Understanding fast native German', content:'Germans reduce and contract: "hast du" → "hasde", "ich habe" → "ich hab", "das ist" → "das is", "ein" → "ne/nen/nem". Listen to: Fest & Flauschig podcast (fast, natural), Böhmermann (political satire, B2+), Quarks (science, clear B1-B2). Start with subtitles, remove them after one week.'},
    ],
  },
  {
    id:'comfortzone', icon:'🔥', title:'Comfort Zone Destroyer', track:'Advanced', free:false,
    accent:'#d85a30', levelColor:'#faece7', levelText:'#d85a30',
    levels:['B1','B2'], tags:['survival','professional'],
    sub:'No hints. No English. Hard scenarios. Time pressure. Deliberately uncomfortable.',
    desc:'The only course built to make you uncomfortable on purpose. Speed rounds, no English hints, Klaus speaks only German, full immersion sink-or-swim scenarios.',
    cert:'Comfort Zone Destroyed — No Safety Net',
    why:'Discomfort is the signal that learning is happening. If German feels easy, you\'re not growing.',
    situations:['Full German conversation at Behörde — no hints','Landlord calling angry — no translation','Speed round: 10 seconds to respond','Dialect challenge: Bavarian and Berliner German','No-English Klaus mode for full session'],
    vocab:['No vocabulary lists — production only','Error normalization exercises','Repair strategies: Wie bitte? Können Sie das nochmal sagen?','Self-correction in German','Fillers: Also, Äh, Genau, Na ja, Sozusagen'],
    scenarios:['Behörde clerk who refuses to speak English','Landlord leaving a fast voicemail about something urgent','Speed round: answer 10 questions in 10 seconds each','Understanding a Bavarian-accented German speaker','Roleplay of a situation that went wrong — recover it'],
    klausMode:'NO ENGLISH. NO HINTS. Speak only German at natural speed. If the user writes in English, respond: "Auf Deutsch, bitte." If they get stuck, wait. If they ask for help in German, give a small hint in German only. This is the hard mode.',
    lessons:[
      {title:'Why you need to be uncomfortable', content:'Your brain avoids discomfort. But discomfort is literally the mechanism of learning. Every time you feel awkward speaking German, your brain is building new pathways. The goal of this course is to manufacture that feeling systematically until it becomes normal.'},
      {title:'The Humiliation Drill', content:'Make a mistake on purpose. Then correct yourself out loud in German. "Ich bin gegangen... nein, ich bin gefahren." Normalizing mistakes is the single fastest way to overcome speaking anxiety. Germans respect effort. Nobody laughs at you for trying.'},
      {title:'German fillers — sound natural while thinking', content:'"Also..." (so/well), "Äh..." (uh), "Na ja..." (well/you know), "Genau" (exactly — use to buy time while nodding), "Sozusagen" (so to speak), "Eigentlich" (actually), "Irgendwie" (somehow). These make you sound fluent even when you\'re thinking.'},
      {title:'Dialect survival', content:'Berliner: "ick" instead of "ich", "Det" instead of "das", "ooch" instead of "auch". Bavarian: "mia" instead of "wir", "ned" instead of "nicht", "Grüß Gott" instead of "Guten Tag". Swiss German: almost incomprehensible even to northern Germans. Strategy: smile and say "Ich komme nicht aus dieser Region, könnten Sie Hochdeutsch sprechen?"'},
      {title:'Repair strategies', content:'When you lose the thread: "Entschuldigung, ich habe das nicht ganz verstanden." When you need time: "Einen Moment bitte, ich muss kurz nachdenken." When you used the wrong word: "Ich meine... äh... wie sagt man das nochmal?" When completely lost: "Könnten Sie das bitte aufschreiben?" (Could you write that down?)'},
    ],
  },
  {
    id:'healthcare_worker', icon:'🏥', title:'Healthcare German', track:'Health', free:false,
    accent:'#c1121f', levelColor:'#ffe0e3', levelText:'#c1121f',
    levels:['A1','A2','B1','B2','C1','C2'], tags:['health','professional'],
    sub:'For nurses, doctors, and care workers. From Übergabe to Fachsprachprüfung.',
    desc:'B2 is legally required for patient contact in most German states. Prepares for the Fachsprachprüfung (specialist language exam) required for foreign healthcare license recognition.',
    cert:'Medizinisches Deutsch B2 — Fachsprachprüfung Ready',
    why:'Germany has 300,000+ unfilled healthcare jobs and actively recruits internationally. B2 is the legal minimum. C1 opens senior roles.',
    situations:['Patient handover (Übergabe) to next shift','Explaining procedures to anxious patients','Communicating with patient relatives','Writing patient documentation (Pflegebericht)','Leading a ward round (Visite)'],
    vocab:['Shift: Frühdienst, Spätdienst, Nachtdienst, Übergabe','Patient communication: klagt über, berichtet, zeigt','Documentation: Pflegebericht, Verlaufsdokumentation','Medication: mg, nüchtern, p.o., s.c., i.v., Dosierung','Emergency: Reanimation, Notfall, Code Blue, Herzstillstand'],
    scenarios:['Handover: reporting on 6 patients to the next shift','Patient who refuses treatment — navigate consent','Family member asking for prognosis','Doctor giving fast verbal orders you must follow','Writing a Pflegebericht after your shift'],
    klausMode:'Play ward colleagues, patients, relatives, and doctors. Use real clinical German at professional speed. The Übergabe scenario must include at least 3 patients with different conditions. Push for clinical precision in answers.',
    lessons:[
      {title:'The Übergabe (shift handover)', content:'Structure: Patient name, Zimmer (room), Diagnose, aktuelle Situation, what happened during your shift, what the next shift needs to watch. Formula: "Herr/Frau [Name] in Zimmer [X] mit [Diagnose]. Heute war/hat... Bitte achten Sie auf..."'},
      {title:'Patient communication', content:'"Der Patient klagt über..." (The patient complains of...), "Die Patientin berichtet..." (The patient reports...), "Ich werde jetzt Ihren Blutdruck messen." (I\'m going to take your blood pressure now.), "Das tut nur kurz weh." (This will only hurt for a moment.), "Haben Sie Schmerzen?" (Are you in pain?)'},
      {title:'The Fachsprachprüfung', content:'Required in most German states for foreign healthcare license recognition (Approbation). Tests: patient anamnesis (history taking), interpreting a doctor\'s letter, documentation writing, and team communication. Format varies by state — check your Landesärztekammer or Pflegekammer.'},
      {title:'Medical abbreviations', content:'p.o. = per os (by mouth), s.c. = subcutan (under skin), i.v. = intravenös (intravenous), Nü. = nüchtern (fasting), RR = Blutdruck (blood pressure from Riva-Rocci), HF = Herzfrequenz (heart rate), AF = Atemfrequenz (respiratory rate), T = Temperatur, BZ = Blutzucker (blood sugar).'},
      {title:'Communicating with relatives', content:'"Ich verstehe Ihre Sorgen." (I understand your concerns.), "Ich kann Ihnen noch keine genauen Informationen geben." (I can\'t give you precise information yet.), "Der zuständige Arzt wird sich bei Ihnen melden." (The responsible doctor will contact you.), Always be calm, never speculative, always compassionate.'},
    ],
  },
  {
    id:'cybersecurity', icon:'🔐', title:'Cybersecurity German', track:'Tech', free:false,
    accent:'#3c3489', levelColor:'#eeedfe', levelText:'#3c3489',
    levels:['A1','A2','B1','B2','C1','C2'], tags:['tech','professional'],
    sub:'BSI, IT-Sicherheitsgesetz, NIS2, penetration test reports, incident response.',
    desc:'Germany has a massive cybersecurity talent shortage. The BSI issues German-language regulations and audit frameworks. This course covers everything from basic security vocabulary to incident response reports and NIS2 compliance.',
    cert:'IT-Sicherheit Deutsch — Security Professional German',
    why:'BSI compliance, NIS2-Richtlinie, and KRITIS regulations are in German. Security professionals in Germany need to navigate all of them.',
    situations:['Reporting an incident to management in German','Writing a penetration test report','Security awareness training for German staff','Navigating a BSI audit','NIS2 compliance documentation'],
    vocab:['Attack vocabulary: Angriff, Bedrohung, Schwachstelle, Exploit','BSI IT-Grundschutz terminology','KRITIS: kritische Infrastruktur, Meldepflicht','Incident: Vorfall, Schadensanalyse, Wiederherstellung','DSGVO: Datenschutzverletzung, Meldepflicht, Aufsichtsbehörde'],
    scenarios:['Board briefing after a ransomware attack','Penetration test debrief with technical team','Security awareness email to all German staff','BSI auditor requesting documentation','NIS2 incident notification to Bundesamt'],
    klausMode:'Play a BSI auditor, CISO, and board member. Use real German regulatory language. The incident response scenario should include pressure — the board is angry. The security awareness training scenario needs simple, clear German for non-technical staff.',
    lessons:[
      {title:'Core cybersecurity vocabulary', content:'"Angriff" (attack), "Bedrohung" (threat), "Schwachstelle" (vulnerability), "Patch/Update" (same in German), "Firewall" (same), "Verschlüsselung" (encryption), "Datenverlust" (data loss), "Ransomware" (same), "Phishing" (same), "Zwei-Faktor-Authentifizierung" (2FA), "Sicherheitslücke" (security gap).'},
      {title:'The BSI and German security law', content:'BSI = Bundesamt für Sicherheit in der Informationstechnik (Federal Office for Information Security). IT-Sicherheitsgesetz 2.0 requires KRITIS operators to implement "angemessene organisatorische und technische Maßnahmen." NIS2-Richtlinie (EU directive) expanded scope significantly. KRITIS = kritische Infrastruktur (energy, water, finance, health, transport).'},
      {title:'Incident response language', content:'"Wir hatten einen Sicherheitsvorfall." (We had a security incident.), "Die Systeme wurden kompromittiert." (The systems were compromised.), "Wir haben die Systeme isoliert." (We have isolated the systems.), "Die forensische Analyse läuft." (Forensic analysis is running.), DSGVO requires breach notification to Aufsichtsbehörde within 72 hours.'},
      {title:'Penetration test reports in German', content:'Structure: Zusammenfassung (executive summary), Methodik (methodology), Befunde (findings), Risikobewertung (risk assessment), Handlungsempfehlungen (recommendations). Risk levels: Kritisch, Hoch, Mittel, Niedrig, Informativ. Always include Proof of Concept and Reproduktionsschritte.'},
      {title:'Security awareness for German staff', content:'Keep it simple. Avoid jargon. "Öffnen Sie keine unbekannten E-Mail-Anhänge." (Don\'t open unknown email attachments.) "Verwenden Sie starke, einzigartige Passwörter." (Use strong, unique passwords.) "Melden Sie verdächtige E-Mails sofort an die IT." (Report suspicious emails to IT immediately.) NEVER: blame individuals.'},
    ],
  },
  {
    id:'finance', icon:'📊', title:'Finance & Banking German', track:'Finance', free:false,
    accent:'#185fa5', levelColor:'#e6f1fb', levelText:'#185fa5',
    levels:['A1','A2','B1','B2','C1','C2'], tags:['finance','professional'],
    sub:'From personal banking to Frankfurt investment banking. MiFID II to Jahresabschluss.',
    desc:'Frankfurt is Europe\'s financial hub post-Brexit. This course covers personal banking basics all the way to M&A vocabulary, BaFin regulatory language, and board-level presentations.',
    cert:'Finanz-Deutsch B2 / Finance German C1',
    why:'Government regulations, contracts, and tax-related jobs require advanced German. Finance professionals in Germany who know the German terminology get the senior roles.',
    situations:['Client KYC meeting at a bank','Explaining investment products in German','Reading and presenting a Jahresabschluss','Due diligence call for M&A transaction','BaFin regulatory filing'],
    vocab:['Banking: Girokonto, Sparekonto, Kredit, Zinsen, Tilgung','Financial statements: Bilanz, GuV, Jahresabschluss, EBITDA','Regulation: BaFin, MiFID II, KYC, AML, Geldwäsche','Investment: Aktien, Anleihen, Fonds, ETF, Portfolio','Tax: Körperschaftsteuer, Gewerbesteuer, USt, Verlustverrechnung'],
    scenarios:['Explaining an investment fund to a retail client','Board presentation of quarterly results','Due diligence call in German','Regulatory briefing to BaFin examiner','Negotiating loan terms with a German bank'],
    klausMode:'Play a German bank client (skeptical, formal), a BaFin examiner (very formal, detail-oriented), and a board member (impatient, wants numbers). German financial language is highly formal — always use Sie, full sentences, precise vocabulary.',
    lessons:[
      {title:'German banking vocabulary essentials', content:'"Girokonto" = current account, "Sparkonto" = savings account, "Kredit" = loan, "Hypothek" = mortgage, "Zinsen" = interest, "Tilgung" = repayment of principal, "Laufzeit" = term/duration, "Kontoauszug" = bank statement, "Überweisung" = bank transfer, "Dauerauftrag" = standing order, "Lastschrift" = direct debit.'},
      {title:'Financial statements in German', content:'"Bilanz" = balance sheet (Aktiva/Passiva), "Gewinn- und Verlustrechnung (GuV)" = income statement, "Jahresabschluss" = annual financial statements, "Eigenkapital" = equity, "Fremdkapital" = debt, "Umsatz" = revenue, "Betriebsergebnis" = operating result, "EBITDA" = same abbreviation, "Jahresüberschuss/-fehlbetrag" = net profit/loss.'},
      {title:'BaFin and German financial regulation', content:'BaFin = Bundesanstalt für Finanzdienstleistungsaufsicht. Regulates banks, insurance, securities in Germany. MiFID II requires client profiling (Angemessenheits-/Geeignetheitsprüfung). KYC = Kundenidentifizierung. AML = Anti-Geldwäsche. Every financial professional in Germany must know these terms.'},
      {title:'German tax vocabulary', content:'"Körperschaftsteuer" = corporate tax (15%), "Gewerbesteuer" = trade tax (varies by city, ~14-17% in Berlin), "Umsatzsteuer/Mehrwertsteuer" = VAT (19% standard, 7% reduced), "Einkommensteuer" = income tax, "Steuererklärung" = tax return, "Finanzamt" = tax office, "Steuerberater" = tax advisor.'},
      {title:'M&A and investment vocabulary', content:'"Fusion" = merger, "Übernahme" = acquisition, "Due Diligence" (same), "Letter of Intent (LoI)" (same), "Term Sheet" (same), "Kaufpreisanpassung" = price adjustment, "Garantien und Gewährleistungen" = warranties and representations, "Vollzug" = closing/completion, "Escrow" (same or "Treuhandkonto").'},
    ],
  },
  {
    id:'it', icon:'💻', title:'IT & Tech German', track:'Tech', free:false,
    accent:'#534ab7', levelColor:'#eeedfe', levelText:'#534ab7',
    levels:['A1','A2','B1','B2','C1','C2'], tags:['tech','professional'],
    sub:'Code is in English. Everything around it is in German. This covers everything around it.',
    desc:'The critical German-specific concepts that trip up international tech workers: Lastenheft vs Pflichtenheft, Betriebsrat, Datenschutz compliance, Agile in German, why Kernarbeitszeit matters.',
    cert:'Tech-Deutsch B2 / IT Professional German',
    why:'IT professionals can often work in English, but B1 or B2 can be advantageous for team collaboration, client meetings, and career advancement.',
    situations:['Sprint retrospective facilitation in German','Client demo with German-speaking stakeholders','DSGVO compliance meeting with legal team','Stakeholder presentation of technical architecture','Works council (Betriebsrat) consultation on new software'],
    vocab:['Lastenheft/Pflichtenheft (client brief vs technical spec)','Betriebsrat (works council) vocabulary','Agile: Sprint, Backlog, Retrospektive, Velocity','DSGVO: Datenschutzbeauftragter, Auftragsverarbeitung, Einwilligung','Project: Meilenstein, Abnahme, Änderungsanforderung, Freigabe'],
    scenarios:['Explaining a technical delay to a German client','Sprint retrospective with German team','DSGVO compliance review with legal','Presenting roadmap to German board','Discussing remote work policy with Betriebsrat'],
    klausMode:'Play a German product manager (methodical, process-focused), a skeptical German client (expects precision, no vagueness), and a Betriebsrat representative (formal, rights-aware). German tech culture values thoroughness over speed — reflect this.',
    lessons:[
      {title:'Lastenheft vs Pflichtenheft — the most important distinction', content:'"Lastenheft" = what the client wants (requirements from client perspective). "Pflichtenheft" = how the dev team will deliver it (technical specification from provider perspective). Confusing these is a major professional error in Germany. Client writes the Lastenheft. Dev team responds with a Pflichtenheft. "Abnahme" = formal acceptance/sign-off.'},
      {title:'The Betriebsrat (works council)', content:'Any German company with 5+ employees can have a Betriebsrat. They must be consulted on: new software that monitors employees, changes to working hours, layoffs, workplace policies. You CANNOT roll out employee monitoring software without Betriebsrat agreement. This surprises every international tech worker in Germany.'},
      {title:'DSGVO in tech', content:'"Datenschutzbeauftragter (DSB)" = Data Protection Officer (required for companies processing personal data at scale). "Auftragsverarbeitung" = data processing contract (required when using cloud services). "Einwilligung" = consent. "Datenpanne" = data breach. "Löschkonzept" = deletion policy. You need all of these documented.'},
      {title:'Agile vocabulary in German', content:'"Sprint" (same), "Backlog" (same), "Sprint-Planung" = sprint planning, "Tagesmeeting/Daily" = daily standup, "Retrospektive" = retrospective, "Abnahme" = acceptance/demo, "Velocity" (same), "Story Points" (same), "Epics" (same), "Definition of Done" = Akzeptanzkriterien. Most German companies mix English terms with German structure.'},
      {title:'Communicating technical constraints', content:'"Das ist technisch nicht umsetzbar in dem Zeitrahmen." (That\'s technically not feasible in that timeframe.), "Wir müssen die Anforderungen priorisieren." (We need to prioritize the requirements.), "Das liegt außerhalb des vereinbarten Scopes." (That\'s outside the agreed scope.), "Ich schicke Ihnen eine schriftliche Zusammenfassung." (I\'ll send you a written summary.) — Germans love this last one.'},
    ],
  },
  {
    id:'management', icon:'🎯', title:'Management German', track:'Leadership', free:false,
    accent:'#854f0b', levelColor:'#faeeda', levelText:'#854f0b',
    levels:['A2','B1','B2','C1','C2'], tags:['professional','finance'],
    sub:'Lead German teams. Betriebsrat, performance reviews, labor law, board presentations.',
    desc:'German management culture is direct, formal with hierarchy, and structured around legal frameworks like the Betriebsrat that have no equivalent in most countries.',
    cert:'Führungs-Deutsch B2 / Management German C1',
    why:'Candidates with B2 have a 35% higher chance of landing their desired role compared to B1. For managerial positions, C1 is increasingly expected.',
    situations:['Facilitating a team meeting in German','Annual performance review (Mitarbeitergespräch)','Works council negotiation on policy change','Presenting strategy to German board','Handling a conflict between two team members'],
    vocab:['Meeting structure: Tagesordnung, Protokoll, Beschluss','Feedback: konstruktiv, entwicklungsorientiert, direkt','Labor law: Kündigungsschutz, Abmahnung, Zeugnis','Leadership: delegieren, verantworten, befähigen','Strategy: Unternehmensziele, KPIs, Meilensteine, Roadmap'],
    scenarios:['Opening and running a Besprechung with agenda','Giving critical feedback the German way','Explaining a salary freeze to your team','Negotiating with Betriebsrat on remote work policy','Writing a Arbeitszeugnis (employment reference) in German'],
    klausMode:'Play a German team member receiving feedback (direct but professional is the norm), a Betriebsrat representative (formal, legally aware), and a board member (results-focused, impatient with vagueness). German management expects clear positions — "I think maybe perhaps" does not work here.',
    lessons:[
      {title:'German feedback culture', content:'Germans give direct feedback without the "sandwich" approach common in US/UK. "Das war nicht gut genug weil..." is normal. No need to soften excessively. BUT: never personal, always behavior-specific. "Sie waren beim Meeting unvorbereitet" not "Sie sind unzuverlässig." Feedback is professional, not personal.'},
      {title:'The Mitarbeitergespräch (performance review)', content:'Annual or semi-annual. Structure: Rückblick (review of past period), Feedback (from both sides), Zielvereinbarungen (goal agreements for next period). Goals should be SMART (Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert). Document everything — it may become relevant for employment law.'},
      {title:'German labor law basics for managers', content:'"Abmahnung" = formal written warning (required before dismissal for conduct). "Kündigungsschutz" = protection against dismissal (applies after 6 months, companies with 10+ employees). "Zeugnis" = employment reference (legally required to give, and must be "wohlwollend aber wahrheitsgemäß" — benevolent but truthful). Grade scale: sehr gut/gut/befriedigend/ausreichend/mangelhaft.'},
      {title:'Running a Besprechung (meeting)', content:'"Ich eröffne die heutige Sitzung." (I open today\'s meeting.), "Punkt 1 der Tagesordnung ist..." (Agenda item 1 is...), "Ich möchte das Protokoll festhalten..." (I\'d like to record the minutes...), "Wir halten als Beschluss fest..." (We record as a resolution...), "Ich erkläre die Sitzung für beendet." (I declare the meeting closed.) Germans expect minutes (Protokoll) for every meeting.'},
      {title:'Betriebsrat navigation', content:'Works council has co-determination rights (Mitbestimmung) on: working hours, overtime rules, holiday planning, employee monitoring, social facilities. Consultation rights on: staffing, job changes, mass layoffs. Information rights on: company financial situation. Ignoring the Betriebsrat = legal liability. Strategy: involve them early, treat them as partners not obstacles.'},
    ],
  },
  {
    id:'trades', icon:'🔧', title:'Trades & Handwerk', track:'Trades', free:false,
    accent:'#3b6d11', levelColor:'#eaf3de', levelText:'#3b6d11',
    levels:['A1','A2','B1'], tags:['survival','professional'],
    sub:'Electrical, plumbing, painting, cleaning, mechanics. 5.6 million jobs in Germany.',
    desc:'Germany\'s Handwerk sector has 300,000 unfilled positions. Covers 8 trades including cleaning, construction, electrical, automotive — with legally required safety vocabulary.',
    cert:'Handwerk-Deutsch — Trade German',
    why:'Handwerk pays well, offers Ausbildung pathways, and has massive shortages. Language is the main barrier for skilled immigrants.',
    situations:['Customer explaining what needs fixing','Giving a Kostenvoranschlag (quote)','Safety briefing for new task','Calling to report a job is complete','Understanding technical specifications'],
    vocab:['Tools by trade: Elektrik, Sanitär, Malerei, Reinigung','Safety: Arbeitssicherheit, Schutzausrüstung, Sicherheitsdatenblatt','Customer service: Kostenvoranschlag, Rechnung, Gewährleistung','Ausbildung vocabulary','HACCP (for cleaning/food service)'],
    scenarios:['Customer describing a plumbing problem','Giving a verbal quote for a painting job','Safety briefing before working with chemicals','Calling employer when job runs over time','Explaining Garantie/Gewährleistung to a client'],
    klausMode:'Play a German homeowner (concerned about cost, wants clear explanation), a supervisor checking your work (demanding but fair), and a customer service situation where a client complains. Handwerk German is direct and practical — not formal office language.',
    lessons:[
      {title:'Customer communication in Handwerk', content:'"Was kann ich für Sie tun?" (What can I do for you?), "Können Sie das Problem genauer beschreiben?" (Can you describe the problem more precisely?), "Ich werde mir das mal anschauen." (I\'ll take a look.), "Das wird etwa X Euro kosten." (That will cost approximately X euros.), "Ich kann das [Datum/Zeit] erledigen." (I can get that done on [date/time].)'},
      {title:'Safety vocabulary (Arbeitssicherheit)', content:'Legally required knowledge. "Persönliche Schutzausrüstung (PSA)" = personal protective equipment. "Sicherheitsdatenblatt (SDB)" = safety data sheet (required for all chemicals). "Gefährdungsbeurteilung" = risk assessment. "Erste Hilfe" = first aid. "Notausgang" = emergency exit. "Feuerlöscher" = fire extinguisher. "Verbotenes Rauchen" = no smoking.'},
      {title:'The Kostenvoranschlag (quote)', content:'A written quote is standard before any work. Must include: detailed list of work (Leistungsbeschreibung), materials (Materialkosten), labor (Arbeitskosten), total (Gesamtbetrag), validity period (Gültigkeitsdauer). Nicht verbindlich = not binding. Verbindlich = binding. Most tradespeople give non-binding quotes.'},
      {title:'Ausbildung — the German apprenticeship', content:'Dual system: 3 days/week practical at company, 2 days at Berufsschule. Lasts 2-3 years. Paid throughout (€500-900/month). Leads to formal qualification (Gesellenbrief → Meister). For immigrants: some states run courses in German + your native language. IHK (Industrie- und Handelskammer) and HWK (Handwerkskammer) are the certifying bodies.'},
      {title:'Cleaning industry specifics (Reinigung)', content:'"Reinigungsmittel" = cleaning agent. "Desinfektionsmittel" = disinfectant. "Verdünnungsverhältnis" = dilution ratio. "Unterhaltsreinigung" = routine cleaning. "Grundreinigung" = deep cleaning. "HACCP" = food hygiene standards (if cleaning kitchens/food areas). "Sicherheitsdatenblatt" = safety data sheet — must read before using any chemical.'},
    ],
  },
  {
    id:'navigation', icon:'🗺️', title:'Direction German', track:'Survival', free:true,
    accent:'#1d4ed8', levelColor:'#dbeafe', levelText:'#1d4ed8',
    levels:['A1','A2'], tags:['survival','free'],
    sub:'Navigate Germany confidently. Public transport, giving locations, reading German maps.',
    desc:'A dedicated course for getting around Germany — understanding directions at native speed, using DB Navigator and BVG apps in German mode, giving your exact location in an emergency.',
    cert:'Navigation Ready — Direction German',
    why:'Getting lost in a foreign country is stressful. Getting lost with zero German vocabulary is worse. This makes navigation automatic.',
    situations:['Getting directions from a fast-speaking local','Emergency: giving your exact location','BVG/DB Navigator in German mode','Asking someone to repeat directions more slowly','Understanding that you missed your stop'],
    vocab:['Cardinal: Nord, Süd, Ost, West','Movement: abbiegen, geradeaus, überqueren, folgen','Landmarks: Kreuzung, Ampel, Brücke, Ecke, gegenüber','Transport: Linie, Richtung, Umstieg, Anschluss, Gleis','Distance: Meter, Kilometer, zu Fuß, etwa, ungefähr'],
    scenarios:['Asking a stranger for directions and understanding the answer','Being given directions too fast — asking to repeat','Emergency call: describing your exact location','Understanding a BVG disruption announcement','Realizing you\'re on the wrong train and asking for help'],
    klausMode:'Play a helpful but fast-talking Berliner giving directions. Include the street names, turn by turn. If asked to repeat, do it once at a slightly slower pace. The emergency scenario should be slightly urgent. Teaching real-world direction-giving speed.',
    lessons:[
      {title:'Direction vocabulary essentials', content:'"Links" = left, "Rechts" = right, "Geradeaus" = straight ahead, "Umkehren/Wenden" = turn around, "Abbiegen" = turn (Biegen Sie links/rechts ab), "Überqueren Sie die Straße" = cross the street, "Nehmen Sie die erste/zweite Straße links/rechts" = take the first/second street left/right, "An der Ampel" = at the traffic light, "An der Kreuzung" = at the intersection.'},
      {title:'Landmarks and reference points', content:'"Gegenüber" = opposite, "Neben" = next to, "Zwischen" = between, "An der Ecke" = at the corner, "Am Ende der Straße" = at the end of the street, "Das blaue/rote/große Gebäude" = the blue/red/large building, "Die Kirche/die Schule/die Post" = the church/school/post office. Germans use landmarks heavily in directions.'},
      {title:'Public transport navigation', content:'"Linie" = line (U1, S7, Bus 100), "Richtung" = direction/towards, "Umsteigen" = change/transfer (Sie müssen am Alexanderplatz umsteigen), "Gleis" = platform (track), "Ankunft" = arrival, "Abfahrt" = departure, "Verspätung" = delay, "Ausfall" = cancellation. DB Navigator and BVG apps both have German mode — practice with them.'},
      {title:'Asking for help with directions', content:'"Entschuldigung, wie komme ich zum/zur/nach [Ort]?" (Excuse me, how do I get to [place]?), "Könnten Sie das bitte wiederholen?" (Could you please repeat that?), "Könnten Sie es bitte aufschreiben?" (Could you please write it down?), "Ist es weit zu Fuß?" (Is it far to walk?), "Wie lange dauert das ungefähr?" (About how long does it take?)'},
      {title:'Emergency location communication', content:'"Ich bin in [Straße] Nummer [Hausnummer], [Stadtteil]." (I am at [street] number [house number], [district].) "Zwischen [Straße] und [Straße]." (Between [street] and [street].) "Gegenüber von [Landmark]." (Opposite [landmark].) "In der Nähe von [U-Bahn-Station]." (Near [subway station].) Always know your current address — save it in your phone.'},
    ],
  },
  {
    id:'education', icon:'📚', title:'Education & Childcare German', track:'Education', free:false,
    accent:'#0f6e56', levelColor:'#e1f5ee', levelText:'#0f6e56',
    levels:['A2','B1','B2','C1'], tags:['health','professional'],
    sub:'Erzieher, Lehrer, Sozialpädagoge. Germany desperately needs childcare workers.',
    desc:'Kindeswohlgefährdung — child welfare — is the most legally critical phrase in this field. This course teaches childcare workers the German to communicate with parents, document development, and navigate the German school system.',
    cert:'Pädagogik-Deutsch B2',
    why:'Germany has a severe shortage of Erzieher and Lehrer. Immigrants with childcare/teaching backgrounds can access these roles — but B2 is typically required.',
    situations:['Parent-teacher meeting (Elterngespräch)','Writing a developmental report (Entwicklungsbericht)','Reporting a child welfare concern','Inclusive classroom communication','Handing over a child to the wrong person — how to handle this'],
    vocab:['Development stages: Eingewöhnung, Entwicklungsstand, Meilensteine','School system: Kita, Grundschule, Gymnasium, Gesamtschule','Legal protection: Kindeswohlgefährdung, Meldepflicht, Jugendamt','Special needs: Förderbedarf, Inklusion, LRS, ADHS, Autismus','Parent communication: Elternabend, Hausaufgaben, Zeugnis'],
    scenarios:['Elterngespräch about a child\'s slow development','Reporting suspected child abuse to Jugendamt','Inclusive classroom: communicating with parents of child with ADHS','Handing over to wrong parent — following protocol','Annual Elternabend (parent evening) facilitation'],
    klausMode:'Play a concerned parent (emotional, sometimes defensive), a Jugendamt caseworker (formal, process-driven), and a teaching colleague discussing a student. Child welfare scenarios require sensitivity and legal precision — reflect both.',
    lessons:[
      {title:'Kindeswohlgefährdung — the most important concept', content:'Child welfare (Kindeswohl) is the legal priority. If you suspect Kindeswohlgefährdung (endangerment of child welfare), you have a Meldepflicht (duty to report) to the Jugendamt (youth welfare office). Key phrase: "Ich habe Bedenken hinsichtlich des Kindeswohls von [Name] und möchte das Jugendamt informieren."'},
      {title:'The German education system', content:'Kita (ages 0-3) → Kindergarten (3-6) → Grundschule (6-10, 4 years) → then split: Hauptschule, Realschule, or Gymnasium. Gymnasium → Abitur → university. Gesamtschule = comprehensive school that covers all tracks. Schulpflicht = compulsory schooling from age 6. Each state (Bundesland) has slightly different rules.'},
      {title:'The Elterngespräch (parent-teacher meeting)', content:'Always have documentation ready (Entwicklungsbericht, Beobachtungsbögen). Start positive: "Ich freue mich, Sie kennenzulernen." Be specific about observations: "Ich beobachte, dass..." Not: "Ihr Kind ist schwierig." Yes: "Ich beobachte, dass [Name] Schwierigkeiten hat, Konflikte mit Gleichaltrigen zu lösen." Always involve parents as partners.'},
      {title:'Special needs vocabulary', content:'"Förderbedarf" = special educational needs, "Inklusion" = inclusion (German commitment to include children with disabilities in mainstream schools), "LRS" = Lese-Rechtschreib-Schwäche (dyslexia), "ADHS" = ADHD, "Autismus-Spektrum-Störung (ASS)" = autism spectrum disorder, "Nachteilsausgleich" = accommodation/adjustment, "Förderschule" = special needs school, "Inklusionsbeauftragter" = inclusion coordinator.'},
      {title:'Writing Entwicklungsberichte (developmental reports)', content:'Structure: Sozialverhalten (social behavior), Motorik (motor skills), Sprache (language), Kognitive Entwicklung (cognitive development), Besonderheiten (notable observations). Tone: factual, positive framing, specific observations not labels. NEVER diagnose — describe only what you observe. These reports can be used in legal proceedings.'},
    ],
  },
];

// ── COURSE STATE ──
let activeCourseFilter = 'all';
let activeCourseId = null;
let courseLessonIndex = 0;

// ── INIT ──
function initCourses() {
  renderCourseCatalog();
}

// ── CATALOG RENDER ──
function renderCourseCatalog() {
  const c = document.getElementById('courses-content');
  const filters = [
    {k:'all',label:'All courses'},
    {k:'free',label:'Free only'},
    {k:'survival',label:'Survival'},
    {k:'health',label:'Health'},
    {k:'tech',label:'Tech'},
    {k:'finance',label:'Finance'},
    {k:'professional',label:'Professional'},
  ];

  const filtered = activeCourseFilter === 'all' ? COURSE_CATALOG
    : activeCourseFilter === 'free' ? COURSE_CATALOG.filter(c => c.free)
    : COURSE_CATALOG.filter(c => c.tags.includes(activeCourseFilter));

  c.innerHTML = `
    <div style="max-width:720px">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px">
        <div class="stat-card" style="text-align:center">
          <div class="stat-num">16</div>
          <div class="stat-lbl">Course tracks</div>
        </div>
        <div class="stat-card" style="text-align:center">
          <div class="stat-num">A1→C2</div>
          <div class="stat-lbl">Each track</div>
        </div>
        <div class="stat-card" style="text-align:center">
          <div class="stat-num">${COURSE_CATALOG.filter(x=>x.free).length}</div>
          <div class="stat-lbl">Free forever</div>
        </div>
      </div>

      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px">
        ${filters.map(f => `
          <button onclick="setCourseFilter('${f.k}')" style="padding:5px 14px;border:0.5px solid ${activeCourseFilter===f.k?'var(--black)':'var(--gray-200)'};border-radius:20px;font-size:13px;cursor:pointer;background:${activeCourseFilter===f.k?'var(--black)':'var(--white)'};color:${activeCourseFilter===f.k?'var(--white)':'var(--gray-600)'};font-family:Inter,sans-serif">${f.label}</button>
        `).join('')}
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:12px">
        ${filtered.map(course => renderCourseCard(course)).join('')}
      </div>
    </div>
  `;
}

function renderCourseCard(course) {
  const userCompleted = AUTH.user?.levelsCompleted?.includes(course.id) || false;
  return `
    <div onclick="openCourse('${course.id}')" style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);overflow:hidden;cursor:pointer;transition:all 0.15s;position:relative" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.06)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div style="height:3px;background:${course.accent}"></div>
      <div style="padding:16px 18px">
        <div style="font-size:22px;margin-bottom:8px">${course.icon}</div>
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:6px">
          <div style="font-size:15px;font-weight:500;color:var(--black)">${course.title}</div>
          <span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;flex-shrink:0;background:${course.free?'var(--green-light)':'var(--blue-light)'};color:${course.free?'var(--green)':'var(--blue)'}">${course.free?'Free':'Premium'}</span>
        </div>
        <div style="font-size:13px;color:var(--gray-600);margin-bottom:10px;line-height:1.5">${course.sub}</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">
          ${course.levels.map(l=>`<span style="padding:3px 8px;border-radius:20px;font-size:11px;font-weight:500;background:${course.levelColor};color:${course.levelText}">${l}</span>`).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--gray-100);padding-top:10px">
          <span style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;color:var(--gray-400)">${course.track}</span>
          <span style="font-size:13px;color:var(--accent);font-weight:500">Open →</span>
        </div>
      </div>
    </div>
  `;
}

function setCourseFilter(f) {
  activeCourseFilter = f;
  renderCourseCatalog();
}

// ── COURSE DETAIL ──
function openCourse(id) {
  activeCourseId = id;
  courseLessonIndex = 0;
  nav('course-detail');
  renderCourseDetail(id);
}

function renderCourseDetail(id) {
  const course = COURSE_CATALOG.find(c => c.id === id);
  if (!course) return;
  const c = document.getElementById('course-detail-content');

  c.innerHTML = `
    <div style="max-width:680px">
      <div style="background:var(--black);color:var(--white);border-radius:var(--radius-xl);padding:32px;margin-bottom:20px">
        <div style="font-size:32px;margin-bottom:12px">${course.icon}</div>
        <div style="font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:6px">${course.track}</div>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;letter-spacing:-0.5px;margin-bottom:6px">${course.title}</div>
        <div style="font-size:15px;color:rgba(255,255,255,0.6);margin-bottom:20px;line-height:1.6">${course.desc}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
          ${course.levels.map(l=>`<span style="padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500;background:${course.levelColor};color:${course.levelText}">${l}</span>`).join('')}
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button onclick="startCourseLesson('${course.id}',0)" style="padding:12px 22px;background:var(--white);color:var(--black);border:none;border-radius:var(--radius);font-size:14px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif">Start course →</button>
          <button onclick="openKlausForCourse('${course.id}')" style="padding:12px 18px;background:rgba(255,255,255,0.12);color:var(--white);border:none;border-radius:var(--radius);font-size:14px;cursor:pointer;font-family:Inter,sans-serif">Practice with Klaus →</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
        <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:18px">
          <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--gray-400);margin-bottom:10px">Real situations covered</div>
          ${course.situations.map(s=>`<div style="font-size:13px;color:var(--gray-800);padding:5px 0;border-bottom:1px solid var(--gray-100);display:flex;gap:8px"><span style="color:var(--green)">✓</span>${s}</div>`).join('')}
        </div>
        <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:18px">
          <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--gray-400);margin-bottom:10px">Vocabulary sets</div>
          ${course.vocab.map(v=>`<div style="font-size:13px;color:var(--gray-800);padding:5px 0;border-bottom:1px solid var(--gray-100);display:flex;gap:8px"><span style="color:var(--accent)">→</span>${v}</div>`).join('')}
        </div>
      </div>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:18px;margin-bottom:20px">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--gray-400);margin-bottom:10px">Klaus scenarios in this course</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          ${course.scenarios.map(s=>`<span style="padding:6px 12px;background:var(--gray-50);border:1px solid var(--gray-100);border-radius:var(--radius);font-size:13px;color:var(--gray-800)">${s}</span>`).join('')}
        </div>
      </div>

      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:18px;margin-bottom:20px">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--gray-400);margin-bottom:14px">Course lessons (${course.lessons.length} lessons)</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${course.lessons.map((l,i)=>`
            <div onclick="startCourseLesson('${course.id}',${i})" style="display:flex;align-items:center;gap:14px;padding:12px;border:1px solid var(--gray-100);border-radius:var(--radius);cursor:pointer;transition:all 0.15s" onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background=''">
              <div style="width:28px;height:28px;border-radius:50%;background:var(--gray-100);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;color:var(--gray-600);flex-shrink:0">${i+1}</div>
              <div style="flex:1;font-size:14px;font-weight:500;color:var(--black)">${l.title}</div>
              <span style="font-size:13px;color:var(--gray-400)">→</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="background:var(--amber-light);border-radius:var(--radius-lg);padding:18px;margin-bottom:20px">
        <div style="font-size:13px;font-weight:600;color:var(--amber);margin-bottom:4px">Certificate you earn</div>
        <div style="font-size:15px;font-weight:500;color:var(--black)">${course.cert}</div>
      </div>
    </div>
  `;
}

// ── LESSON PLAYER ──
function startCourseLesson(courseId, lessonIndex) {
  const course = COURSE_CATALOG.find(c => c.id === courseId);
  if (!course) return;
  activeCourseId = courseId;
  courseLessonIndex = lessonIndex;
  renderLesson(course, lessonIndex);
}

function renderLesson(course, index) {
  const lesson = course.lessons[index];
  if (!lesson) { openCourse(course.id); return; }
  const c = document.getElementById('course-detail-content');
  const isLast = index === course.lessons.length - 1;

  c.innerHTML = `
    <div style="max-width:620px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
        <button onclick="renderCourseDetail('${course.id}')" style="padding:6px 14px;border:1px solid var(--gray-200);border-radius:var(--radius);background:var(--white);font-size:13px;cursor:pointer;font-family:Inter,sans-serif">← Back</button>
        <div style="font-size:13px;color:var(--gray-400)">${course.icon} ${course.title} — Lesson ${index+1} of ${course.lessons.length}</div>
      </div>
      <div style="height:4px;background:var(--gray-100);border-radius:2px;margin-bottom:24px">
        <div style="height:100%;background:var(--black);border-radius:2px;width:${((index+1)/course.lessons.length*100)}%;transition:width 0.3s"></div>
      </div>
      <div style="background:var(--white);border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:28px;margin-bottom:20px">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--gray-400);margin-bottom:8px">Lesson ${index+1}</div>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:600;color:var(--black);margin-bottom:20px;line-height:1.3">${lesson.title}</div>
        <div style="font-size:15px;color:var(--gray-800);line-height:1.8">${formatLessonContent(lesson.content)}</div>
      </div>
      <div style="background:var(--gray-50);border-radius:var(--radius-lg);padding:16px;margin-bottom:20px">
        <div style="font-size:13px;font-weight:500;color:var(--black);margin-bottom:8px">Practice this with Klaus →</div>
        <div style="font-size:13px;color:var(--gray-600);margin-bottom:12px">Tell Klaus you want to practice "${lesson.title}" in the ${course.title} course.</div>
        <button onclick="openKlausForLesson('${course.id}','${lesson.title.replace(/'/g,"\\'")}')" style="padding:10px 18px;background:var(--black);color:var(--white);border:none;border-radius:var(--radius);font-size:13px;font-weight:500;cursor:pointer;font-family:Inter,sans-serif">Open Klaus →</button>
      </div>
      <div style="display:flex;gap:10px">
        ${index > 0 ? `<button onclick="startCourseLesson('${course.id}',${index-1})" style="padding:12px 18px;border:1px solid var(--gray-200);border-radius:var(--radius);background:var(--white);font-size:14px;cursor:pointer;font-family:Inter,sans-serif">← Previous</button>` : ''}
        <button onclick="${isLast ? `completeCourse('${course.id}')` : `startCourseLesson('${course.id}',${index+1})`}" style="flex:1;padding:12px;background:var(--black);color:var(--white);border:none;border-radius:var(--radius);font-size:14px;font-weight:500;cursor:pointer;font-family:Inter,sans-serif">${isLast ? 'Complete course ✓' : 'Next lesson →'}</button>
      </div>
    </div>
  `;
  addXP(5);
}

function formatLessonContent(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/"([^"]+)"/g,'<em style="color:var(--black);font-style:normal;font-weight:500">"$1"</em>')
    .replace(/\n/g,'<br>');
}

function completeCourse(courseId) {
  const course = COURSE_CATALOG.find(c => c.id === courseId);
  if (!course) return;
  if (AUTH.user) {
    if (!AUTH.user.levelsCompleted) AUTH.user.levelsCompleted = [];
    if (!AUTH.user.levelsCompleted.includes(courseId)) {
      AUTH.user.levelsCompleted.push(courseId);
      saveUserProgress();
    }
  }
  addXP(100);
  showNotif(`${course.icon} ${course.title} complete! +100 XP`);
  const c = document.getElementById('course-detail-content');
  c.innerHTML = `
    <div style="max-width:500px;text-align:center;padding:60px 20px">
      <div style="font-size:48px;margin-bottom:16px">🎉</div>
      <div style="font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:700;margin-bottom:8px">Course complete!</div>
      <div style="font-size:15px;color:var(--gray-600);margin-bottom:8px">${course.title}</div>
      <div style="font-size:14px;color:var(--amber);font-weight:500;margin-bottom:28px">${course.cert}</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button onclick="nav('certificates')" style="padding:12px 22px;background:var(--black);color:var(--white);border:none;border-radius:var(--radius);font-size:14px;font-weight:500;cursor:pointer;font-family:Inter,sans-serif">Get certificate →</button>
        <button onclick="nav('courses')" style="padding:12px 18px;border:1px solid var(--gray-200);border-radius:var(--radius);background:var(--white);font-size:14px;cursor:pointer;font-family:Inter,sans-serif">More courses</button>
      </div>
    </div>
  `;
}

// ── KLAUS INTEGRATION ──
function openKlausForCourse(courseId) {
  const course = COURSE_CATALOG.find(c => c.id === courseId);
  if (!course) return;
  nav('aitutor');
  if (AI.history.length === 0) initAITutor();
  setTimeout(() => {
    const input = document.getElementById('ai-input');
    if (input) {
      input.value = `I want to practice the "${course.title}" course. ${course.klausMode}`;
      sendAIMsg();
    }
  }, 300);
}

function openKlausForLesson(courseId, lessonTitle) {
  const course = COURSE_CATALOG.find(c => c.id === courseId);
  if (!course) return;
  nav('aitutor');
  if (AI.history.length === 0) initAITutor();
  setTimeout(() => {
    const input = document.getElementById('ai-input');
    if (input) {
      input.value = `I just studied "${lessonTitle}" in the ${course.title} course. Can you run a scenario or drill that practices exactly this? Context: ${course.klausMode}`;
      sendAIMsg();
    }
  }, 300);
}
