import {apiHandler} from "@/helpers/api";

export default apiHandler({
	post: newContact
});


function newContact(req, res) {
	const body = req.body

	if (!body.email || !body.name) {
		// Sends a HTTP bad request error code
		return res.status(400).json({ message: 'Name or Email not found' })
	}

	// @todo Use API to send mail or save in DB

	return res.status(200).json({ body })
}

