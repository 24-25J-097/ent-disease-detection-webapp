// import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const { parseColor } = require("tailwindcss/lib/util/color");
const withMT = require("@material-tailwind/react/utils/withMT");

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/styles/**/*.{css,scss}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        theme: {
          1: "rgb(var(--color-theme-1) / <alpha-value>)",
          2: "rgb(var(--color-theme-2) / <alpha-value>)",
        },
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        pending: "rgb(var(--color-pending) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        darkmode: {
          50: "rgb(var(--color-darkmode-50) / <alpha-value>)",
          100: "rgb(var(--color-darkmode-100) / <alpha-value>)",
          200: "rgb(var(--color-darkmode-200) / <alpha-value>)",
          300: "rgb(var(--color-darkmode-300) / <alpha-value>)",
          400: "rgb(var(--color-darkmode-400) / <alpha-value>)",
          500: "rgb(var(--color-darkmode-500) / <alpha-value>)",
          600: "rgb(var(--color-darkmode-600) / <alpha-value>)",
          700: "rgb(var(--color-darkmode-700) / <alpha-value>)",
          800: "rgb(var(--color-darkmode-800) / <alpha-value>)",
          900: "rgb(var(--color-darkmode-900) / <alpha-value>)",
        },
        black: {
          DEFAULT: "#000",
          100: "#000319",
          200: "rgba(17, 25, 40, 0.75)",
          300: "rgba(255, 255, 255, 0.125)",
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
      container: {
        center: true,
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5,
      },
      backgroundImage: {
        "chevron-white":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff95' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
        "chevron-black":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300000095' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
        "file-icon-empty-directory":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='786' height='786' viewBox='0 0 786 786'%3E%3Cdefs%3E%3ClinearGradient id='linear-gradient' x1='0.5' x2='0.5' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%238a97ac'/%3E%3Cstop offset='1' stop-color='%235d6c83'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Group_2' data-name='Group 2' transform='translate(-567 -93)'%3E%3Crect id='Rectangle_4' data-name='Rectangle 4' width='418' height='681' rx='40' transform='translate(896 109)' fill='%2395a5b9'/%3E%3Crect id='Rectangle_3' data-name='Rectangle 3' width='433' height='681' rx='40' transform='translate(606 93)' fill='%23a0aec0'/%3E%3Crect id='Rectangle_2' data-name='Rectangle 2' width='786' height='721' rx='40' transform='translate(567 158)' fill='url(%23linear-gradient)'/%3E%3C/g%3E%3C/svg%3E%0A\")",
        "file-icon-directory":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='786' height='786' viewBox='0 0 786 786'%3E%3Cdefs%3E%3ClinearGradient id='linear-gradient' x1='0.5' x2='0.5' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%238a97ac'/%3E%3Cstop offset='1' stop-color='%235d6c83'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Group_3' data-name='Group 3' transform='translate(-567 -93)'%3E%3Crect id='Rectangle_4' data-name='Rectangle 4' width='418' height='681' rx='40' transform='translate(896 109)' fill='%2395a5b9'/%3E%3Crect id='Rectangle_3' data-name='Rectangle 3' width='433' height='681' rx='40' transform='translate(606 93)' fill='%23a0aec0'/%3E%3Crect id='Rectangle_2' data-name='Rectangle 2' width='742' height='734' rx='40' transform='translate(590 145)' fill='%23bec8d9'/%3E%3Crect id='Rectangle_5' data-name='Rectangle 5' width='786' height='692' rx='40' transform='translate(567 187)' fill='url(%23linear-gradient)'/%3E%3C/g%3E%3C/svg%3E%0A\")",
        "file-icon-file":
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='628.027' height='786.012' viewBox='0 0 628.027 786.012'%3E%3Cdefs%3E%3ClinearGradient id='linear-gradient' x1='0.5' x2='0.5' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%238a97ac'/%3E%3Cstop offset='1' stop-color='%235d6c83'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Group_5' data-name='Group 5' transform='translate(-646 -92.988)'%3E%3Cpath id='Union_2' data-name='Union 2' d='M40,786A40,40,0,0,1,0,746V40A40,40,0,0,1,40,0H501V103h29v24h98V746a40,40,0,0,1-40,40Z' transform='translate(646 93)' fill='url(%23linear-gradient)'/%3E%3Cpath id='Intersection_2' data-name='Intersection 2' d='M.409,162.042l.058-109.9c31.605,29.739,125.37,125.377,125.37,125.377l-109.976.049A20.025,20.025,0,0,1,.409,162.042Z' transform='translate(1147 42)' fill='%23bec8d9' stroke='%23bec8d9' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E%0A\")",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/forms'),
    plugin(function ({ addBase }:any) {
      addBase({
        // Default colors
        ":root": colorThemes["default"],
        // Default dark-mode colors
        ".dark": {
          "--color-primary": toRGB(colors.blue["700"]),
          "--color-darkmode-50": "87 103 132",
          "--color-darkmode-100": "74 90 121",
          "--color-darkmode-200": "65 81 114",
          "--color-darkmode-300": "53 69 103",
          "--color-darkmode-400": "48 61 93",
          "--color-darkmode-500": "41 53 82",
          "--color-darkmode-600": "40 51 78",
          "--color-darkmode-700": "35 45 69",
          "--color-darkmode-800": "27 37 59",
          "--color-darkmode-900": "15 23 42",
        },
        ...colorThemes,
      });
    }),
  ],
  variants: {
    extend: {
      boxShadow: ["dark"],
    },
  },
};

const toRGB = (value: any) => {
  return parseColor(value).color.join(" ");
};

const colorThemes = {
  "default": {
    "--color-theme-1": toRGB("#1C352D"), //Medium Jungle green
    "--color-theme-2": toRGB("#4FFFB0"), // Bright Mint
    "--color-primary": toRGB("#4FFFB0"), // Bright Mint
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#4FFFB0"), // Bright Mint
    "--color-info": toRGB("#BFFF00"), // Bitter Lime
    "--color-warning": toRGB("#FFFF66"), // Light Yellow (to complement the palette)
    "--color-pending": toRGB("#FFCC99"), // Light Orange (to complement the palette)
    "--color-danger": toRGB("#FF6666"), // Light Red (to complement the palette)
    "--color-light": toRGB("#ffffff"), // White
    "--color-dark": toRGB("#4FFFB0"), // Bright Mint (you can adjust if needed)
  },
  ".classic-elegant": {
    "--color-theme-1": toRGB("#2c3e50"), // Navy Blue
    "--color-theme-2": toRGB("#f1c40f"), // Gold
    "--color-primary": toRGB("#2c3e50"), // Navy Blue
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#27ae60"), // Emerald Green
    "--color-info": toRGB("#3498db"), // Cyan Blue
    "--color-warning": toRGB("#f1c40f"), // Gold
    "--color-pending": toRGB("#e67e22"), // Amber
    "--color-danger": toRGB("#e74c3c"), // Rose Red
    "--color-light": toRGB("#ecf0f1"), // Light Gray
    "--color-dark": toRGB("#2c3e50"), // Navy Blue
    "&.dark": {
      "--color-primary": toRGB("#34495e"), // Darker Navy Blue
    },
  },
  ".modern-clean": {
    "--color-theme-1": toRGB("#1abc9c"), // Teal
    "--color-theme-2": toRGB("#F1F9EC"), // Peppermint
    "--color-primary": toRGB("#1abc9c"), // Teal
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#27ae60"), // Emerald Green
    "--color-info": toRGB("#3498db"), // Cyan Blue
    "--color-warning": toRGB("#f39c12"), // Yellow
    "--color-pending": toRGB("#e67e22"), // Amber
    "--color-danger": toRGB("#e74c3c"), // Rose Red
    "--color-light": toRGB("#bdc3c7"), // Light Gray
    "--color-dark": toRGB("#34495e"), // Dark Gray
    "&.dark": {
      "--color-primary": toRGB("#16a085"), // Darker Teal
    },
  },
  ".minimalist-professional": {
    "--color-theme-1": toRGB("#000000"), // Black
    "--color-theme-2": toRGB("#ffffff"), // White
    "--color-primary": toRGB("#000000"), // Black
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#27ae60"), // Emerald Green
    "--color-info": toRGB("#3498db"), // Cyan Blue
    "--color-warning": toRGB("#f1c40f"), // Gold
    "--color-pending": toRGB("#e67e22"), // Amber
    "--color-danger": toRGB("#e74c3c"), // Rose Red
    "--color-light": toRGB("#f8f9fa"), // Light Gray
    "--color-dark": toRGB("#000000"), // Black
    "&.dark": {
      "--color-primary": toRGB("#2c3e50"), // Darker Navy Blue
    },
  },
  ".fresh-vibrant": {
    "--color-theme-1": toRGB("#27ae60"), // Green
    "--color-theme-2": toRGB("#2980b9"), // Blue
    "--color-primary": toRGB("#27ae60"), // Green
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#27ae60"), // Emerald Green
    "--color-info": toRGB("#3498db"), // Cyan Blue
    "--color-warning": toRGB("#f39c12"), // Yellow
    "--color-pending": toRGB("#e67e22"), // Amber
    "--color-danger": toRGB("#e74c3c"), // Rose Red
    "--color-light": toRGB("#ecf0f1"), // Light Gray
    "--color-dark": toRGB("#2980b9"), // Blue
    "&.dark": {
      "--color-primary": toRGB("#16a085"), // Darker Green
    },
  },
  ".warm-inviting": {
    "--color-theme-1": toRGB("#8e44ad"), // Burgundy
    "--color-theme-2": toRGB("#f5b041"), // Cream
    "--color-primary": toRGB("#8e44ad"), // Burgundy
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#27ae60"), // Emerald Green
    "--color-info": toRGB("#3498db"), // Cyan Blue
    "--color-warning": toRGB("#f39c12"), // Yellow
    "--color-pending": toRGB("#e67e22"), // Amber
    "--color-danger": toRGB("#e74c3c"), // Rose Red
    "--color-light": toRGB("#f7f9f9"), // Light Beige
    "--color-dark": toRGB("#8e44ad"), // Burgundy
    "&.dark": {
      "--color-primary": toRGB("#7d3c98"), // Darker Burgundy
    },
  },
  ".royal-elegance": {
    "--color-theme-1": toRGB("#893BFF"), // Aztech Purple
    "--color-theme-2": toRGB("#ffffff"), // White
    "--color-primary": toRGB("#893BFF"), // Aztech Purple
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#27ae60"), // Emerald Green
    "--color-info": toRGB("#3498db"), // Cyan Blue
    "--color-warning": toRGB("#f39c12"), // Yellow
    "--color-pending": toRGB("#e67e22"), // Amber
    "--color-danger": toRGB("#e74c3c"), // Rose Red
    "--color-light": toRGB("#f7f9f9"), // Light Beige
    "--color-dark": toRGB("#893BFF"), // Aztech Purple
    "&.dark": {
      "--color-primary": toRGB("#6F2DBD"), // Darker Aztech Purple
    },
  },
  ".blue-serenity": {
    "--color-theme-1": toRGB("#ADD8E6"), // Light Blue
    "--color-theme-2": toRGB("#00008B"), // Dark Blue
    "--color-primary": toRGB("#00008B"), // Dark Blue
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#32CD32"), // Lime Green
    "--color-info": toRGB("#4682B4"), // Steel Blue
    "--color-warning": toRGB("#FFD700"), // Gold
    "--color-pending": toRGB("#FFA07A"), // Light Salmon
    "--color-danger": toRGB("#FF4500"), // Orange Red
    "--color-light": toRGB("#F0F8FF"), // Alice Blue
    "--color-dark": toRGB("#00008B"), // Dark Blue
    "&.dark": {
      "--color-primary": toRGB("#000080"), // Navy
    },
  },
  ".midnight-blue": {
    "--color-theme-1": toRGB("#191970"), // Midnight Blue
    "--color-theme-2": toRGB("#1E90FF"), // Dodger Blue
    "--color-primary": toRGB("#191970"), // Midnight Blue
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#32CD32"), // Lime Green
    "--color-info": toRGB("#4682B4"), // Steel Blue
    "--color-warning": toRGB("#FFD700"), // Gold
    "--color-pending": toRGB("#FFA07A"), // Light Salmon
    "--color-danger": toRGB("#FF4500"), // Orange Red
    "--color-light": toRGB("#F0F8FF"), // Alice Blue
    "--color-dark": toRGB("#191970"), // Midnight Blue
    "&.dark": {
      "--color-primary": toRGB("#000080"), // Navy
    },
  },
  ".sunset-glow": {
    "--color-theme-1": toRGB("#FFA500"), // Orange
    "--color-theme-2": toRGB("#002244"), // Broncos Blue
    "--color-primary": toRGB("#FFA500"), // Orange
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#32CD32"), // Lime Green
    "--color-info": toRGB("#4682B4"), // Steel Blue
    "--color-warning": toRGB("#FFD700"), // Gold
    "--color-pending": toRGB("#FFA07A"), // Light Salmon
    "--color-danger": toRGB("#FF4500"), // Orange Red
    "--color-light": toRGB("#FFF8DC"), // Cornsilk
    "--color-dark": toRGB("#FF8C00"), // Dark Orange
    "&.dark": {
      "--color-primary": toRGB("#FF7F50"), // Coral
    },
  },
  ".tiger-sunset": {
    "--color-theme-1": toRGB("#F96815"), // Tiger Orange
    "--color-theme-2": toRGB("#F0F8FF"), // Alice Blue
    "--color-primary": toRGB("#FF8C00"), // Dark Orange
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#32CD32"), // Lime Green
    "--color-info": toRGB("#4682B4"), // Steel Blue
    "--color-warning": toRGB("#FFD700"), // Gold
    "--color-pending": toRGB("#FFA07A"), // Light Salmon
    "--color-danger": toRGB("#FF4500"), // Orange Red
    "--color-light": toRGB("#F0F8FF"), // Alice Blue
    "--color-dark": toRGB("#CD5C5C"), // Indian Red (a darker variant to complement)
    "&.dark": {
      "--color-primary": toRGB("#FF7F50"), // Coral
    },
  },
  ".forest-breeze": {
    "--color-theme-1": toRGB("#98FF98"), // Pale Green
    "--color-theme-2": toRGB("#1A2421"), // Dark Jungle Green
    "--color-primary": toRGB("#98FF98"), // Pale Green
    "--color-secondary": toRGB("#ffffff"), // White
    "--color-success": toRGB("#32CD32"), // Lime Green
    "--color-info": toRGB("#40E0D0"), // Turquoise
    "--color-warning": toRGB("#FFD700"), // Gold
    "--color-pending": toRGB("#FFA07A"), // Light Salmon
    "--color-danger": toRGB("#FF6347"), // Tomato
    "--color-light": toRGB("#E0FFFF"), // Light Cyan
    "--color-dark": toRGB("#2F4F4F"), // Dark Slate Gray
    "&.dark": {
      "--color-primary": toRGB("#7FFF00"), // Chartreuse
    },
  },
};

export default withMT(config);
