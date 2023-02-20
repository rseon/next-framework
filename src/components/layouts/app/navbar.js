import Image from 'next/image'
import { useRouter } from "next/router";
import {Navbar} from "flowbite-react";
import Link from "next/link";
import {appRoute} from "@/helpers/router";

export default function AppLayoutNavbar() {
	const router = useRouter();

	const routes = [
		{
			link: appRoute('/projects'),
			label: 'Projects',
		},
		{
			link: appRoute('/users'),
			label: 'Users',
		},
	]

	return (
		<Navbar
			fluid={true}
			rounded={true}
		>
			<Navbar.Brand href="/">
				<Image
					src="/flowbite.svg"
					className="mr-3 h-6 sm:h-9"
					alt="Rseon Logo"
					width={30}
					height={30}
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					Rseon App
				</span>
			</Navbar.Brand>
			<Navbar.Collapse>
				{routes.map(route => (
					<Navbar.Link key={route.link} as={Link} href={route.link} active={router.pathname === route.link}>
						{route.label}
					</Navbar.Link>
				))}
			</Navbar.Collapse>
		</Navbar>
	)
}