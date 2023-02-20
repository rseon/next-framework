import prisma from "@/services/prisma/connector";
import {addExtraAttributes, hideAttributes, prepareQueryParams} from "@/services/prisma/helpers"
import {formatDate} from "@/helpers";

const ROLE_ADMIN = 'ADMIN'
const ROLE_USER = 'USER'

const roles = {
	[ROLE_ADMIN]: 'Administrator',
	[ROLE_USER]: 'Regular user',
}

export const UserModel = {
	ROLE_USER,
	ROLE_ADMIN,
	roles,
	getAll,
	findById,
	delete: destroy
}

const setup = {
	softDeletes: true,
	with: ['projects'],
	hidden: [],
	extra: {
		roleName: (user) => roles[user.role],
		isAdmin: (user) => user.role === ROLE_ADMIN,
		createdAtFormatted: (user) => formatDate(user.createdAt),
		updatedAtFormatted: (user) => formatDate(user.updatedAt),
		deletedAtFormatted: (user) => formatDate(user.deletedAt),
		projects_count: (user) => user.projects.length
	},
}

async function getAll(args = {}) {
	return await prisma.user.findMany(prepareQueryParams(setup, args)).then(transformData)
}

async function findById(id) {
	return await prisma.user.findFirst(prepareQueryParams(setup, {
		where: { id }
	})).then(transformData)
}

async function destroy(args = {}) {
	args.data = {
		...args.data,
		deletedAt: new Date(),
	}
	return await prisma.user.update(prepareQueryParams(setup, args)).then(transformData)
}

function transformData(data) {
	if (!data) {
		return data
	}

	data = addExtraAttributes(setup, data)
	data = hideAttributes(setup, data)

	// @todo Transform relations
	/*if (setup.with) {
		setup.with.forEach(relation => {
			data[relation] = transformData(data[relation])
		})
	}*/

	return data
}