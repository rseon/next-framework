import Head from 'next/head'
import AppLayout from "@/components/layouts/app";
import Link from "next/link";
import {appRoute} from "@/helpers/router";
import {Button, Checkbox, Label, Spinner, TextInput} from "flowbite-react";
import {useState} from "react";

export default function Home() {

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		setLoading(true)
		/*try {
			const result = await apiForm(event, '/user', [
				'email',
				'name',
			])
			console.log(result)
		}
		catch (err) {
			console.log(err)
		}
		finally {
			setLoading(false)
		}*/
	}

	return (
		<AppLayout>
			<Head>
				<title>Rseon - User</title>
			</Head>

			<p><Link href={appRoute('/users')}>Back to the list</Link></p>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 justify-center">
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="email"
							value="Your email"
						/>
					</div>
					<TextInput
						id="email"
						name="email"
						type="email"
						placeholder="name@flowbite.com"
						disabled={loading}
						autoComplete="off"
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="name"
							value="Your name"
						/>
					</div>
					<TextInput
						id="name"
						name="name"
						type="text"
						placeholder="Your name"
						disabled={loading}
						autoComplete="off"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox
						id="remember"
						name="remember"
						disabled={loading}
						autoComplete="off"
					/>
					<Label htmlFor="remember">
						Remember me
					</Label>
				</div>
				<Button
					type="submit"
					disabled={loading}
				>
					{ loading && <Spinner className="mr-2" /> }
					Submit
				</Button>
			</form>
		</AppLayout>
	)
}
