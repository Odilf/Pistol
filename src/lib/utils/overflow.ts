export function isOverflown(element: HTMLElement) {
	if (!element) return false
	
	const { clientWidth, clientHeight, scrollWidth, scrollHeight } = element
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
}