import type { UiKey } from "@/i18n/ui";

export interface NavItem {
  key: UiKey;
  path: string;
}

export const navItems: NavItem[] = [
  { key: "nav.home", path: "/" },
  { key: "nav.blog", path: "/blog" },
  { key: "nav.cv", path: "/cv" },
];
