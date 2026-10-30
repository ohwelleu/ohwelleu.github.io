---
title: "Trys užklausos ir vienas persigalvojimas"
description: "Vakare — tuščias aplankas, tą pačią naktį — veikiantis dvikalbis blogas. Parašiau tris užklausas. Visa kita padarė DI agentas — įskaitant pirmąjį dizainą, kurį išmečiau."
pubDate: 2026-10-30
tags: ["di", "claude-code", "github-pages", "procesas"]
---

Šis puslapis per vieną vakarą virto iš tuščio aplanko į veikiantį dvikalbį blogą. Kodo nerašiau. Parašiau tris užklausas — trumpas, su klaidomis, pusė jų ne ta kalba — o [Claude Code](https://claude.com/claude-code), veikiantis T3 Code aplinkoje, padarė visa kita: parinko įrankius, parašė komponentus, sukūrė GitHub repozitoriją, sukonfigūravo publikavimą ir atidarė pull request'us, kuriuos turėjau peržiūrėti.

Tai sąžiningas žurnalas, kaip viskas vyko. Įskaitant momentą, kai pažiūrėjau į rezultatą ir paprašiau visai ko kito.

## „Ar gali padaryti viską?“

Pirmoji užklausa buvo klausimas, o ne specifikacija:

> Ok in .ai folder I want to create new project. It will be my personal page hosted in github, like cv or more like blog. Can you do all work? Or i will need to make some settings manual?

Atsakymas buvo stebėtinai konkretus. Beveik viską galima automatizuoti — mano GitHub CLI jau buvo prisijungęs su reikiamomis teisėmis. Manęs reikėjo tik trims dalykams:

1. **Turiniui.** Agentas niekaip negalėjo žinoti mano darbo patirties — ir taip ir pasakė, užuot ją išsigalvojęs.
2. **Viešai repozitorijai.** Nemokamame GitHub plane Pages veikia tik su viešomis repozitorijomis.
3. **DNS**, bet tik jei kada norėsiu savo domeno.

Tada uždavė keturis klausimus — adresas, karkasas, išvaizda, kalba — prie kiekvieno su rekomenduojamu variantu. Tą akimirką nustojau abejoti, ar tai pavyks.

## Specifikacija vienu atodūsiu

> Language both, theme dark light, theme should be retro pixel art hacker like. Yes every blog post should be mark down. Note make code look clean use components helpers and etc also i like tailwind. For demo purpose create forst blog post how this page was created technology used and ai for prompts

Ką gavau:

- svetainę anglų ir lietuvių kalbomis, su kalbos perjungikliu, kuris palieka tame pačiame puslapyje;
- neoninę žalią ant juodo, CRT skenavimo linijas, mirksintį kursorių, pikselinį _Press Start 2P_ šriftą;
- kiekvieną įrašą kaip Markdown failą, tikrinamą pagal schemą kūrimo metu;
- GitHub Actions eigą, kuri po kiekvieno `push` patikrina tipus, sukuria svetainę ir ją paskelbia.

Įdomiausia buvo ne rezultatas, o sprendimai pakeliui. Naujausiai karkaso versijai reikėjo naujesnio Node.js nei mano kompiuteryje, tad agentas pasirinko ankstesnę pagrindinę versiją, užuot gadinęs mano aplinką, — ir tada paleido tipų tikrinimą su naujesniu Node, kad įrodytų, jog kodas švarus. Prieš atidarydamas pull request'ą jis paleido svetainę lokaliai, perėjo ją naršykle be ekrano, padarė ekrano nuotraukas abiem temomis ir telefono dydžio ekrane, paspaudė temos ir kalbos jungiklius, kad įsitikintų, jog jie tikrai veikia.

Dar jis pažymėjo trūkumą, apie kurį niekas neklausė: pikseliniame šrifte nėra raidės **ų**. Dvikalbėje svetainėje tai ne smulkmena.

Sujungiau. Buvo smagu. Ir atrodė lygiai taip pat, kaip kiekvienas kitas retro terminalo portfolio internete.

## Persigalvojimas

> https://www.contentarchitecture.dev/?ref=onepagelove naudok geriau toki stilių, pašalink astro ir pan pašalink emai nerašk lėkštai, cv dali išvis pašalink kolkas tbd

Viena nuoroda padarė daugiau nei visa mano ankstesnė būdvardžių pastraipa. Agentas atsidarė pavyzdį naršyklėje be ekrano, nufotografavo jį dalimis ir tiesiai iš puslapio nuskaitė apskaičiuotus stilius: šriftų šeimas, dydžius, storius, spalvas. Tada perstatė visą dizaino sistemą pagal tai, ką rado:

- šiltas popieriaus fonas, beveik juodas rašalas ir viena oranžinė spalva, naudojama taupiai;
- **Geist** skaitymui, **Geist Mono** mažomis didžiosiomis raidėmis — etiketėms, datoms ir numeriams;
- numeruotos sekcijos — `01 /` — vietoj dekoracijų;
- plaukiojanti, visada tamsi navigacija su slenkančiu naujausio įrašo pavadinimu;
- lėtai besisukantys teksto žiedai ten, kur anksčiau buvo pikseliai.

CV puslapio neliko, kol neturiu ką ten tikro įdėti. Neliko ir išgalvoto el. pašto adreso. O tekstai — įskaitant šį įrašą — perrašyti nuo nulio, nes „kuriu dalykus internetui“ apie nieką nieko nepasako.

## Kas viduje

Technologijos sąmoningai nuobodžios — kad įdomus būtų turinys.

### Įrašai — Markdown failai

Kiekvienas įrašas gyvena `src/content/blog/<kalba>/<slug>.md`, o vertimas — tiesiog tas pats failo pavadinimas kitos kalbos aplanke. Antraštės duomenys tikrinami pagal schemą, todėl klaida datoje sustabdo kūrimą, o ne tyliai sugadina puslapį:

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

### Vienas žodynas kiekvienai kalbai

Visi sąsajos tekstai — viename tipizuotame faile. Pamiršai išversti raktą — TypeScript praneša anksčiau, nei tai pamato lankytojas:

```ts
const t = useTranslations(lang);
t("hero.cta"); // "Read the blog" / "Skaityti blogą"
```

### Temos — tik CSS kintamieji

Visa paletė — septyni CSS kintamieji. Klasė `.dark` pakeičia juos visus, o kadangi tai tik klasė, ją gali nešioti bet kuris elementas. Taip navigacija ir skydelis su teksto žiedais lieka tamsūs net šviesioje temoje: jie patys „apsirengę“ tamsiąja tema. Mažas skriptas dar prieš pirmą piešimą parenka išsaugotą temą, todėl puslapis niekada nesumirksi.

### Publikavimas — vienas pull request'as

Pull request'ams paleidžiamas formatavimo patikrinimas, tipų tikrinimas ir pilnas kūrimas. Sujungus į `main`, svetainė paskelbiama GitHub Pages. Jokių serverių, jokių sąskaitų.

## Ką patarčiau, jei bandysite patys

1. **Rodykite, o ne apibūdinkite.** „Retro pixel hacker theme“ davė tiksliai tai, ko prašiau. Nuoroda į patikusią svetainę davė tai, ko norėjau.
2. **Trumpos užklausos — gerai.** Manosios buvo su klaidomis ir keitė kalbą sakinio viduryje. Svarbu buvo pasakyti, _ko_ noriu, o ne _kaip_ tai padaryti.
3. **Išmesti darbą dabar pigu.** Visą pirmąjį dizainą pakeisti užteko vieno sakinio. Tai keičia, kiek drąsiai bandai.
4. **Skaitykite pakeitimus.** Kodą rašė agentas, bet svetainė vis tiek mano. Peržiūrėdamas pull request'ą žinau, kas iš tikrųjų viduje.

Išeitinis kodas — [GitHub](https://github.com/ohwelleu/ohwelleu.github.io), kartu su pull request'ais, tad galite perskaityti, ką tiksliai parašė agentas ir ką paprašiau pakeisti.
