"use client";

import Link from "next/link";
export default function CreateButton({ a }) {
	return (
		<Link href={`/video/${a.id}`}>
			<button className="dramaButton">{a.number}</button>
		</Link>
	);
}
