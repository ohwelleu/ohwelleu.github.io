import type { IconName } from "@/components/ui/icons";
import type { UiKey } from "@/i18n/ui";

export interface NavItem {
  key: UiKey;
  path: string;
  /** Show an icon instead of the text; the text stays as an accessible label. */
  icon?: IconName;
}

export const navItems: NavItem[] = [
  { key: "nav.home", path: "/", icon: "home" },
  { key: "nav.blog", path: "/blog" },
  { key: "nav.game", path: "/game" },
];
