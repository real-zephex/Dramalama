import Link from "next/link";

export default function Header() {
	return (
		<div className="headMain">
			<div className="headNav">
				<Link
					href="/"
					style={{ color: "black", textDecoration: "none" }}
				>
					<p style={{ fontSize: "26px", color: "var(--pastel-red)" }}>
						Dramalama
					</p>
				</Link>
				<div className="rightNav">
					<Link href="/anime">
						<p>Anime</p>
					</Link>
					<Link href="/manga">
						<p>Manga</p>
					</Link>
					<Link href="/kdrama">
						<p>Kdrama</p>
					</Link>
				</div>
			</div>
			<hr style={{ marginTop: "-3px" }} />
		</div>
	);
}
