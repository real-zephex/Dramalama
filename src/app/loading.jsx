import { CircularProgress } from "@nextui-org/react";

const LoadingScreen = async () => {
	return (
		<div className="w-screen h-screen flex gap-4 items-center justify-center">
			<CircularProgress
				color="success"
				aria-label="Loading..."
				label="Loading..."
			/>
		</div>
	);
};

export default LoadingScreen;
