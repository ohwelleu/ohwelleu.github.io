export interface Link {
  label: string;
  href: string;
}

export const profile = {
  name: "Karolis",
  handle: "ohwelleu",
  links: [
    { label: "GitHub", href: "https://github.com/ohwelleu" },
  ] satisfies Link[],
};
