import Head from 'next/head'
import AppLayout from "@/components/layouts/app";
import {appRoute} from "@/helpers/router";
import Link from "next/link";
import { UserModel } from "@/services/prisma/models"
import {e} from "@/helpers/e";

export async function getServerSideProps({ params }) {
	const user = await UserModel.findById(params.id)

	if (!user) {
		return { notFound: true }
	}
	return { props: { user } }
}

export default function Home({ user }) {
	return (
		<AppLayout>
			<Head>
				<title>Rseon - User</title>
			</Head>

			<p><Link href={appRoute('/users')}>Back to the list</Link></p>
			<p><Link href={appRoute('/users/:user/edit', user)}>Edit the user</Link></p>

			<ul>
				{Object.entries(user).map(([key, value]) => (
					<li key={key}>
						{key}: <strong>{e(value)}</strong>
					</li>
				))}
			</ul>
		</AppLayout>
	)
}
