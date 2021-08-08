import { browser } from '$app/env'
import { writable } from 'svelte-local-storage-store'
interface Setting {
	readonly name: string
	readonly description?: string
	readonly child?: GeneralSetting & {parent: number}
}

interface OptionSetting extends Setting {
	value: number
	readonly options: string[]
}

interface SliderSetting extends Setting {
	value: number
	readonly min: number
	readonly max: number
}

interface BooleanSetting extends Setting {
	value: boolean
}

export type GeneralSetting = OptionSetting | SliderSetting | BooleanSetting

interface Category {
	readonly name: string
	readonly description: string
	readonly settings: Array<GeneralSetting> 
}

const default_settings: Category[] = [
		{ name: 'Timing', description: 'Timing related stuff', settings: [
			{name: 'Input method', description: 'How you input your times', value: 0, options: ['Timer', 'Typing'], child: 
				{name: 'Input format', value: 0, options: ['ss.dd', 'mm:ss', 'mm:ss.dd'], parent: 1}},
			{name: 'Decimals', description: 'Decimals to display in big timer', value: 2, options: ['0', '1', '2', '3']},
			{name: 'Solve decimals', description: 'Decimals to display in solve list', value: 2, options: ['1', '2', '3']},
		]},

		{ name: 'Visual', description: 'How the timer looks', settings: [
			{name: 'Theme', description: 'What the colors look like', value: 0, options: ['Dark', 'Light', 'Estonia']},
			{name: 'Welp', description: 'This is a checkbox', value: false},
		]},

		{ name: 'Accesibility', description: 'Peepee poopoo idk what to put here', settings: [
			{name: 'Button size', description: 'Make buttons bigger or smth', value: 1, min: 0, max: 3},
		]},
]

export const settings = writable('settings', default_settings)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getSettingByName(name: string) {
	if (!browser) return null
	const settings = JSON.parse(localStorage.getItem('settings'))

	for (const category of settings) {
		for (const setting of category.settings) {
			if (setting.name === name) {
				if ('options' in setting) { return setting.options[setting.value] }
				else { return setting.value }
			}
		}
	}
}

export function resetSettings(): void {
	if (!browser) return
	settings.set(null)
	settings.set(default_settings)
}