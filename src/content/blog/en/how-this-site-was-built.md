---
title: "How this site was built"
description: "Astro, Tailwind CSS, Markdown, GitHub Pages — and an AI agent that wrote most of the code from a handful of prompts."
pubDate: 2026-10-30
tags: ["astro", "tailwind", "ai", "github-pages"]
---

Hello, world! This is the first post on my new personal page. Instead of the usual "lorem ipsum", let's look at how the page itself was made: which tools it uses and how an AI agent did most of the work.

## The idea

I wanted one place for three things:

- a short **CV** I can link to,
- a **blog** where every post is just a Markdown file,
- **two languages** — English and Lithuanian.

It should also look fun: a **retro pixel-art hacker** style with **dark and light** themes. And the code should stay clean, with small reusable components and helpers, so it is easy to grow later.

## The tech stack

| Part           | Tool                                                             |
| -------------- | ---------------------------------------------------------------- |
| Site generator | [Astro](https://astro.build) — static HTML, zero JS by default   |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com) + Typography plugin   |
| Content        | Markdown files in Astro content collections, checked by Zod      |
| Fonts          | _Press Start 2P_ for headings, _JetBrains Mono_ for text         |
| Hosting        | GitHub Pages, deployed by GitHub Actions on every push to `main` |
| Code quality   | TypeScript (strict), `astro check`, Prettier                     |

### Blog posts are Markdown

Each post is a file in `src/content/blog/<lang>/<slug>.md`. The frontmatter is validated with a schema, so a typo in a date or a missing title breaks the build instead of the page:

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

A translated post is the same file name in the other language folder. That's all it takes to add a new post: write Markdown, push, done.

### Two languages

Every page lives under `/en/` or `/lt/`. All interface text sits in one dictionary file, and a tiny helper returns the right string:

```ts
const t = useTranslations(lang);
t("nav.blog"); // "blog" or "blogas"
```

The root `/` looks at your browser language and sends you to the matching version.

### Retro look, two themes

Colours are CSS variables that Tailwind turns into utilities like `bg-surface` or `text-accent`. The `.dark` class on `<html>` swaps the whole palette. A small inline script runs before the first paint, so the page never flashes the wrong theme.

The pixel feel comes from a few custom utilities:

- `pixel-border` — a border with notched corners, made with four `box-shadow`s,
- `crt` — faint scanlines over the page in dark mode,
- `text-glow` — a green phosphor glow on headings,
- icons drawn as text grids, where `#` is a pixel, and rendered to crisp SVG.

### Deployment

A GitHub Actions workflow installs dependencies, runs type checks, builds the site and publishes `dist/` to GitHub Pages. Pull requests run the same checks, plus a Prettier format check.

## Built with AI

The whole project was made in one session with **Claude Code** (running in T3 Code). I described what I wanted in plain words; the agent planned the structure, picked versions that work with my local Node.js, wrote the components, set up the GitHub repo, Pages and CI, and opened a pull request.

These are the prompts I used, as I typed them:

> Ok in .ai folder I want to create new project. It will be my personal page hosted in github, like cv or more like blog. Can you do all work? Or i will need to make some settings manual?

The agent answered that it could do almost everything. Only three things needed me: my real CV details, agreeing to a public repo (free GitHub Pages needs one), and DNS settings if I ever want a custom domain. Then:

> Language both, theme dark light, theme should be retro pixel art hacker like. Yes every blog post should be mark down. Note make code look clean use components helpers and etc also i like tailwind. For demo purpose create forst blog post how this page was created technology used and ai for prompts

That second prompt produced the site you're reading, including this post. Short and messy prompts worked fine. What mattered was saying clearly what I wanted, not how to build it.

### What I'd tell someone trying this

1. **Say what you want, not how to do it.** "Retro pixel hacker theme" was enough; the agent picked the fonts and colours itself.
2. **Mention your preferences.** I said I like Tailwind and clean components, so that's what I got.
3. **Review the pull request.** The AI did the typing, but it's still my site. Reading the diff is how I learn what's inside.

## What's next

- Fill the CV with real details.
- Write more posts about test automation, link checkers and AI tools.
- Maybe a custom domain.

Thanks for reading! The source code is on [GitHub](https://github.com/ohwelleu/ohwelleu.github.io).
