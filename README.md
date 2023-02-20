This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Dev notes

### Install
Run `npm install` to install dependencies then copy **.env.example** to **.env.local**.

### Packages
- `date-fns` : modern JavaScript date utility library ([website](https://date-fns.org/))
- `flowbite` : Build websites even faster with components on top of Tailwind CSS ([website](https://flowbite.com/))
- `flowbite-react` : Flowbite React Components ([website](https://flowbite-react.com/))
- `formik` : Build forms in React, without the tears ([website](https://formik.org/))
- `heroicons` : A set of free MIT-licensed high-quality SVG icons for UI development ([website](https://heroicons.dev/))
- `next`: The React Framework ([website](https://nextjs.org/))
- `next-superjson-plugin` : Safely serialize JavaScript expressions to a superset of JSON, which includes Dates, BigInts, and more - for Next.JS Pages and Components. ([github](https://github.com/blitz-js/next-superjson-plugin))
- `prisma` : Next-generation ORM for Node.js & TypeScript ([website](https://www.prisma.io/))
- `react` : A JavaScript library for building user interfaces ([website](https://reactjs.org/))
- `tailwindcss` : Rapidly build modern websites without ever leaving your HTML ([website](https://tailwindcss.com/))
- `yup` : Dead simple Object schema validation ([github](https://github.com/jquense/yup))

### Layouts
- In **front pages**, use `FrontLayout`
- In **app pages**, use `AppLayout`
- No layout in API

### Routes & URL
> Example in [users page](/src/pages/app/users/index.js)

Do not hardcode url :
```diff
- <Link href={/app/user/${user.id}/edit}>Edit user</Link>
+ <Link href={appRoute('/user/:user/edit', user)}>Edit user</Link>
```

- Front : use `route`
- App : use `appRoute`
- API : use `apiRoute`

### Minimal form to API
> Example in [contact page](/src/pages/contact.js)

```js
// /src/pages/test.js
import Head from 'next/head'
import FrontLayout from "@/components/layouts/front";
import {apiRoute} from "@/helpers/router";
import {fetchWrapper} from "@/helpers";

export default function Test() {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await fetchWrapper.post(apiRoute('/test'), {
            email: event.target.email.value,
            name: event.target.name.value,
            remember: event.target.remember.value,
        })
    }
	
    return (
	    <FrontLayout>
		    <Head>
			    <title>Contact</title>
		    </Head>

		    <form onSubmit={handleSubmit}>
			    <input name="name" placeholder="Your name?" />
			    <button type="submit">Submit</button>
		    </form>
        </FrontLayout>
    )
}
```

### Minimal API handler
> Example in [contact API page](/src/pages/api/contact.js)

```js
// /src/pages/api/test.js
import {apiHandler} from "@/helpers/api";

export default apiHandler({
    // get, post, put, delete
    get: (req, res) => {
        return res.status(200).json({ /*body*/ })
    },
});
```

### Database

#### Schema
> See [schema file](/src/services/prisma/schema.prisma)

Update database schema file then run :
- `npm run db:generate`
- `npm run db:push`

#### Seed
> See [seed file](/src/services/prisma/seed.js)

#### Model
> Example in [user model](/src/services/prisma/models/UserModel.js)

In order to not directly use Prisma client, good practice is to create a model in **/src/services/prisma/models** (and add it to the index.js file) and create useful functions.
