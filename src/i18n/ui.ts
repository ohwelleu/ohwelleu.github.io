import type { Lang } from "./config";

export const ui = {
  en: {
    "site.title": "Karolis — ohwelleu",
    "site.description":
      "Notes on building websites and breaking them on purpose: web development, test automation and working alongside AI agents.",
    "nav.main": "Main",
    "nav.home": "Home",
    "nav.blog": "Blog",
    "theme.toggle": "Toggle dark / light theme",
    "lang.switch": "Switch language",
    "ticker.latest": "Latest",
    "hero.eyebrow": "Karolis · web & test automation · Lithuania",
    "hero.title": "I build websites. Then I break them on purpose.",
    "hero.intro":
      "I write tests that find the bug before users do, and crawlers that find the dead links before Google does. In between: WordPress themes, small tools and, lately, a lot of pair-programming with an AI agent. This is where I write down what worked, what didn't, and why.",
    "hero.cta": "Read the blog",
    "hero.spiral": "build,test,break,fix,ship",
    "home.writing": "Notes from the workbench",
    "home.writingIntro":
      "Written when something took long enough to figure out that it deserves an explanation.",
    "home.allPosts": "All posts",
    "blog.title": "Blog",
    "blog.description":
      "Web development, test automation and working alongside AI agents — what worked, what broke, and why.",
    "blog.empty": "Nothing published yet. The first draft is on its way.",
    "blog.back": "All posts",
    "blog.updated": "Updated",
    "blog.readingTime": "min read",
    "footer.tagline": "Notes on building the web — and breaking it on purpose.",
    "footer.writing": "Writing",
    "footer.elsewhere": "Elsewhere",
    "404.title": "Dead link.",
    "404.text":
      "Ironic, for someone who writes link checkers. Let's get you back on track.",
    "404.home": "Back home",
  },
  lt: {
    "site.title": "Karolis — ohwelleu",
    "site.description":
      "Užrašai apie svetainių kūrimą ir tyčinį jų laužymą: interneto kūrimas, testų automatizavimas ir darbas su DI agentais.",
    "nav.main": "Pagrindinis meniu",
    "nav.home": "Pradžia",
    "nav.blog": "Blogas",
    "theme.toggle": "Perjungti tamsią / šviesią temą",
    "lang.switch": "Pakeisti kalbą",
    "ticker.latest": "Naujausia",
    "hero.eyebrow": "Karolis · svetainės ir testų automatizavimas · Lietuva",
    "hero.title": "Kuriu svetaines. Paskui tyčia jas laužau.",
    "hero.intro":
      "Rašau testus, kurie randa klaidą anksčiau nei naudotojai, ir robotus, kurie randa mirusias nuorodas anksčiau nei Google. Tarp jų — WordPress temos, maži įrankiai ir pastaruoju metu daug programavimo poroje su DI agentu. Čia užrašau, kas pavyko, kas ne, ir kodėl.",
    "hero.cta": "Skaityti blogą",
    "hero.spiral": "kuriu,testuoju,laužau,taisau,leidžiu",
    "home.writing": "Užrašai iš dirbtuvių",
    "home.writingIntro":
      "Rašau, kai kažką išsiaiškinti užtruko pakankamai ilgai, kad verta paaiškinti.",
    "home.allPosts": "Visi įrašai",
    "blog.title": "Blogas",
    "blog.description":
      "Interneto kūrimas, testų automatizavimas ir darbas su DI agentais — kas pavyko, kas lūžo ir kodėl.",
    "blog.empty": "Kol kas nieko. Pirmas juodraštis jau rašomas.",
    "blog.back": "Visi įrašai",
    "blog.updated": "Atnaujinta",
    "blog.readingTime": "min. skaitymo",
    "footer.tagline": "Užrašai apie svetainių kūrimą — ir tyčinį jų laužymą.",
    "footer.writing": "Rašau",
    "footer.elsewhere": "Kitur",
    "404.title": "Mirusi nuoroda.",
    "404.text":
      "Ironiška, turint omeny, kad rašau nuorodų tikrintuvus. Grįžkime į kelią.",
    "404.home": "Į pradžią",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)["en"];
