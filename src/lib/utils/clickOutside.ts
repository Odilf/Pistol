export function clickOutside(node: Node, callback: (event: MouseEvent) => unknown) {
	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) {
			callback(event)
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		}
	};
}
