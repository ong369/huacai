import { defineConfig,loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import compress from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// import viteImagemin from 'vite-plugin-imagemin';


const viteConfig = defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd());
	return {
		plugins: [
			vue(),
			compress(),
			visualizer(),
		],
		///配置路径
		base:'/huacai' ,
		hmr: true,
		root: process.cwd(),
		// 设置路径别名
		resolve: { 
			extensions: [".js", ".vue", ".json", "scss", ".ts"],
			alias : [
				{
					find: "@",
					replacement: resolve(__dirname, "src"),
				},
				{
					find: "components",
					replacement: resolve(__dirname, "src/components"),
				},
				{
					find: "utils",
					replacement: resolve(__dirname, "src/utils"),
				},
			],
		},
		server: {
			open: true,
			port: 6688,
		},
		build: {
			outDir: 'build', //指定输出路径（相对于 项目根目录).
			
			assetsDir: "./static", //指定生成静态资源的存放路径（相对于 build.outDir
			/*
			设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。Benchmarks
			注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。
			当设置为 'terser' 时必须先安装 Terser。
			*/
			minify: "terser",
			/*
			构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
			如果为 'inline'，source map 将作为一个 data URI 附加在输出文件中。'hidden' 的工作原理与 'true' 相似，
			只是 bundle 文件中相应的注释将不被保留。
			*/
			sourcemap: false,
			chunkSizeWarningLimit: 500,  //规定触发警告的 chunk 大小。（以 kbs 为单位）
			//启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。
			//如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
			cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
			terserOptions: {
				compress: {
					// warnings: false,
					drop_console: true, //打包时删除 console
					drop_debugger: true, //打包时删除 debugger
					pure_funcs: ["console.log"],
				},
				output: {
					// 去掉注释内容
					comments: true,
				},
			},
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].[hash].js`,
					//chunkFileNames: `assets/[name].[hash].js`,
					assetFileNames: `assets/[name].[hash].[ext]`,
					compact: true,
					/* manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						echarts: ['echarts'],
					}, */
					//超过大小的拆分
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return id.toString().split('node_modules/')[1].split('/')[0].toString();
						}
					},
					//分文件夹
					chunkFileNames: (chunkInfo) => {
						const facadeModuleId = chunkInfo.facadeModuleId
							? chunkInfo.facadeModuleId.split('/')
							: [];
						const fileName =
							facadeModuleId[facadeModuleId.length - 2] || '[name]';
						return `js/${fileName}/[name].[hash].js`;
					}
				},
			},
		},
		css: {
			preprocessorOptions: { css: { charset: false } },
		},
	}
});

export default viteConfig;
