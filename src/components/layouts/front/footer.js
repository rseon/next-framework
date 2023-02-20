import Link from "next/link";
import {Footer} from "flowbite-react";
import {route} from "@/helpers/router";

export default function FrontLayoutFooter() {
	const routes = [
		{
			link: route('/about'),
			label: 'About',
		},
		{
			link: route('/privacy'),
			label: 'Privacy Policy',
		},
		{
			link: route('/contact'),
			label: 'Contact',
		},
	]

	return (
		<Footer container={true}>
			<Footer.Copyright
				href="/"
				by="Rseon™"
				year={2023}
			/>
			<Footer.LinkGroup>
				{routes.map(route => (
					<Footer.Link key={route.link} as={Link} href={route.link}>
						{route.label}
					</Footer.Link>
				))}
			</Footer.LinkGroup>
		</Footer>
	)
}