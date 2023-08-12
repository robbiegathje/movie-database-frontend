import Credits from './Credits';
import StreamingList from './StreamingList';
import VideoReel from './VideoReel';

const MoviePage = () => {
	return (
		<>
			<h1>Movie</h1>
			<VideoReel />
			<StreamingList />
			<Credits />
		</>
	);
};

export default MoviePage;
