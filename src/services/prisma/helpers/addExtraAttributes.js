export {
	addExtraAttributes
}

function addExtraAttributes(model, data) {
	if (!model.extra) {
		return data
	}

	if (Array.isArray(data)) {
		return data.map(d => {
			Object.entries(model.extra).map(async ([attribute, callback]) => {
				d[attribute] = await callback(d)
			})
			return d
		})
	}
	else {
		Object.entries(model.extra).map(async ([attribute, callback]) => {
			data[attribute] = await callback(data)
		})
	}
	return data
}
