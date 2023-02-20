import Image from 'next/image'
import { useRouter } from "next/router";
import {Button, Navbar} from "flowbite-react";
import Link from "next/link";
import {route} from "@/helpers/router";

export default function FrontLayoutNavbar() {
	const router = useRouter();

	const routes = [
		{
			link: route('/'),
			label: 'Home',
		},
		{
			link: route('/about'),
			label: 'About',
		},
		{
			link: route('/services'),
			label: 'Services',
		},
		{
			link: route('/contact'),
			label: 'Contact',
		},
	]

	const goToApp = () => {
		window.location.href = '/app'
	}

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
					Rseon
				</span>
			</Navbar.Brand>
			<div className="flex md:order-2">
				<Button onClick={goToApp}>
					Get started
				</Button>
				<Navbar.Toggle />
			</div>
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