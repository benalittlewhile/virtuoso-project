import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      transitionProperty: { width: "width" },
    },
  },

  plugins: [],
} as Config;
