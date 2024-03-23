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
			</p>
		</div>
	);
}
