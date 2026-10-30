---
title: "Markdown test"
description: "Every Markdown feature a post can use, with the source next to the result."
pubDate: 2026-10-30
tags: ["markdown", "test"]
---

This post checks how each Markdown feature looks on this site. Every section shows the **source** first, then the **result**. Copy what you need into a new post.

## Frontmatter

Every post starts with a block like this. `title`, `description` and `pubDate` are required. Set `draft: true` to hide a post outside `npm run dev`.

```yaml
---
title: "Markdown test"
description: "One line shown in lists and search results."
pubDate: 2026-10-30
updatedDate: 2026-11-02 # optional
tags: ["markdown", "test"] # optional
draft: false # optional
---
```

## Headings

`##` starts a numbered section like this one. Use `###` and `####` inside a section. Don't use `#`: the post title is already the page's only `h1`.

```md
### Third level

#### Fourth level
```

### Third level

#### Fourth level

## Text

```md
**Bold**, _italic_, **_bold and italic_**, ~~strikethrough~~ and `inline code`.

HTML works too: <mark>highlight</mark>, <kbd>Ctrl</kbd> + <kbd>C</kbd>,
H<sub>2</sub>O and E = mc<sup>2</sup>.

\*Escaped asterisks\* stay as plain characters.
```

**Bold**, _italic_, **_bold and italic_**, ~~strikethrough~~ and `inline code`.

HTML works too: <mark>highlight</mark>, <kbd>Ctrl</kbd> + <kbd>C</kbd>, H<sub>2</sub>O and E = mc<sup>2</sup>.

\*Escaped asterisks\* stay as plain characters.

## Links

```md
[Inline link](https://github.com/ohwelleu), a bare URL https://ohwelleu.github.io
and a [reference link][gh].

[gh]: https://docs.github.com/pages
```

[Inline link](https://github.com/ohwelleu), a bare URL https://ohwelleu.github.io and a [reference link][gh].

[gh]: https://docs.github.com/pages

## Lists

```md
- Unordered item
- Another item
  - Nested item
  - Another nested item

1. First
2. Second
3. Third

- [x] Done task
- [ ] Open task
```

- Unordered item
- Another item
  - Nested item
  - Another nested item

1. First
2. Second
3. Third

- [x] Done task
- [ ] Open task

## Quotes

```md
> A quote can span several lines
> and contain **formatting**.
>
> > Quotes can be nested.
```

> A quote can span several lines
> and contain **formatting**.
>
> > Quotes can be nested.

## Code blocks

Add the language name after the opening fence to get syntax highlighting.

````md
```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
````

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
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

## Tables

The colons in the separator row set the column alignment.

```md
| Left   | Center | Right |
| :----- | :----: | ----: |
| apples |   3    |  1.20 |
| pears  |   12   |  0.80 |
```

| Left   | Center | Right |
| :----- | :----: | ----: |
| apples |   3    |  1.20 |
| pears  |   12   |  0.80 |

## Images

Put image files in `public/` and link them from the site root.

```md
![Site icon](/favicon.svg)
```

![Site icon](/favicon.svg)

## Divider

```md
---
```

---

## Collapsible block

<!-- prettier-ignore -->
```html
<details>
  <summary>Click to expand</summary>

Hidden content, with **Markdown** inside.

</details>
```

<details>
  <summary>Click to expand</summary>

Hidden content, with **Markdown** inside.

</details>

## Footnotes

```md
A sentence with a footnote.[^1]

[^1]: The footnote text appears at the bottom of the post.
```

A sentence with a footnote.[^1]

[^1]: The footnote text appears at the bottom of the post.
