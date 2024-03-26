import styles from "./footer.module.css";

export default async function Footer() {
	return (
		<div className={styles.footer}>
			<p style={{ margin: 10 }}>
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
				<a
					style={{ color: "#A3BE8C" }}
					href="https://dramalama-zephex.koyeb.app"
					target="_new"
				>
					Koyeb
				</a>
				<a
					style={{ color: "#EBCB8B" }}
					href="https://dramalama.vercel.app"
					target="_new"
				>
					Vercel
				</a>
				<a
					style={{ color: "#BF616A" }}
					href="https://dramalama.netlify.app"
					target="_new"
				>
					Netlify
				</a>
			</p>
		</div>
	);
}
