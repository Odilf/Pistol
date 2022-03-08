interface settings {
	lifespan: number,
	transitionSpeed: number,
}

const defaultSettings = {
	lifespan: 2000,
	transitionSpeed: 500,
}

export function createSnackbar(message: string, settings: settings = defaultSettings) {
	const div = document.createElement('div')
	div.textContent = message

	div.style.position = 'absolute'
	div.style.width = "100%"
	div.style.textAlign = "center"
	div.style.zIndex = '10'
	div.style.bottom = "-10px"

	div.style.transition = "all"
	div.style.transitionDuration = `${settings.transitionSpeed}ms`
	div.style.transitionTimingFunction = "ease"
	div.style.opacity = "0"


	document.body.appendChild(div)

	setTimeout(() => {
		div.style.opacity = "1"
		div.style.bottom = "10px"
	}, 0)

	setTimeout(() => {
		div.style.opacity = "0"
		div.style.bottom = "0px"
	}, settings.lifespan)
	
	setTimeout(() => {
		document.body.removeChild(div)
	}, settings.lifespan + 2 * settings.transitionSpeed)
}