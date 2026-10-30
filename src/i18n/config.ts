export const languages = {
  en: "English",
  lt: "Lietuvių",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

export const locales = Object.keys(languages) as Lang[];

/** BCP 47 tags used for <html lang> and date formatting. */
export const localeTags: Record<Lang, string> = {
  en: "en-GB",
  lt: "lt-LT",
};
