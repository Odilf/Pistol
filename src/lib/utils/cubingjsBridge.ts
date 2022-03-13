import type { ScrambleType } from "$lib/data/architecture"; 
import type { PuzzleID } from 'cubing/twisty'

const scrambleTypeToPuzzleDict: Record<ScrambleType, PuzzleID> = {
	'3x3': '3x3x3',
	'2x2': '2x2x2',
	'4x4': '4x4x4',
	'5x5': '5x5x5',
	'6x6': '6x6x6',
	'7x7': '7x7x7',

	'3BLD': '3x3x3',
	'Clock': 'clock',
	'Megaminx': 'megaminx',
	'Pyraminx': 'pyraminx',
	'Skewb': 'skewb',
	'Square1': 'square1',

	'4BLD': '4x4x4',
	'5BLD': '5x5x5',
	'MBLD': '3x3x3',
	'Other': '3x3x3'
}

export function getPuzzleIDFromScrambleType(scrambleType: ScrambleType): PuzzleID {
	return scrambleTypeToPuzzleDict[scrambleType]
}