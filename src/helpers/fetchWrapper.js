export const fetchWrapper = {
	get,
	post,
	put,
	delete: destroy
};

function get(url) {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(body)
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function destroy(url) {
	const requestOptions = {
		method: 'DELETE',
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	return response.text().then(text => {
		try {
			const data = text && JSON.parse(text);

			if (!response.ok) {
				const error = (data && data.message) || response.statusText;
				return Promise.reject(error);
			}

			return data;
		}
		catch (err) {
			const status = response.status.toString()
			if (status.startsWith('4') || status.startsWith('5')) {
				err = `Error ${status} ${response.statusText}`;
			}
			return Promise.reject(err)
		}
	})
}
