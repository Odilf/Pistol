export function clickOutside(node: Node, options: {
	callback: (event: MouseEvent) => unknown,
	ignore?: EventTarget,
}) {
	const {
		callback,
		ignore = null
	} = options

	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) {
			if (ignore !== event.target) {
				callback(event)
			}
		}
	}

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		}
	}
}
