"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@nextui-org/react";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<div className="w-screen h-screen flex items-center flex-col justify-center">
			<p>Something went wrong!</p>
			<Button color="primary" onClick={() => reset()}>
				Try again
			</Button>
		</div>
	);
}
