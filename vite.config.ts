import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/anode/",
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			includeAssets: [
				"favicon.ico",
				"apple-touch-icon.png",
				"android-chrome-512x512.png",
				"android-chrome-192x192.png ",
			],
			manifest: {
				name: "Anode",
				short_name: "Anode",
				description: "Use nodes to search for similar anime.",
				theme_color: "#209CEE",
				icons: [
					{
						src: " favicon-32x32.png",
						sizes: "32x32",
						type: "image/png",
					},
					{
						src: " favicon-16x16.png",
						sizes: "16x16",
						type: "image/png",
					},
					{
						src: "android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},
			devOptions: {
				enabled: true,
			},
		}),
	],
});
