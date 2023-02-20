import Head from 'next/head'
import AppLayout from "@/components/layouts/app";
import Date from "@/components/date";
import {Table} from "flowbite-react";
import Link from "next/link";
import {appRoute} from "@/helpers/router";
import { UserModel } from "@/services/prisma/models"

export async function getServerSideProps() {
	const users = await UserModel.getAll()
	return {
		props: { users }
	}
}

export default function Index({ users = [] }) {
	return (
		<AppLayout>
			<Head>
				<title>Rseon - Users</title>
			</Head>

			<p><Link href={appRoute('/users/create')}>Create user</Link></p>

			<Table>
				<Table.Head>
					<Table.HeadCell>Id</Table.HeadCell>
					<Table.HeadCell>Email</Table.HeadCell>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Role</Table.HeadCell>
					<Table.HeadCell>Active</Table.HeadCell>
					<Table.HeadCell>Created at</Table.HeadCell>
					<Table.HeadCell>Updated at</Table.HeadCell>
					<Table.HeadCell>Nb projects</Table.HeadCell>
					<Table.HeadCell>Show</Table.HeadCell>
					<Table.HeadCell>Edit</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{users.map(user => (
						<Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell>{ user.id }</Table.Cell>
							<Table.Cell>{ user.email }</Table.Cell>
							<Table.Cell>{ user.name }</Table.Cell>
							<Table.Cell>{ user.roleName }</Table.Cell>
							<Table.Cell>{ user.active ? 'oui' : 'non' }</Table.Cell>
							<Table.Cell>{ user.createdAtFormatted }</Table.Cell>
							<Table.Cell><Date date={user.updatedAt} /></Table.Cell>
							<Table.Cell>{ user.projects_count }</Table.Cell>
							<Table.Cell>
								<Link
									href={appRoute('/users/:user', user)}
									className="font-medium text-blue-600 hover:underline dark:text-blue-500"
								>
									Show
								</Link>
							</Table.Cell>
							<Table.Cell>
								<Link
									href={appRoute('/users/:user/edit', user)}
									className="font-medium text-blue-600 hover:underline dark:text-blue-500"
								>
									Edit
								</Link>
							</Table.Cell>
						</Table.Row>
					))}
					{!users.length &&
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell colSpan="9" className="text-center text-red-600">
								No users :(
							</Table.Cell>
						</Table.Row>
					}
				</Table.Body>
			</Table>
		</AppLayout>
	)
}
