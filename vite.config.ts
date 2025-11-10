// vite.config.ts

/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  // ↓↓↓  已为您添加 GitHub Pages 所需的 base 路径 ↓↓↓
  // ❗❗❗ 请将 'JIEYOU' 替换为您真实的 GitHub 仓库名 ❗❗❗
  base: "/JIEYOU/",
  
  plugins: getPlugins(),
});