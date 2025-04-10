import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import * as path from "path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";


// https://vite.dev/config/
export default defineConfig({
     resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    plugins: [
        vue({
            script: {
                defineModel: true
            }
        }),
              AutoImport({
            imports: [
                "vue",
                "vue-router",
                "pinia",
                {
                    "element-plus": ["dayjs"],
                },
            ], // 自动导入 Pinia 的相关函数],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            extensions: ["vue", "tsx", "jsx"],
            dirs: ["src/components"],
        }),
        vueJsx(),
        // vueDevTools(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
            symbolId: 'icon-[dir]-[name]'
        })
    ]
});
