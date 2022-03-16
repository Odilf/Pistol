import { browser } from "$app/env";
import type { ScrambleType } from "$lib/data/architecture";
import { Alg } from 'cubing/alg'
// import { randomScrambleForEvent } from "cubing/scramble";

type Scrambler = (scrambleType: ScrambleType) => Promise<Alg>

async function getCubingjsSrambler(): Promise<Scrambler> {
	if (browser) {
		const { randomScrambleForEvent } = await import('cubing/scramble') 
		return randomScrambleForEvent
	} else {
		const randomScrambleForEvent = (_) => new Alg('')
		return new Promise(randomScrambleForEvent)
	}
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

export let randomScrambleForEventPromise: Promise<Scrambler> = getCubingjsSrambler()

export async function getRandomScramble(scrambleType: ScrambleType) {
	const randomScrambleForEvent = await randomScrambleForEventPromise

	const eventID = scrambleTypeDict[scrambleType]
	if (!eventID) {
		console.error('Unsuported event:', scrambleType);
	}
	const scramble = (await randomScrambleForEvent(eventID)).toString()

	return scramble
}