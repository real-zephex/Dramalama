"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

const Questions = () => {
	return (
		<Accordion>
			<AccordionItem
				key="1"
				aria-label="Accordion 1"
				title="Why there are ads in the player?"
			>
				We do not host any media on our own servers. We simply aggregate
				data from third-party providers. While these services are free
				for public use, someone has to bear the costs of hosting the
				servers and infrastructure. Therefore, the video player includes
				advertisements to help cover these expenses.
			</AccordionItem>
			<AccordionItem
				key="2"
				aria-label="Accordion 2"
				title="Okay but I still don't want to see ads..."
			>
				To avoid ads, you can utilize ad blockers such as Ghostery,
				uBlock Origin, or any preferred ad blocker. Adjust your browser
				settings to maximize tracking prevention or similar features for
				enhanced protection against ads
			</AccordionItem>
		</Accordion>
	);
};

export default Questions;
