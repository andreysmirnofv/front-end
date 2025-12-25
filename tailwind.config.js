module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "backgroundlight-grey": "var(--backgroundlight-grey)",
        brandprimary: "var(--brandprimary)",
        "brandtext-primary": "var(--brandtext-primary)",
        "characterdisabled-placeholder-25":
          "var(--characterdisabled-placeholder-25)",
        "dark-grey": "var(--dark-grey)",
        "karirlab-purple": "var(--karirlab-purple)",
        "medium-grey": "var(--medium-grey)",
        "text-color": "var(--text-color)",
        "text-gray": "var(--text-gray)",
        textprimary: "var(--textprimary)",
        white: "var(--white)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "body-regular": "var(--body-regular-font-family)",
        "body-small": "var(--body-small-font-family)",
        "button-text-button": "var(--button-text-button-font-family)",
        "desktop-body-small-regular":
          "var(--desktop-body-small-regular-font-family)",
        "text-text-bold-text-sm-bold":
          "var(--text-text-bold-text-sm-bold-font-family)",
        "text-text-reguler-text-sm":
          "var(--text-text-reguler-text-sm-font-family)",
        "text-text-reguler-text-xs":
          "var(--text-text-reguler-text-xs-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: { "card-shadow": "var(--card-shadow)" },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
