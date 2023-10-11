import PropTypes from "prop-types";

const TrackResult = ({ track, chooseTrack, addToQueue }) => {
    function handlePlay() {
        chooseTrack(track);
    }

    function handleAddToQueue() {
        addToQueue(track); // Call the addToQueue function when adding a song to the queue
    }

    return (
        <div className="d-flex m-2 align-items-center bg-black/70 p-2" style={{ cursor: "pointer" }}>
            <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
            <div className="ml-3">
                <div>{track.title}</div>
                <div className=" text-green-600">{track.artist}</div>
                <div>
                <button className="hover:text-green-600 cursor-pointer" onClick={handleAddToQueue}>Add to Queue</button>
                </div>
                <button className="hover:text-green-600" onClick={handlePlay}>Play</button>
            </div>
        </div>
    );
}

TrackResult.propTypes = {
    track: PropTypes.shape({
        title: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        albumUrl: PropTypes.string.isRequired,
    }),
    chooseTrack: PropTypes.func.isRequired,
    addToQueue: PropTypes.func.isRequired, // Add the addToQueue prop
};

export default TrackResult;
