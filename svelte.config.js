import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	
	preprocess: preprocess({
		scss: {
			includePaths: ['theme'],
		},
	}),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: vercel(),
		target: '#svelte',
		vite: {
			build: {
				chunkSizeWarningLimit: 2000
			},
		},
	},
};


export default config;