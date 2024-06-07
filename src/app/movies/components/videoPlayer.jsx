const MovieVideoPlayer = async ({ id: id }) => {
	const videoFrameGenerator = (id) => {
		return (
			<iframe
				src={`https://vidsrc.pro/embed/movie/${id}`}
				allowFullScreen
				referrerPolicy="origin"
				height={720}
				className="w-full h-[240px] lg:h-[720px] rounded-lg"
			></iframe>
		);
	};

	return <section>{videoFrameGenerator(id)}</section>;
};

export default MovieVideoPlayer;
