import styles from "./footer.module.css";

export default async function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.FooterLeftContainer}>
				<a
					href="https://stats.uptimerobot.com/Fxp7SE5Ll3"
					target="_new"
				>
					Status
				</a>
				<a
					href="https://github.com/real-zephex/Dramalama"
					target="_new"
				>
					Github
				</a>
			</div>

			<div className={styles.FooterRightContainer}>
				<a
					style={{ color: "#EBCB8B" }}
					href="https://dramalama.vercel.app"
				>
					Vercel
				</a>
				<a
					style={{ color: "	#A3BE8C" }}
					href="https://dramalama.netlify.app"
				>
					Netlify
				</a>
			</div>
		</div>
	);
}
