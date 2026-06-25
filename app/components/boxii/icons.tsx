/**
 * icons.tsx — the widget's icon set, backed by lucide-react.
 *
 * The boxii-mvp widget renders Font Awesome glyphs via Web Awesome's <wa-icon>.
 * Here we keep the stack unchanged (no Web Awesome) and map the same internal
 * names onto lucide-react icons, sized to the original .sN pixel sizes.
 */

import {
  ArrowRight,
  Calendar,
  LogIn,
  Menu,
  Newspaper,
  Search,
  X,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "search"
  | "newspaper"
  | "arrow-right"
  | "x"
  | "menu"
  | "calendar"
  | "login";

const ICONS: Record<IconName, LucideIcon> = {
  search: Search,
  newspaper: Newspaper,
  "arrow-right": ArrowRight,
  x: X,
  menu: Menu,
  calendar: Calendar,
  login: LogIn,
};

// Maps the original wa-icon size classes onto pixel sizes.
const SIZES: Record<string, number> = {
  s3: 12,
  "s3-5": 14,
  s4: 16,
  s5: 20,
  s6: 24,
};

export function Icon({
  name,
  size = "s4",
  className = "",
}: {
  name: IconName;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const Cmp = ICONS[name];
  return (
    <Cmp
      size={SIZES[size]}
      className={`icon ${className}`}
      aria-hidden="true"
      strokeWidth={2}
    />
  );
}
