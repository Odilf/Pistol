import { browser } from "$app/env";
import type { ScrambleType } from "$lib/data/architecture";
import { src_url_equal } from "svelte/internal";
// import { randomScrambleForEvent } from "cubing/scramble";

async function getCubingjsSrambler() {
	const { randomScrambleForEvent } = await import('cubing/scramble') 
	return randomScrambleForEvent
}

const scrambleTypeDict = {
	'3x3': '333',
	'2x2': '222',
	'4x4': '444',
	'5x5': '555',
	'6x6': '666',
	'7x7': '777',

	'3BLD': '333bf',

	'Clock': 'clock',
	'Megaminx': 'minx',
	'Pyraminx': 'pyram',
	'Skewb': 'skewb',
	'Square1': 'sq1',

	'4BLD': '444bf',
	'5BLD': '555bf',
	'MBLD': '333mb',
}

export let randomScrambleForEvent = async(scrambleType: ScrambleType) => {
	return null
}

if (browser) {
	getCubingjsSrambler().then(scrambler => {
		randomScrambleForEvent = scrambler
	})
}

export async function getRandomScramble(scrambleType: ScrambleType) {
	const eventID = scrambleTypeDict[scrambleType]
	if (!eventID) {
		console.error('Unsuported event:', scrambleType);
	}
	return (await randomScrambleForEvent(eventID)).toString()
}