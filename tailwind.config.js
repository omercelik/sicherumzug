/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.md",
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./_services/**/*.md",
    "./_guides/**/*.md",
    "./_districts/**/*.md",
    "./content/**/*.md",
    "./assets/js/**/*.js",
    "./_posts/**/*.md"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Legacy colors mapped to new Nordic Slate & Crimson Signal branding for safe migration
        primary: {
          DEFAULT: "#2F3B45", // Nordic Slate replacing old dark green
          light: "#3A4A57",   // Lighter slate
          button: "#C62839",  // Buttons use Crimson Signal
          accent: "#C62839"   // Uses Crimson Signal for WCAG AA 4.5:1 contrast on light backgrounds
        },
        content: {
          accent: "#C62839",
          light: "#3A4A57"
        },
        "background-light": "#F7F8FA",
        "background-dark": "#1F2933",
        "text-light": "#4B5563",
        "text-dark": "#F7F8FA",

        // New explicit design system tokens
        nordic: {
          DEFAULT: "#2F3B45",
          light: "#3A4A57",
          dark: "#1F2933",
        },
        crimson: {
          DEFAULT: "#C62839",
          hover: "#A3212F",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          background: "#F7F8FA",
        }
      },
      fontFamily: {
        display: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Roboto", "sans-serif"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ]
};
