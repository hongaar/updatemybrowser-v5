// Font configuration with better fallbacks for offline builds
import { Fira_Sans, Courgette } from "next/font/google";

export const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-text",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    "sans-serif",
  ],
});

export const courgette = Courgette({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  fallback: ["cursive", "fantasy", "sans-serif"],
});
