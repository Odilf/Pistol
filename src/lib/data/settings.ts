type Category = 'Timing' | 'Appearance'

export interface Settings {
	[name: string]: {
		value: unknown,
		category: Category
	}
}

export const setttings: Settings = {
	refreshRate: { value: 20, category: "Timing" },
	decimals: { value: 20, category: "Timing" },

	theme: { value: 'Dark', category: "Appearance" },
}