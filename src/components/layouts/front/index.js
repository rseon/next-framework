import styles from '@/styles/front.module.css'
import FrontLayoutNavbar from "@/components/layouts/front/navbar";
import FrontLayoutFooter from "@/components/layouts/front/footer";

export default function FrontLayout({ children }) {
	return (
		<div className="container mx-auto">
			<FrontLayoutNavbar />
			<main className={styles.main}>{children}</main>
			<FrontLayoutFooter />
		</div>
	)
}