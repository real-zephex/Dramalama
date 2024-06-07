import { CircularProgress } from "@nextui-org/react";

const LoadingScreen = async () => {
	return (
		<div className="flex h-[90dvh] w-screen items-center justify-center gap-4">
			<CircularProgress
				color="success"
				aria-label="Loading..."
				label="Loading..."
			/>
		</div>
	);
};

export default LoadingScreen;
