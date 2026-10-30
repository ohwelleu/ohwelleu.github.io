---
title: "Markdown testas"
description: "Visos Markdown galimybės, kurias galima naudoti įraše: šaltinis ir rezultatas greta."
pubDate: 2026-10-30
tags: ["markdown", "testas"]
---

Šis įrašas tikrina, kaip kiekviena Markdown galimybė atrodo šioje svetainėje. Kiekviena sekcija pirmiausia rodo **šaltinį**, tada **rezultatą**. Kopijuokite, ko reikia, į naują įrašą.

## Antraštės duomenys (frontmatter)

Kiekvienas įrašas prasideda tokiu bloku. `title`, `description` ir `pubDate` privalomi. Nustačius `draft: true`, įrašas matomas tik paleidus `npm run dev`.

```yaml
---
title: "Markdown testas"
description: "Viena eilutė, rodoma sąrašuose ir paieškoje."
pubDate: 2026-10-30
updatedDate: 2026-11-02 # nebūtina
tags: ["markdown", "testas"] # nebūtina
draft: false # nebūtina
---
```

## Antraštės

`##` pradeda numeruotą sekciją, kaip ši. Sekcijos viduje naudokite `###` ir `####`. `#` nenaudokite: įrašo pavadinimas jau yra vienintelis puslapio `h1`.

```md
### Trečias lygis

#### Ketvirtas lygis
```

### Trečias lygis

#### Ketvirtas lygis

## Tekstas

```md
**Paryškintas**, _pasviręs_, **_abu kartu_**, ~~perbrauktas~~ ir `kodas eilutėje`.

Veikia ir HTML: <mark>pažymėta</mark>, <kbd>Ctrl</kbd> + <kbd>C</kbd>,
H<sub>2</sub>O ir E = mc<sup>2</sup>.

\*Išvengtos žvaigždutės\* lieka paprastais simboliais.
```

**Paryškintas**, _pasviręs_, **_abu kartu_**, ~~perbrauktas~~ ir `kodas eilutėje`.

Veikia ir HTML: <mark>pažymėta</mark>, <kbd>Ctrl</kbd> + <kbd>C</kbd>, H<sub>2</sub>O ir E = mc<sup>2</sup>.

\*Išvengtos žvaigždutės\* lieka paprastais simboliais.

## Nuorodos

```md
[Nuoroda tekste](https://github.com/ohwelleu), plikas adresas https://ohwelleu.github.io
ir [nuoroda pagal žymę][gh].

[gh]: https://docs.github.com/pages
```

[Nuoroda tekste](https://github.com/ohwelleu), plikas adresas https://ohwelleu.github.io ir [nuoroda pagal žymę][gh].

[gh]: https://docs.github.com/pages

## Sąrašai

```md
- Punktas
- Kitas punktas
  - Įdėtas punktas
  - Dar vienas įdėtas punktas

1. Pirmas
2. Antras
3. Trečias

- [x] Atlikta užduotis
- [ ] Neatlikta užduotis
```

- Punktas
- Kitas punktas
  - Įdėtas punktas
  - Dar vienas įdėtas punktas

1. Pirmas
2. Antras
3. Trečias

- [x] Atlikta užduotis
- [ ] Neatlikta užduotis

## Citatos

```md
> Citata gali būti per kelias eilutes
> ir turėti **formatavimą**.
>
> > Citatas galima dėti vieną į kitą.
```

> Citata gali būti per kelias eilutes
> ir turėti **formatavimą**.
>
> > Citatas galima dėti vieną į kitą.

## Kodo blokai

Po atidarančių kabučių įrašykite kalbos pavadinimą, kad kodas būtų spalvinamas.

````md
```ts
export function greet(name: string): string {
  return `Labas, ${name}!`;
}
```
````

```ts
export function greet(name: string): string {
  return `Labas, ${name}!`;
}
```

```bash
npm install
npm run dev
```

```json
{ "name": "ohwelleu.github.io", "private": true }
```

```css
.card {
  border-radius: 0.75rem;
  color: var(--fg);
}
```

```diff
- const theme = "retro";
+ const theme = "editorial";
```

## Lentelės

Dvitaškiai skiriamojoje eilutėje nustato stulpelio lygiavimą.

```md
| Kairė    | Centras | Dešinė |
| :------- | :-----: | -----: |
| obuoliai |    3    |   1,20 |
| kriaušės |   12    |   0,80 |
```

| Kairė    | Centras | Dešinė |
| :------- | :-----: | -----: |
| obuoliai |    3    |   1,20 |
| kriaušės |   12    |   0,80 |

## Paveikslėliai

Paveikslėlius dėkite į `public/` aplanką ir nurodykite kelią nuo svetainės šaknies.

```md
![Svetainės ikona](/favicon.svg)
```

![Svetainės ikona](/favicon.svg)

## Skirtukas

```md
---
```

---

## Išskleidžiamas blokas

<!-- prettier-ignore -->
```html
<details>
  <summary>Spustelėkite, kad išskleistumėte</summary>

Paslėptas turinys, su **Markdown** viduje.

</details>
```

<details>
  <summary>Spustelėkite, kad išskleistumėte</summary>

Paslėptas turinys, su **Markdown** viduje.

</details>

## Išnašos

```md
Sakinys su išnaša.[^1]

[^1]: Išnašos tekstas rodomas įrašo apačioje.
```

Sakinys su išnaša.[^1]

[^1]: Išnašos tekstas rodomas įrašo apačioje.
