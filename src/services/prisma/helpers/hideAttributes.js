export {
	hideAttributes
}

function hideAttributes(model, data) {
	if (!model.hidden) {
		return data
	}

	if (Array.isArray(data)) {
		return data.map(d => {
			model.hidden.map(attr => {
				delete d[attr]
			})
			return d
		})
	}
	else {
		model.hidden.map(attr => {
			delete data[attr]
		})
	}
	return data
}
