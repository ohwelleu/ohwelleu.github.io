/** Accent colours the picker cycles through; the first is the default.
    Each name maps to a `[data-accent]` palette in global.css. */
export const accents = ["orange", "purple", "green", "blue"] as const;

export type Accent = (typeof accents)[number];
