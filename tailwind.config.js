/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111111",
        primary: {
          DEFAULT: "#1D92ED",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#414141",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f5f7fa",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#1D92ED",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        error: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "#E7E7E7",
        input: "#e8e8eb",
        ring: "#93c5fd",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#111111",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#111111",
        },
        chart: {
          1: "#1D92ED",
          2: "#60a5fa",
          3: "#93c5fd",
          4: "#bfdbfe",
          5: "#dbeafe",
        },
        // Custom color aliases for auth UI
        bluenormal: "#1D92ED",
        blackblack: {
          DEFAULT: "#000000",
          50: "#E5E5E5",
          100: "#CCCCCC",
          200: "#999999",
          300: "#666666",
          400: "#707070",
          500: "#242424",
          600: "#1A1A1A",
          700: "#111111",
          800: "#0A0A0A",
          900: "#000000",
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular", "system-ui", "sans-serif"],
        medium: ["Inter_500Medium", "system-ui", "sans-serif"],
        semibold: ["Inter_600SemiBold", "system-ui", "sans-serif"],
        bold: ["Inter_700Bold", "system-ui", "sans-serif"],
        mono: ["monospace"],
      },
      borderRadius: {
        xl: "14px",
        lg: "12px",
        base: "10px",
        md: "8px",
        sm: "6px",
      },
    },
  },
  plugins: [],
}
