const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
	colors: {
		'primary': 'white',
		'secondary': '#385F71',
		'black': '#242224',
		'accent': '#8F754F',
		// 'accent-secondary': '#8F754F',
	},
	fontFamily: {
		'sans': ['InterVariable', 'ui-sans-serif', 'system-ui', ],
		'mono': ['Roboto Mono'],
	},
    extend: {},
  },

  plugins: [],
};

module.exports = config;
