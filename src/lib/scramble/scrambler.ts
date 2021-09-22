
import { getRandomScramble as getRandomScramble222 } from "./vendor/cstimer/src/js/scramble/2x2x2";
import { getRandomScramble as getRandomScramble333 } from "./vendor/cstimer/src/js/scramble/scramble_333_edit";
import { getRandomScramble as getRandomScramble444 } from "./vendor/cstimer/src/js/scramble/scramble_444";
import { getRandomScramble as getRandomScrambleClock } from "./vendor/cstimer/src/js/scramble/clock";
import { getRandomScramble as getRandomScramblePyraminx } from "./vendor/cstimer/src/js/scramble/pyraminx";
import { getRandomScramble as getRandomScrambleSkewb } from "./vendor/cstimer/src/js/scramble/skewb";
import { getRandomScramble as getRandomScrambleSq1 } from "./vendor/cstimer/src/js/scramble/scramble_sq1_new";

export async function get_random_scramble(event: {name: string, scramble: string}, seed = new Date().getMilliseconds()): Promise<string> {

	if (['3BLD', 'FMC', 'OH'].includes(event.scramble)) event.scramble = '3x3'	
	if (event.scramble === '4BLD') event.scramble = '4x4'
	if (event.scramble === '5BLD') event.scramble = '5x5'

	let scramble: string[] = []
	let length = 69
	switch (event.scramble) {
		case "3x3": return getRandomScramble333()
		case "2x2": return getRandomScramble222()
		case "4x4": return getRandomScramble444()
		case "5x5": length = 30; break
		case "6x6": length = 40; break
		case "7x7": length = 50; break
		case "Clock": return await getRandomScrambleClock().replace('`', 'AWOOOGA ')
		case "Pyraminx": return getRandomScramblePyraminx()
		case "Skewb": return getRandomScrambleSkewb()
		case "Square-1": return getRandomScrambleSq1()
		case "Megaminx": length = 7; break
		case "MBLD": return [1, 2, 3, 4, 5].map(v => v + ') ' + getRandomScramble333() + '\n').join(' ')
		case "Other": return ''
		default: return `${event.scramble} is not yet supported`
	}
		
	for (let i = 0; i < length; i++) {
		const temp_move = random_item(get_moves(event.scramble, scramble[scramble.length - 1]), seed)
		
		if (Array.isArray(temp_move)) {
			scramble = scramble.concat(temp_move)
		} else {
			scramble.push(temp_move)
		}
	}
	
	
	return scramble.join(' ')
}

function random_item(array: string[], input_seed = 69420): string {
	return array[Math.floor( ((Math.random() + input_seed) % 1)*array.length)]
}

function get_moves(cube_type: string, last_move?: string): string[] {
	
	let moves = []
	if (cube_type === '3x3' || cube_type === '2x2') {

		let axes = [['R', 'L'], ['U', 'D'], ['F', 'B']]
		if (last_move) {
			if (last_move[0] === 'R' || last_move[0] === 'L') axes = [['U', 'D'], ['F', 'B']]
			if (last_move[0] === 'U' || last_move[0] === 'D') axes = [['R', 'L'], ['F', 'B']]
			if (last_move[0] === 'F' || last_move[0] === 'B') axes = [['R', 'L'], ['U', 'D']]
		}
		const amounts = ['', "'", '2']
		
		for (const axis of axes) {
			const primaries = amounts.map(amount => axis[0] + amount)
			const secondaries = amounts.map(amount => axis[1] + amount )

			const axis_moves: unknown[] = primaries.concat(secondaries)
			axis_moves.map(v => [v])
			
			for (const i of primaries) {
				for (const j of secondaries) {
					axis_moves.push([i, j])
				}
			}

			moves = axis_moves
		}
	}

	if (cube_type === '4x4' || cube_type === '5x5') {
		let axes = [['R', 'L'], ['U', 'D'], ['F', 'B']]
		if (last_move) {
			if (last_move[0] === 'R' || last_move[0] === 'L') axes = [['U', 'D'], ['F', 'B']]
			if (last_move[0] === 'U' || last_move[0] === 'D') axes = [['R', 'L'], ['F', 'B']]
			if (last_move[0] === 'F' || last_move[0] === 'B') axes = [['R', 'L'], ['U', 'D']]
		}

		const amounts = ['', "'", '2', 'w', "w'", 'w2']

		for (const axis of axes) {
			const primaries = amounts.map(amount => axis[0] + amount)
			const secondaries = amounts.map(amount => axis[1] + amount)

			const axis_moves: unknown[] = primaries.concat(secondaries)
			axis_moves.map(v => [v])
			
			for (const i of primaries) {
				for (const j of secondaries) {
					axis_moves.push([i, j])
				}
			}

			moves = moves.concat(axis_moves)
		}
	}

	if (cube_type === '6x6' || cube_type === '7x7') {

		let axes = [['R', 'L'], ['U', 'D'], ['F', 'B']]
			if (last_move) {
				if (last_move[0] === 'R' || last_move[0] === 'L') axes = [['U', 'D'], ['F', 'B']]
				if (last_move[0] === 'U' || last_move[0] === 'D') axes = [['R', 'L'], ['F', 'B']]
				if (last_move[0] === 'F' || last_move[0] === 'B') axes = [['R', 'L'], ['U', 'D']]
			}

			const amounts = ['', "'", '2']
			const wides = ['w', "w'", 'w2']

			for (const axis of axes) {
				let primaries = amounts.map(amount => axis[0] + amount)
				primaries = primaries.concat(wides.map(wide => axis[0] + wide))
				primaries = primaries.concat(wides.map(wide => '3' + axis[0] + wide))
				
				let secondaries = amounts.map(amount => axis[1] + amount)
				secondaries = secondaries.concat(wides.map(wide => axis[1] + wide))
				secondaries = secondaries.concat(wides.map(wide => '3' + axis[1] + wide))

				const axis_moves: unknown[] = primaries.concat(secondaries)
				axis_moves.map(v => [v])
				
				for (const i of primaries) {
					for (const j of secondaries) {
						axis_moves.push([i, j])
					}
				}

				moves = moves.concat(axis_moves)
			}
	}

	if (cube_type === 'Megaminx') {

		for (let i = 0; i < 10; i++) {
			const move = i % 2 === 0 ? 'R' : 'D' 
			const mod = (Math.round(Math.random()) === 0) ? '++' : '--'
			moves.push(move + mod)
		}
		moves.push('U' + ((Math.round(Math.random()) === 0) ? '+' : '-') + '\n')
		return [moves.join(' ')]
	}

	return moves
}