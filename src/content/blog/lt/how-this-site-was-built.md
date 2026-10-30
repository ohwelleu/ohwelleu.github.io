---
title: "Kaip sukurtas šis puslapis"
description: "Astro, Tailwind CSS, Markdown, GitHub Pages — ir DI agentas, kuris iš kelių užklausų parašė didžiąją dalį kodo."
pubDate: 2026-10-30
tags: ["astro", "tailwind", "di", "github-pages"]
---

Labas, pasauli! Tai pirmasis įrašas mano naujame asmeniniame puslapyje. Vietoj įprasto „lorem ipsum“ papasakosiu, kaip buvo sukurtas pats puslapis: kokie įrankiai naudoti ir kaip didžiąją darbo dalį atliko DI agentas.

## Idėja

Norėjau vienos vietos trims dalykams:

- trumpam **CV**, kurį galėčiau nusiųsti,
- **blogui**, kuriame kiekvienas įrašas yra tiesiog Markdown failas,
- **dviem kalboms** — anglų ir lietuvių.

Puslapis turėjo atrodyti smagiai: **retro pikselių meno „hakerio“** stilius su **tamsia ir šviesia** temomis. O kodas — likti tvarkingas, su mažais pakartotinai naudojamais komponentais ir pagalbinėmis funkcijomis, kad vėliau būtų lengva plėsti.

## Technologijos

| Dalis             | Įrankis                                                               |
| ----------------- | --------------------------------------------------------------------- |
| Svetainės kūrimas | [Astro](https://astro.build) — statinis HTML, be JS pagal nutylėjimą  |
| Stiliai           | [Tailwind CSS v4](https://tailwindcss.com) + Typography įskiepis      |
| Turinys           | Markdown failai Astro turinio kolekcijose, tikrinami su Zod           |
| Šriftai           | _Press Start 2P_ antraštėms, _JetBrains Mono_ tekstui                 |
| Talpinimas        | GitHub Pages, diegiama su GitHub Actions po kiekvieno `push` į `main` |
| Kodo kokybė       | TypeScript (griežtas režimas), `astro check`, Prettier                |

### Įrašai — Markdown failai

Kiekvienas įrašas yra failas `src/content/blog/<kalba>/<slug>.md`. Antraštės duomenys (frontmatter) tikrinami pagal schemą, todėl klaida datoje ar trūkstamas pavadinimas sustabdo kūrimą, o ne sugadina puslapį:

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

Išverstas įrašas — tas pats failo pavadinimas kitos kalbos aplanke. Naujam įrašui tereikia parašyti Markdown ir padaryti `push`.

### Dvi kalbos

Kiekvienas puslapis yra po `/en/` arba `/lt/`. Visi sąsajos tekstai laikomi viename žodyne, o maža pagalbinė funkcija grąžina reikiamą tekstą:

```ts
const t = useTranslations(lang);
t("nav.blog"); // "blog" arba "blogas"
```

Pagrindinis adresas `/` pagal naršyklės kalbą nukreipia į tinkamą versiją.

### Retro išvaizda, dvi temos

Spalvos yra CSS kintamieji, kuriuos Tailwind paverčia klasėmis, pvz. `bg-surface` ar `text-accent`. Klasė `.dark` ant `<html>` pakeičia visą paletę. Mažas skriptas paleidžiamas dar prieš pirmą piešimą, todėl puslapis niekada nesumirksi ne ta tema.

Pikselių jausmą kuria kelios savos klasės:

- `pixel-border` — rėmelis su „laipteliais“ kampuose, padarytas iš keturių `box-shadow`,
- `crt` — vos matomos skenavimo linijos tamsioje temoje,
- `text-glow` — žalias fosforo švytėjimas antraštėse,
- ikonos, nupieštos kaip teksto tinklelis (`#` — pikselis) ir paverstos ryškiu SVG.

### Diegimas

GitHub Actions darbo eiga įdiegia priklausomybes, patikrina tipus, sukuria svetainę ir paskelbia `dist/` į GitHub Pages. Pull request'ams paleidžiami tie patys patikrinimai ir Prettier formatavimo patikra.

## Sukurta su DI

Visas projektas sukurtas per vieną sesiją su **Claude Code** (T3 Code aplinkoje). Paprastais žodžiais aprašiau, ko noriu, o agentas suplanavo struktūrą, parinko versijas, veikiančias su mano Node.js, parašė komponentus, sukūrė GitHub repozitoriją, Pages ir CI, ir atidarė pull request'ą.

Štai mano užklausos, tokios, kokias parašiau (angliškai):

> Ok in .ai folder I want to create new project. It will be my personal page hosted in github, like cv or more like blog. Can you do all work? Or i will need to make some settings manual?

Agentas atsakė, kad gali padaryti beveik viską. Iš manęs reikėjo tik trijų dalykų: tikrų CV duomenų, sutikimo, kad repozitorija būtų vieša (nemokamam GitHub Pages to reikia), ir DNS nustatymų, jei kada norėsiu savo domeno. Tada:

> Language both, theme dark light, theme should be retro pixel art hacker like. Yes every blog post should be mark down. Note make code look clean use components helpers and etc also i like tailwind. For demo purpose create forst blog post how this page was created technology used and ai for prompts

Ši antra užklausa sukūrė svetainę, kurią dabar skaitote, kartu ir šį įrašą. Trumpos ir netvarkingos užklausos veikė puikiai. Svarbiausia buvo aiškiai pasakyti, ko noriu, o ne kaip tai padaryti.

### Patarimai norintiems pabandyti

1. **Sakykite, ko norite, o ne kaip tai padaryti.** Užteko „retro pixel hacker theme“ — šriftus ir spalvas agentas parinko pats.
2. **Paminėkite savo pageidavimus.** Pasakiau, kad man patinka Tailwind ir tvarkingi komponentai, — tą ir gavau.
3. **Peržiūrėkite pull request'ą.** Kodą rašė DI, bet svetainė vis tiek mano. Skaitydamas pakeitimus sužinau, kas viduje.

## Kas toliau

- Užpildyti CV tikrais duomenimis.
- Rašyti daugiau įrašų apie testų automatizavimą, nuorodų tikrinimą ir DI įrankius.
- Galbūt savas domenas.

Ačiū, kad skaitėte! Išeitinis kodas — [GitHub](https://github.com/ohwelleu/ohwelleu.github.io).
