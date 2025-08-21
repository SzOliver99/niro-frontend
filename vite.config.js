import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	build: {
		// Optimize bundle size
		rollupOptions: {
			output: {
				manualChunks: {
					// Separate vendor libraries
					vendor: ['lucide-svelte'],
					// Separate Svelte runtime
					svelte: ['svelte']
				}
			}
		},
		// Enable source maps for debugging
		sourcemap: true,
		// Optimize chunk size warnings
		chunkSizeWarningLimit: 1000
	},
	// Optimize dependencies
	optimizeDeps: {
		include: ['axios', 'lucide-svelte']
	},
	// CSS optimization
	css: {
		devSourcemap: true
	}
});
