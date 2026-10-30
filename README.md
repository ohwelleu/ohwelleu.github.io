# ohwelleu.github.io

just another github page — a small bilingual (EN/LT) Markdown blog with dark and light themes.

**Live:** https://ohwelleu.github.io

## Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS v4](https://tailwindcss.com) + `@tailwindcss/typography`
- Markdown blog posts in Astro content collections
- GitHub Pages + GitHub Actions

## Getting started

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + build to dist/
npm run preview  # serve the built site
npm run format   # format with Prettier
```

## Writing a post

Create a Markdown file per language with the same file name:

```
src/content/blog/en/my-post.md
src/content/blog/lt/my-post.md
```

```md
---
title: "My post"
description: "One-line summary shown in lists and meta tags."
pubDate: 2026-11-01
tags: ["astro"]
draft: false # drafts show in `npm run dev` only
---

Post content in Markdown…
```

## Project structure

```
src/
├── components/
│   ├── ui/        # building blocks: Button, Container, SectionHeader, Logo, Icon, …
│   ├── layout/    # Header, Footer, theme + language switchers, <head>
│   └── blog/      # PostRow, PostList, PostMeta
├── content/blog/  # Markdown posts, one folder per language
├── data/profile.ts  # handle and external links
├── i18n/          # languages, UI dictionary, translation helpers
├── layouts/       # BaseLayout, PostLayout
├── lib/           # post queries, navigation
├── pages/         # routes: /[lang]/, /[lang]/blog/, RSS
└── styles/global.css  # Tailwind theme, palette, utilities, Markdown styles
```

- **Links:** edit `src/data/profile.ts`.
- **Markdown reference:** see the `markdown-test` post for every supported feature.
- **Interface text:** edit `src/i18n/ui.ts` (keys are type-checked across languages).
- **Colours:** edit the CSS variables at the top of `src/styles/global.css`. Add the `dark` class to any element to make it always dark (the nav bar does this).

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). Pull requests run format and type checks (`.github/workflows/ci.yml`).
