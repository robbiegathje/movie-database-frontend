import Credits from './Credits';
import StreamingList from './StreamingList';
import VideoReel from './VideoReel';

const SeriesPage = () => {
	return (
		<>
			<h1>Series</h1>
			<VideoReel />
			<StreamingList />
			<Credits />
		</>
	);
};

export default SeriesPage;
