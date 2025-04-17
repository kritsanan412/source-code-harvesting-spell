import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ✅ ตั้งค่า base เป็นชื่อ repo (ใช้สำหรับ GitHub Pages)
const repoName = "wang-tour-web"; // เปลี่ยนชื่อ repo ของคุณตรงนี้

export default defineConfig(({ mode }) => ({
  base: `/${repoName}/`, // 👈 สำคัญสำหรับ GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
