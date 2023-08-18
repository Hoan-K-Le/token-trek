import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white100: "#ffffff",
        green200: "#00FC2A",
        slate700: "#2C2F36",
        slate800: "#1F2128",
        slate900: "#191b1f",
      },
    },
  },
  plugins: [],
};
export default config;
