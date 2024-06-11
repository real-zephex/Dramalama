import { Button } from "@nextui-org/react";
import Link from "next/link";

const DownloadButton = async ({ id: id }) => {
	return (
		<Button
			as={Link}
			href={`https://manga-downloader-api.vercel.app/${id}`}
		>
			Download
		</Button>
	);
};

export default DownloadButton;
