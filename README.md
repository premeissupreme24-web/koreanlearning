# Korean Learning App

Static Korean learning PWA prepared for Vercel deployment.

## Content policy

Textbooks are used only as high-level references for course order, exercise types, and learning-path structure. The Chinese explanations, Korean example sentences, vocabulary prompts, and practice questions in this app are original content and do not copy PDF textbook pages.

## Curriculum reference notes

These references are guardrails for lesson sequencing and exercise design only.

- `Basic Korean: A Grammar and Workbook`: reference grammar order and workbook-style practice structure. Do not copy source explanations or examples. Useful order includes Hangul, SOV word order, nouns, predicates/endings, polite speech levels, particles, pronouns, numbers, counters, `이다/아니다`, `있다/없다`, object/place/direction/possession particles, time ranges, past tense, negation, irregulars, desire/progressive/future forms, prenouns, adverbs, and honorific `-(으)시`.
- `Seoul National University Korean 1A`: reference full beginner lesson shape: topic warm-up, vocabulary, grammar and expressions, speaking, listening, reading, writing, task, and culture. Use this to shape Level 1-2 app experiences.
- `Seoul National University Korean 1B`: reference expanded beginner lesson flow: vocabulary, grammar, speaking, listening, reading/writing, task, culture, pronunciation, and self-check. This can become each lesson stepper.
- `Seoul National University Korean 2A Workbook`: reference exercise categories only, not MVP content. Useful categories include vocabulary practice, grammar/expression practice, listening, reading, writing, speaking, pronunciation, and review.

## Pronunciation drill reference notes

The beginner pronunciation video is used as a reference for targeted drills, not as copied lesson text. The app should train:

- Basic vowels: `ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ`
- Y-row vowels: `ㅑ ㅕ ㅛ ㅠ ㅒ ㅖ`
- W-row vowels: `ㅘ ㅝ ㅙ ㅞ`
- Compound vowels: `ㅐ ㅔ ㅚ ㅟ ㅢ`
- Plain / aspirated / tense contrasts: `ㄱ/ㅋ/ㄲ`, `ㄷ/ㅌ/ㄸ`, `ㅂ/ㅍ/ㅃ`, `ㅈ/ㅊ/ㅉ`, plus `ㅅ/ㅆ` as a separate fricative contrast.
- `ㅇ` rules: initial placeholder is silent; final `ㅇ` is /ng/.
- `ㅢ` position readings: standalone/word-initial `의`, possessive often `에`, and some non-initial cases near `이`.
- Common confusions for Chinese speakers: `ㅓ/ㅗ`, `ㅡ/ㅜ`, `ㅐ/ㅔ`, `ㅚ/ㅙ/ㅞ`, `ㄹ` r/l feeling, and final `ㄱ/ㄷ/ㅂ/ㅇ`.

## Run locally

This is a lightweight static HTML/CSS/JS app. It does not require React, Vue, Next.js, or a backend.

```bash
npm install
npm run build
```

`npm run build` performs JavaScript syntax checks and JSON validation.

To preview as a website, serve the folder with any static server, for example:

```bash
npx serve .
```

Then open the local URL in a browser.

## Deploy

On Vercel, import the GitHub repo as a static project. Use:

- Framework Preset: `Other`
- Build Command: empty, or `npm run build` if you want syntax validation during deploy
- Output Directory: `.`
