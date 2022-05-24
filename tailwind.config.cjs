const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
	fontFamily: {
		sans: ['InterVariable', 'ui-sans-serif', 'system-ui', ],
		mono: ['Roboto'],
	},
    extend: {
	colors: {
			primary: '#E2E8FD',
			secondary: '#151E3F',
			tertiary: '#5da4fc',
		},
	},
  },
};

module.exports = config;
