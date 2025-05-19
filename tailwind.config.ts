// tailwind.config.ts
import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./app/**/*.{ts,tsx}",    // Adjust paths according to your project structure
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
