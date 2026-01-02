// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{ts,tsx}"],
    theme: {
        screens: {
            xs: '375px',   // Small phones (iPhone SE / mini)
            sm: '640px',   // Large phones / small tablets (landscape)
            md: '768px',   // Tablets
            lg: '1024px',  // Small desktops
            xl: '1280px',  // Regular desktops
            '2xl': '1440px', // Design baseline for 1920px layouts
        },
        extend: {},
    },
};

export default config;
