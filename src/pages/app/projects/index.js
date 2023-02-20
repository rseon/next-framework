import Head from 'next/head'
import AppLayout from "@/components/layouts/app";
import Link from "next/link";
import {appRoute} from "@/helpers/router";

export async function getServerSideProps() {
	return {
		props: { projects: [] }
	}
}

export default function Index({ projects = [] }) {
	return (
		<AppLayout>
			<Head>
				<title>Rseon - Projects</title>
			</Head>

			<p><Link href={appRoute('/projects/create')}>Create project</Link></p>
		</AppLayout>
	)
}
