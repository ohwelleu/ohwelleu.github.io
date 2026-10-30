---
title: "Three prompts and a change of heart"
description: "An empty folder in the evening, a published bilingual blog the same night. I typed three prompts. An AI agent did the rest — including the first design, which I threw away."
pubDate: 2026-10-30
tags: ["ai", "claude-code", "github-pages", "process"]
---

This site went from an empty folder to a live, bilingual blog in a single evening. I didn't write the code. I wrote three prompts — short, typo-ridden, half of them in the wrong language — and [Claude Code](https://claude.com/claude-code), running inside T3 Code, did the rest: it picked the tools, wrote the components, created the GitHub repository, wired up deploys and opened pull requests for me to review.

This post is the honest log of how that went, including the part where I looked at the result and asked for something completely different.

## "Can you do all the work?"

The first prompt was a question, not a spec:

> Ok in .ai folder I want to create new project. It will be my personal page hosted in github, like cv or more like blog. Can you do all work? Or i will need to make some settings manual?

The answer was refreshingly specific. Almost everything could be automated — my GitHub CLI was already logged in with the right permissions. Only three things needed me:

1. **Content.** It had no way of knowing my work history, and it said so instead of inventing one.
2. **A public repository.** On a free GitHub plan, Pages only serves public repos.
3. **DNS**, but only if I ever want a custom domain.

Then it asked four questions — address, framework, look, language — each with a recommended default. That's the moment I stopped worrying about whether this would work.

## The spec in one breath

> Language both, theme dark light, theme should be retro pixel art hacker like. Yes every blog post should be mark down. Note make code look clean use components helpers and etc also i like tailwind. For demo purpose create forst blog post how this page was created technology used and ai for prompts

What came back:

- a site in English and Lithuanian, with a language switcher that keeps you on the same page;
- neon green on black, CRT scanlines, a blinking cursor, the _Press Start 2P_ pixel font;
- every blog post a Markdown file, checked against a schema at build time;
- a GitHub Actions pipeline that type-checks, builds and publishes on every push.

The interesting part wasn't the output, it was the judgement along the way. The newest version of the framework needed a newer Node.js than the one on my laptop, so the agent chose the previous major version instead of breaking my setup — and then ran the type checker under a newer Node just to prove the code was clean. Before opening the pull request it served the site locally, drove a headless browser through it, took screenshots in both themes and on a phone-sized screen, and clicked the theme and language toggles to make sure they actually worked.

It also flagged a flaw nobody asked about: the pixel font has no glyph for the Lithuanian letter **ų**. On a bilingual site, that's not a detail.

I merged it. It was fun. It also looked like every other retro-terminal portfolio on the internet.

## The change of heart

> https://www.contentarchitecture.dev/?ref=onepagelove naudok geriau toki stilių, pašalink astro ir pan pašalink emai nerašk lėkštai, cv dali išvis pašalink kolkas tbd

_(Roughly: "use a style like this instead, drop the Astro mentions and such, remove the email, stop writing so blandly, and remove the CV section entirely for now — TBD.")_

One link did more than my whole previous paragraph of adjectives. The agent opened the reference in a headless browser, screenshotted it section by section, and read the computed styles straight from the page: font families, sizes, weights, colours. Then it rebuilt the design system around what it found:

- warm paper background, near-black ink, one orange accent used sparingly;
- **Geist** for reading, **Geist Mono** in small capitals for labels, dates and numbers;
- numbered sections — `01 /` — instead of decoration;
- a floating, always-dark navigation bar with the latest post scrolling underneath;
- rings of slowly turning text where the pixel art used to be.

The CV page is gone until there's something real to put on it. So is the placeholder email address. And the copy — including this post — was rewritten from scratch, because "I build things for the web" says nothing about anyone.

## Under the hood

The stack is deliberately boring, so the content can be the interesting part.

### Posts are Markdown files

Each post lives in `src/content/blog/<lang>/<slug>.md`, and a translation is simply the same file name in the other language's folder. Frontmatter is validated by a schema, so a typo in a date fails the build instead of quietly breaking a page:

```ts
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

### One dictionary per language

Every interface string sits in one typed file. Forget to translate a key and TypeScript complains before a visitor ever sees it:

```ts
const t = useTranslations(lang);
t("hero.cta"); // "Read the blog" / "Skaityti blogą"
```

### Themes are just CSS variables

The whole palette is seven CSS variables. Adding the `.dark` class swaps all of them — and because it's just a class, any element can carry it. That's how the navigation bar and the panel with the text rings stay dark even in light mode: they are wearing the dark theme themselves. A tiny inline script picks your saved theme before the first paint, so the page never flashes.

### Deploys are a pull request away

Pull requests run formatting, type checks and a full build. Merging to `main` publishes to GitHub Pages. No servers, no bills.

## What I'd tell you if you try this

1. **Show, don't describe.** "Retro pixel hacker theme" got me exactly what I asked for. A link to a site I liked got me what I wanted.
2. **Short prompts are fine.** Mine had typos and switched languages mid-sentence. What mattered was saying _what_ I wanted, not _how_ to build it.
3. **Throwing work away is cheap now.** Replacing the whole first design took one sentence. That changes how willing you are to try things.
4. **Read the diff.** The agent did the typing, but it's still my site. Reviewing the pull request is how I know what's actually in it.

The source is on [GitHub](https://github.com/ohwelleu/ohwelleu.github.io) — pull requests included, so you can read exactly what the agent wrote and what I asked it to change.
