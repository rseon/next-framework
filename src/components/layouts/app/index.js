import styles from '@/styles/app.module.css'
import AppLayoutNavbar from "@/components/layouts/app/navbar";

export default function AppLayout({ children }) {
	return (
		<div className="container mx-auto">
			<AppLayoutNavbar />
			<main className={styles.main}>{children}</main>
		</div>
	)
}