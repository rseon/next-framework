const APP_ROUTE = process.env.APP_ROUTE || '/app'
const API_ROUTE = process.env.API_ROUTE || '/api'

export {
	route,
	appRoute,
	apiRoute,
}

function appRoute(endpoint, params) {
	return APP_ROUTE + route(endpoint, params)
}

function apiRoute(endpoint, params) {
	return API_ROUTE + route(endpoint, params)
}

/**
 * Create URL from string with params
 *
 * @example route('/users/:user', user.id) => /users/1
 * @example route('/users/:user', [ user.id ]) => /users/1
 * @example route('/users/:user', { user: user.id }) => /users/1
 *
 * Implicit parameter "id"
 * @example route('/users/:user', user) => /users/1
 * @example route('/users/:user', [ user ]) => /users/1
 * @example route('/users/:user', { user }) => /users/1
 *
 * @param endpoint
 * @param params
 * @returns {string}
 *
 * @todo route('/users/:user/post/:post', user, post) (implicit "id") => /users/1/post/2
 */
function route(endpoint, params) {
	if (!endpoint.startsWith('/')) {
		endpoint = `/${endpoint}`
	}

	if (!endpoint.includes(':')) {
		return endpoint
	}

	let part_idx = 0
	return endpoint.split('/').map(part => {

		// No param needed: route('/users/create')
		if (!part.includes(':')) {
			return encodeURIComponent(part)
		}

		if (!params) {
			throw new Error('Route params missing')
		}

		// Params is array: route('/users/:user', [ user ])
		if (Array.isArray(params)) {
			const param_part = params[part_idx]
			++part_idx;

			if (param_part === undefined || param_part === null) {
				throw new Error(`Parameter for ${part} is missing`)
			}

			// Current part is object: route('/users/:user', [ user ])
			if (typeof param_part === 'object') {
				if (!param_part.id) {
					throw new Error(`Id for ${part} is missing`)
				}
				return encodeURIComponent(param_part.id)
			}

			// Current part is something else: route('/users/:user', [ user.id ])
			return encodeURIComponent(param_part)
		}

		// Params is object: route('/users/:user', { user })
		const part_name = part.replace(':', '')

		if (typeof params === 'object') {
			if ('id' in params) {
				return encodeURIComponent(params.id)
			}
			if (!(part_name in params)) {
				throw new Error('Part param object missing')
			}
			const param_part = params[part_name]

			// Current part is object: route('/users/:user', { user })
			if (typeof param_part === 'object') {
				if (!param_part.id) {
					throw new Error(`Id for ${part} is missing`)
				}
				return encodeURIComponent(param_part.id)
			}

			// Current part is something else: route('/users/:user', { user: user.id })
			return encodeURIComponent(param_part)
		}

		// Current part is something else: route('/users/:user', user.id)
		return encodeURIComponent(params)
	}).join('/')
}