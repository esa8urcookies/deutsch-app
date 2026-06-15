# deutsch-app
german app
# Deutsch.app — Product Roadmap v2
## Updated June 2026

---

## WHERE WE ARE NOW

### What's built
- Full web app (HTML/CSS/JS, GitHub Pages hosted)
- User auth system (register/login, localStorage)
- 16 course tracks with lesson content, vocab, scenarios
- AI Tutor (Klaus) — 6 modes, real-time correction, German speech playback
- Certificate system — level tests (A1/A2/B1), PDF download
- Full Diagnostic — 6 modules
- Brain Dump — word flood + speaking dump
- Flashcards with spaced repetition
- Grammar Quiz, Listening Drill, Word Game
- Speaking Drill with rotating prompts
- Daily plan system on home dashboard

### What's missing (Phase 1 priorities)
- Real database (currently localStorage — data lost on browser clear)
- Reading module (CEFR requires it for full certification)
- Speech transcription + AI analysis of spoken output
- Mobile-responsive layout improvements
- Actual audio files (currently browser TTS — robotic)

---

## PHASE 0 — FOUNDATION (NOW — Month 1)
**Goal:** Rock-solid base before acquiring users

### Database migration — Supabase
- Create Supabase project on Frankfurt (EU) server — GDPR compliance
- Run schema migrations (users, progress, certificates, track_progress, conversations)
- Enable Row Level Security on all tables — security layer 1
- Replace localStorage auth with Supabase Auth (email + Google OAuth)
- Move Anthropic API key from frontend to Supabase Edge Function — security layer 2
- Test: can User A ever see User B's data? (Answer must be: never)

### Legal compliance (mandatory — you're in Germany)
- Write Datenschutzerklärung (Privacy Policy) — German law requires it
- Write Impressum (Legal Notice) — required for any German website
- Write Nutzungsbedingungen (Terms of Service)
- Add cookie consent banner
- Add GDPR data deletion: user can delete their account + all data
- Store all user data in EU region only

### GitHub → Custom domain
- Buy domain: alltag.app or sprechen.app or kiez.app (~€10/year)
- Connect to Netlify (free hosting, better than GitHub Pages for real apps)
- Add SSL certificate (Netlify does this automatically)

**End of Phase 0 deliverable:** A real web app that doesn't lose data, is legally compliant, and has a real domain.

---

## PHASE 1 — FIRST 100 USERS (Month 1-3)
**Goal:** Real users, real feedback, understand what actually works

### Product additions
- Reading module (complete CEFR skill coverage)
  - 30 short texts across A1-B1 (signs, emails, ads, short articles)
  - Multiple choice comprehension questions
  - Vocabulary extraction from the text
- ElevenLabs audio integration
  - Pre-generate MP3s for all 50 flashcard words
  - Pre-generate audio for all listening drill sentences
  - Replace browser TTS with real German voices
- Mobile layout fixes — sidebar becomes bottom nav on mobile
- Progress persistence — streak tracking that actually works across devices
- Push notifications (browser) — daily reminder for streak

### How to get the first 100 users (do this yourself, costs €0)
1. Post in Berlin expat Facebook groups — search "Berlin Expats", "Brits in Berlin", "Americans in Berlin" — combined 200k+ members
2. Post in r/germany, r/berlin, r/LearnGerman on Reddit with honest "I built this" post
3. Add to your Instagram bio link
4. Tell everyone at church who is learning German or helping internationals integrate
5. Post in Berlin language exchange groups on Meetup.com
6. DM 20 Berlin language schools — offer it free as a supplement for their students
7. Post in Berlin Facebook groups for specific communities: Filipino community in Berlin, African community in Berlin, Arab community in Berlin — all large, all have members learning German

### What to measure with first 100 users
- Day 1 retention: do they come back the next day?
- Most used module (hypothesis: AI Tutor / Klaus)
- Drop-off point (hypothesis: after Day 3 without reminder)
- Most requested missing feature
- Which course track gets opened most

**End of Phase 1 deliverable:** 100 real users, clear data on what works, one surprising insight you didn't expect.

---

## PHASE 2 — PRODUCT DEPTH (Month 3-6)
**Goal:** Good enough to charge for, good enough to be proud of

### Big features
1. Speech analysis — the missing piece
   - Web Speech API transcribes what user says
   - Transcript goes to Claude for analysis: "User attempted: X. Correct: Y. Errors: Z. Score: N/10"
   - This makes speaking section actually measurable, not just self-rated
   - Differentiates from Busuu and Babbel who don't do this

2. Community layer — immigrants helping immigrants
   - Simple discussion board per course (e.g., "Anmeldung & Admin" has its own thread)
   - Users can post their written German and get corrections from others
   - Berlin-specific: "Has anyone dealt with this Bürgeramt situation?"
   - This is Busuu's #1 retention driver. Build a lighter version.

3. Full course content expansion
   - Complete all 16 courses with full lesson content (currently 5 lessons each — expand to 10)
   - Add A2-B2 vocabulary packs per course track (50 words each)
   - Add Klaus scenario library — 5 scenarios per course, each with branching paths

4. Streak and notification system
   - Email reminders (use Resend — free tier covers you)
   - Browser push notifications
   - Streak freezes (Duolingo mechanic — works for retention)
   - Weekly progress email: what you learned, what's next

### Monetization starts here
**Freemium model:**
- Free: First 48 Hours, Anmeldung, Doctor Visit, Direction German, Daily Berlin (A1 only), Flashcards (A1 words), 5 Klaus messages/day, Brain Dump
- Premium (€4.99/month or €39/year): All survival + daily courses, unlimited Klaus, all 5 grammar lessons, full flashcard deck, streak features, progress export
- Pro (€9.99/month or €79/year): Everything in Premium + all 10 professional course tracks, full certificate tests (A1/A2/B1/B2), speech analysis, community access, audio by ElevenLabs

**Payment:** Stripe integration. Takes 1 day to add. 2.9% + €0.25 per transaction.

**End of Phase 2 deliverable:** Paying users, real revenue (even €100/month is validation), speech analysis working, community seeded.

---

## PHASE 3 — LEGITIMACY (Month 6-18)
**Goal:** Certificates that employers actually recognize, partnerships, real credibility

### Certificate legitimacy path
1. Get a CEFR consultant to formally audit content (€500-2000 one-time fee, worth it)
2. Partner with ONE Berlin language school to co-sign certificates
   - Pitch: "We send you students who need in-person prep, you validate our digital certificates, we split premium revenue 70/30"
   - There are 50+ language schools in Berlin. One will say yes.
   - Target: smaller schools that want digital leverage, not Goethe (they won't partner)
3. Approach telc (based in Frankfurt) about becoming listed as exam prep platform
   - telc is cheaper than Goethe, more used for immigration/residency purposes
   - They actively want digital prep partners
4. Add verification API — every certificate gets a unique URL, employers can verify it's real
5. Add LinkedIn certificate sharing — one-click to add to LinkedIn profile (massive for users)

### B2B channel — biggest untapped opportunity
German companies legally require B1 for certain employee roles. They currently pay €300-800/person for in-person courses. You can offer:
- Company accounts (5+ seats) at €7/user/month = better than per-person pricing
- Progress reporting dashboard for HR
- Custom vocabulary packs for their industry (cleaning company? build Reinigung pack)
- This is potentially bigger than the consumer business

First target: cleaning companies, logistics companies, hospitality groups — industries with many immigrant workers who need German for safety/compliance reasons. Your own employer is a potential first customer.

### Growth beyond Berlin
- Berlin → Hamburg → Munich → Frankfurt → all of Germany
- Then: Austria, Switzerland (same language, different regulations)
- Don't expand internationally until you've saturated Germany

**End of Phase 3 deliverable:** First B2B customer, partner language school co-signing certificates, telc listed, LinkedIn sharing live. Revenue: €2,000-5,000/month.

---

## PHASE 4 — SCALE (Year 2+)
**Goal:** Become the default German learning app for immigrants in Germany

### Product
- Native mobile apps (React Native — reuse most of your existing JS logic)
- Offline mode — lessons work without internet
- Expand to B2/C1 certificate tests
- Add more languages spoken by immigrants (Turkish, Arabic, Russian, Polish learners of German are the largest groups)
- AI speaking partner that actually listens and responds in real-time (ElevenLabs conversational AI)

### Business
- Apply for Berlin Startup Stipendium (€1,000/month for 1 year — free money for Berlin startups)
- Apply to EU Digital Education programs (EdTech grants available)
- Consider raising a small angel round (€50-100k) to hire one person for content/community
- Apply for ALTE associate membership (requires established track record — this is now achievable)

### Revenue projection at scale (conservative)
| Users | Conversion | Revenue |
|---|---|---|
| 1,000 free | 5% pay €5/mo | €250/mo |
| 5,000 free | 6% pay | €1,500/mo |
| 20,000 free | 7% pay | €7,000/mo |
| 50,000 free | 7% pay | €17,500/mo |
| B2B: 10 companies × 20 users × €7 | — | €1,400/mo additional |

**Realistic Year 2 target: €5,000-10,000/month recurring**

---

## COMPETITIVE POSITIONING — THE HONEST VERSION

### What you copy from competitors (no shame in this)
- **From Duolingo:** Streak system, XP, daily habit loop, satisfying completion animations
- **From Busuu:** CEFR structure, certificate model, community corrections concept
- **From Babbel:** Grammar lesson depth, structured progression per topic
- **From Goethe:** Formal assessment structure, document reading exercises

### What you do differently (your real edge)
1. **Built for immigrants in Germany specifically** — not generic "learn German for fun." Every course maps to a real-life situation you actually face in Germany.
2. **Klaus** — no competitor has a real AI tutor that speaks German, corrects you in real-time, plays characters, runs scenarios, and adapts to your industry. This is your moat.
3. **The Plateau Breaker and Comfort Zone Destroyer** — genuinely new. Nobody builds for the Year 2-3 stuck learner. That person has money, motivation, and no good options.
4. **Professional verticals** — 10 industry-specific courses from A1→C2. Nobody else has Cybersecurity German, Healthcare German for workers, or Cleaning Industry German.
5. **The Doctor Visit course — free forever** — this is your public good and your marketing. Pure goodwill that drives viral sharing.
6. **You've lived it** — 5 years in Berlin, exactly the person this app is for. That authenticity is in every decision you make.

### What can beat you (be honest)
- Duolingo if they build a serious immigration-focused product (unlikely — they optimize for scale)
- A well-funded EdTech startup that copies your exact positioning (your counter: move faster, know the user better, build community)
- Goethe or telc building their own app (very slow-moving institutions — unlikely to move fast)

---

## THE ONE THING

If you do nothing else from this roadmap, do this:

**Get Supabase set up and post the app in three Berlin expat Facebook groups.**

The database migration means your users don't lose their data. The Facebook posts get you your first 50 real users. Everything else flows from having real users giving you real feedback.

The best product decision you can make is to talk to 10 immigrants in Berlin who are learning German and ask them: what's the one thing that's hardest? What did you need that didn't exist? The answers will shape the next 12 months of development better than any roadmap.

---

## FILE STRUCTURE (current)
```
deutsch-app/
├── index.html          — Main app shell, all pages
├── app.js              — Core logic: nav, vocab, lessons, word game, grammar, listening, diagnostic, brain dump, speaking
├── data.js             — All vocab, grammar questions, listening questions, lessons data
├── courses.js          — 16 course tracks, catalog, lesson player, Klaus integration
├── ai-tutor.js         — Klaus AI tutor: 6 modes, speech input, correction tracking
├── auth.js             — User accounts, certificates, level tests, CEFR assessment
├── ROADMAP.md          — This file
├── CURRICULUM_AND_DATABASE.md  — Database schema, security architecture, 8 learning tracks
└── PROFESSIONAL_COURSES.md     — Full professional course curriculum detail
```

## NEXT IMMEDIATE ACTIONS (this week)
1. Upload all 6 JS/HTML files to GitHub (replace old versions)
2. Set up Supabase account (free, 30 minutes)
3. Pick a domain name and buy it (€10, 5 minutes)
4. Post in one Berlin expat Facebook group
5. Send the Doctor Visit course link to 5 people you know who are learning German

That's it. Everything else comes after you have real users.
