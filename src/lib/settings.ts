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
		{ name: 'Timing', description: 'Timing related options', settings: [
			{name: 'Input method', description: 'Way of inputting times', value: 0, options: ['Timer', 'Typing'], child: 
				{name: 'Input format', value: 0, options: ['ss.dd', 'mm:ss', 'mm:ss.dd'], parent: 1}},
			{name: 'Decimals', description: 'Decimals to display in big timer', value: 2, options: ['0', '1', '2', '3']},
			{name: 'Solve decimals', description: 'Decimals to display in solve list', value: 2, options: ['1', '2', '3']},
			{name: 'Timer delay', description: 'Time to press down the timer before it starts', value: 2, options: ['0', '0.1', '0.3', '0.55', '1']},
			{name: 'Refresh rate', description: 'How often the time gets updated when timer is running', value: 1, options: ['1ms', '69ms', '0.1s', '0.5s', '1s']},
		]},

		{ name: 'Visual', description: 'How the timer looks', settings: [
			{name: 'Theme', description: 'What the colors look like', value: 0, options: ['Dark', 'Light', 'Estonia']},
			{name: 'Small decimals', description: 'Make decimals look smaller', value: true},
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
				return getSettingValue(setting)
			}

			if ('child' in setting) {
				if (setting.child.name === name) {
					return getSettingValue(setting.child)
				}
			}
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSettingValue(setting: GeneralSetting): any  {
	if ('options' in setting) { return setting.options[setting.value] }
	else { return setting.value }
}

export function resetSettings(): void {
	if (!browser) return
	console.warn('Reseting settings')
	settings.set(null)
	settings.set(default_settings)
}

//Unused
export function updateSettings(): void {
	settings.update(settings => settings.slice())
}