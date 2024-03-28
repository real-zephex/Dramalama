"use client"; // Error components must be Client Components

import { useEffect } from "react";
import "./globals.css";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<div className="ErrorContainer">
			<p>Something went wrong!</p>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	);
}
