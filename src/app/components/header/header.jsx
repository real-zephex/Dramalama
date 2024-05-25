import Link from "next/link";
import styles from "../../page.module.css";
import { ThemeSwitcher } from "../themeSwitcher";

export default async function Header() {
	return (
		<div className="fixed top-0 w-full flex items-center justify-between z-50  dark:bg-black bg-white">
			<h4 className="text-teal-400 text-2xl p-2">
				<Link href={"/"}>Dramalama</Link>
			</h4>
			<div
				className={`mx-2 flex items-center overflow-auto ${styles.ScrollBarAdjuster}`}
			>
				<ThemeSwitcher />

				<Link href={"/anime"} className="mx-2 hover:text-sky-400">
					<p>Anime</p>
				</Link>
				<Link href={"/kdrama"} className="mx-2 hover:text-sky-400">
					<p>Kdrama</p>
				</Link>
				<Link
					href={"/components/workInProgress/"}
					className="mx-2 hover:text-sky-400"
				>
					<p>Manga</p>
				</Link>
				<Link
					href={"/components/workInProgress/"}
					className="mx-2 hover:text-sky-400"
				>
					<p>Series</p>
				</Link>
				<Link href={"/movies"} className="mx-2 hover:text-sky-400">
					<p>Movies</p>
				</Link>
			</div>
		</div>
	);
}
