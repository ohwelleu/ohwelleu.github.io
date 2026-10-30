import type { Lang } from "@/i18n/config";

/** A string that has a version for every language. */
export type Localized = Record<Lang, string>;

export interface Link {
  label: string;
  href: string;
}

export interface Job {
  role: Localized;
  company: string;
  start: string;
  /** Leave empty for the current position. */
  end?: string;
  summary: Localized;
  highlights: Localized[];
}

export interface SkillGroup {
  title: Localized;
  items: string[];
}

export interface Education {
  degree: Localized;
  school: string;
  start: string;
  end: string;
}

// TODO: replace the placeholder entries below with your real details.
export const profile = {
  name: "Karolis",
  handle: "ohwelleu",
  role: {
    en: "Web developer & test automation engineer",
    lt: "Interneto programuotojas ir testų automatizavimo inžinierius",
  } satisfies Localized,
  location: { en: "Lithuania", lt: "Lietuva" } satisfies Localized,
  about: {
    en: "I build websites and tools, write end-to-end tests that catch bugs before users do, and use AI assistants to move faster.",
    lt: "Kuriu svetaines ir įrankius, rašau end-to-end testus, kurie pagauna klaidas anksčiau nei naudotojai, ir naudoju DI asistentus, kad dirbčiau greičiau.",
  } satisfies Localized,
  links: [
    { label: "GitHub", href: "https://github.com/ohwelleu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Email", href: "mailto:hello@example.com" },
  ] satisfies Link[],
  experience: [
    {
      role: {
        en: "QA Automation Engineer",
        lt: "QA automatizavimo inžinierius",
      },
      company: "Company name",
      start: "2023",
      summary: {
        en: "Building and maintaining automated test suites for web products.",
        lt: "Automatinių testų rinkinių kūrimas ir palaikymas interneto produktams.",
      },
      highlights: [
        {
          en: "End-to-end and visual regression tests with Playwright",
          lt: "End-to-end ir vizualinės regresijos testai su Playwright",
        },
        {
          en: "Link-checking crawlers for large multilingual sites",
          lt: "Nuorodų tikrinimo robotai dideliems daugiakalbiams puslapiams",
        },
      ],
    },
    {
      role: { en: "Web Developer", lt: "Interneto programuotojas" },
      company: "Freelance",
      start: "2020",
      end: "2023",
      summary: {
        en: "WordPress sites, custom Gutenberg blocks and small web apps.",
        lt: "WordPress svetainės, Gutenberg blokai ir nedidelės interneto programėlės.",
      },
      highlights: [
        {
          en: "Custom themes with React-based blocks and Tailwind CSS",
          lt: "Individualios temos su React blokais ir Tailwind CSS",
        },
        {
          en: "Firebase apps with Cloud Functions and Firestore",
          lt: "Firebase programėlės su Cloud Functions ir Firestore",
        },
      ],
    },
  ] satisfies Job[],
  skills: [
    {
      title: { en: "Frontend", lt: "Frontend" },
      items: [
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Astro",
        "React",
      ],
    },
    {
      title: { en: "Testing", lt: "Testavimas" },
      items: [
        "Playwright",
        "Puppeteer",
        "Visual regression",
        "Page Object Model",
      ],
    },
    {
      title: { en: "Backend & tools", lt: "Backend ir įrankiai" },
      items: [
        "Node.js",
        "WordPress",
        "PHP",
        "Firebase",
        "Docker",
        "Git",
        "GitHub Actions",
      ],
    },
    {
      title: { en: "AI", lt: "DI" },
      items: ["Claude Code", "Prompt engineering", "AI-assisted code review"],
    },
  ] satisfies SkillGroup[],
  education: [
    {
      degree: { en: "Degree / course name", lt: "Studijų programa / kursai" },
      school: "School name",
      start: "2016",
      end: "2020",
    },
  ] satisfies Education[],
};
