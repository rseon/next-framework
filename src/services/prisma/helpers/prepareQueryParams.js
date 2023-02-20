export {
	prepareQueryParams
}

const addRelation = (relation, include) => {
	if (relation.includes('.')) {
		let splits = relation.split('.')
		const first = splits.shift()

		include[first] = withRelations({
			with: splits.join('.')
		})
	}
	else {
		include[relation] = true
	}
	return include
}

/**
 * @example { with: 'posts' } => { include: { posts: true }}
 * @example { with: 'posts.categories' } => { include: { posts: { include: { categories: true }} }}
 * @example { with: ['posts', 'comments'] } => { include: { posts: true, categories: true }}
 */
const withRelations = (model) => {
	let include = {}

	if (Array.isArray(model.with)) {
		model.with.forEach(relation => {
			include = addRelation(relation, include)
		})
	}
	else {
		include = addRelation(model.with, include)
	}

	return { include }
}

function prepareQueryParams(model, args = {}) {
	// Add soft delete condition
	if (model.softDeletes) {
		args.where = {
			deletedAt: null,
			...args.where
		}
	}

	// Add default relations
	if (model.with) {
		args.include = {
			...withRelations(model).include,
			...args.include
		}
	}

	return args
}