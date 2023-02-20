import Head from 'next/head'
import FrontLayout from "@/components/layouts/front";
import {Button, Checkbox, Label, Spinner, TextInput, Alert} from "flowbite-react";
import {useState} from "react";
import {apiRoute} from "@/helpers/router";
import {fetchWrapper} from "@/helpers";
import {InformationCircleIcon, CheckCircleIcon} from "@heroicons/react/24/outline";

export default function Home() {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault()

		setError(null)
		setSuccess(false)
		setLoading(true)

		fetchWrapper.post(apiRoute('/contact'), {
			email: event.target.email.value,
			name: event.target.name.value,
			remember: event.target.remember.value,
		}).then(result => {
			setSuccess(true)
		}).catch(err => {
			setError(err)
		}).finally(() => {
			setLoading(false)
		})
	}

	return (
		<FrontLayout>
			<Head>
				<title>Rseon - Contact</title>
			</Head>

			{error &&
				<Alert color="failure" icon={InformationCircleIcon}>
					<span>
						<span className="font-medium">
							An error occurred
						</span>
						{' '}
						{error}
					</span>
				</Alert>
			}

			{success &&
				<Alert color="failure" icon={CheckCircleIcon}>
					<span>
						<span className="font-medium">
							Bravo
						</span>
						{' '}
						Contact sent successfully
					</span>
				</Alert>
			}

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

		</FrontLayout>
	)
}
