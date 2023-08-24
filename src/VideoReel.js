const VideoReel = ({ videos }) => {
	return (
		<>
			{videos.map((video) => {
				return (
					<iframe
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${video.key}`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
						key={video.key}
						className="Content-video"></iframe>
				);
			})}
		</>
	);
};

export default VideoReel;
