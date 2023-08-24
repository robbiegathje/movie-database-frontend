const StreamingList = ({ providers }) => {
	return (
		<div>
			<h2 className="Content-tagline">Available on:</h2>
			{providers.map((provider) => {
				return <h3 className="Content-tag">{provider.provider_name}</h3>;
			})}
		</div>
	);
};

export default StreamingList;
