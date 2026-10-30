/**
 * Pixel-art icons drawn as text grids: `#` is a filled pixel, `.` is empty.
 * Rendered by <PixelIcon />.
 */
export const icons = {
  sun: [
    "...#...",
    ".#...#.",
    "..###..",
    "#.###.#",
    "..###..",
    ".#...#.",
    "...#...",
  ],
  moon: [
    "..####.",
    ".##....",
    "##.....",
    "##.....",
    "##.....",
    ".##....",
    "..####.",
  ],
  arrowRight: ["...#...", "....#..", "#######", "....#..", "...#..."],
  arrowLeft: ["...#...", "..#....", "#######", "..#....", "...#..."],
  heart: [".##.##.", "#######", "#######", ".#####.", "..###..", "...#..."],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof icons;
