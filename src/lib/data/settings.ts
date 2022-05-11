type Category = 'Timing' | 'Appearance'

const settingsPrefix = 'Settings'

export interface Settings {
	[name: string]: {
		value: unknown,
		category: Category
	}
}

export const setttings: Settings = {
	refreshRate: { value: 20, category: "Timing" },
	decimals: { value: 20, category: "Timing" },
	pressDelay: { value: 0.300, category: "Timing" },

	theme: { value: 'Dark', category: "Appearance" },
}