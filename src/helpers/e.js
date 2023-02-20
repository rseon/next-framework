export {
	e
}

/**
 * Safely display value in page.
 *
 * @param value
 * @returns {*|string}
 */
function e(value) {
	if (value === null || value === undefined) {
		return `[${value}]`
	}
	if (typeof value === 'object') {
		if (Array.isArray(value)) {
			return `[Array[${value.length}]]`
		}
		if ('toString' in value) {
			return `[${value.toString()}]`
		}
		return `[object ${value.constructor.name}]`
	}
	if (typeof value === 'boolean') {
		return `[${value.toString()}]`
	}
	return value
}