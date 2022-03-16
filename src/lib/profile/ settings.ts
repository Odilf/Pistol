export const defaultSettings: Settings = {
	timerRefreshRate: 0.69,
	smallTimerDecimals: false,
} as const

export interface Settings {
	[settingName: string]: number | boolean
}