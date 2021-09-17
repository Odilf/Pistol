export function get_random_scramble(event: {name: string, type?: string}, seed = new Date().getMilliseconds()): string {
	
	const cube_type = event.type ? event.type : event.name

	let scramble: Move[] = []
	let length = 69
	switch (cube_type) {
		case "3x3":
			length = 18
			break;
		case "2x2":
			length = 9
			break;
		default:
			return "Not a supported cube (yet)"
		}
		
		for (let i = 0; i < length; i++) {
			const temp_move = random_item(get_moves(cube_type, scramble[scramble.length - 1]), seed)
			if (Array.isArray(temp_move)) {
				scramble = scramble.concat(temp_move)
			} else {
				scramble.push(temp_move)
			}
			// console.log(name(scramble[scramble.length - 1]) );
		}
		
		return namerec( scramble )
}

function random_item(array: Move[], input_seed = 69420): Move {
	const i = Math.floor( ((Math.random() + input_seed) % 1)*array.length)
	return array[i]
}

interface Move {
	axis: number
	direction: number
	amount: number
}

function name(move: Move) {
	let face = ""
	if (move.axis === 0 && move.direction === 1) face = "R"
	if (move.axis === 1 && move.direction === 1) face = "U"
	if (move.axis === 2 && move.direction === 1) face = "F"
	if (move.axis === 0 && move.direction === -1) face = "L"
	if (move.axis === 1 && move.direction === -1) face = "D"
	if (move.axis === 2 && move.direction === -1) face = "B"

	let amount = ""
	if (move.amount == 1) amount = ""
	if (move.amount == 2) amount = "2"
	if (move.amount == -1) amount = "'"

	return `${face}${amount}`
}

function namerec(array: (Move | Move[])[] ) {
	let output = ""
	for (const i of array) {
		if (Array.isArray(i)) {
			output += namerec(i)
		} else {
			output += name(i)
		}

		output += " "
	}
	return output
}

function get_moves(cube_type: string, last_move?: Move): Move[] {

	// if (cube_type === '3x3' || cube_type === '2x2') {
		const axes = [0, 1, 2]
		const amounts = [1, -1, 2]
		
		if (last_move) {
			axes.splice(last_move.axis, 1)
		}
		
		let moves = []
		for (const axis of axes) {
			const primaries = amounts.map(amount => { return {axis: axis, direction: 1, amount: amount} })
			const secondaries = amounts.map(amount => { return {axis: axis, direction: -1, amount: amount} })

			const axis_moves: unknown[] = primaries.concat(secondaries)
			axis_moves.map(v => [v])
			
			for (const i of primaries) {
				for (const j of secondaries) {
					axis_moves.push([i, j])
				}
			}

			moves = moves.concat(axis_moves)
		}
	// }

	return moves
}