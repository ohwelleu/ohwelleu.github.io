import { defaultLang, localeTags, locales, type Lang } from "./config";
import { ui, type UiKey } from "./ui";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (locales as string[]).includes(value);
}

/** Reads the language from the first URL segment, e.g. `/lt/blog` → `lt`. */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split("/");
  return isLang(segment) ? segment : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** Builds a path for the given language, e.g. `localizePath("lt", "/blog")` → `/lt/blog/`. */
export function localizePath(lang: Lang, path = "/"): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** Swaps the language segment of the current path, keeping the rest. */
export function switchLangPath(url: URL, target: Lang): string {
  const [, , ...rest] = url.pathname.split("/");
  return localizePath(target, rest.join("/"));
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(localeTags[lang], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Static paths for every `[lang]` route. */
export function langStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
