import { parseJSON, format } from 'date-fns'

export {
	formatDate
}

/**
 * Displays a date from string / JSON to a specific format
 *
 * @param dateString
 * @param formatString
 * @returns {string|null}
 */
function formatDate(dateString, formatString = 'dd/MM/yyyy HH:mm') {
	if (!dateString) {
		return null
	}

	const date = parseJSON(dateString);
	return format(date, formatString)
}
