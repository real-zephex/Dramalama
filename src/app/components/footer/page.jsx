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
					style={{ color: "#EBCB8B" }}
					href="https://dramalama.vercel.app"
				>
					Vercel
				</a>
				<a
					style={{ color: "#BF616A" }}
					href="https://dramalama.netlify.app"
				>
					Netlify
				</a>
				<a
					style={{ color: "	#A3BE8C" }}
					href="https://dramalama-1phg.onrender.com"
				>
					Render
				</a>
			</p>
		</div>
	);
}
