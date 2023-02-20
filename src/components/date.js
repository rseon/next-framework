import { formatDate } from "@/helpers";

export default function Date({ date, format = 'dd/MM/yyyy HH:mm' }) {
	return date
		? <time dateTime={date}>{formatDate(date, format)}</time>
		: null
}
