import SpotifyPlayer from "react-spotify-web-playback";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import show from './Pages/Images/show.svg'
import hide from './Pages/Images/hide.svg'
import prevButton from './Pages/Images/prev.svg'
import nextButton from './Pages/Images/next.svg'
import playButton from './Pages/Images/play2.svg'
import pauseButton from './Pages/Images/pause2.svg'

const Player = ({
    accessToken,
    trackUri,
    songQueue,
    currentSongIndex,
    chooseTrack,
    playNext,
    playPrevious,
}) => {
    const [play, setPlay] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackUri, setCurrentTrackUri] = useState("");
    const [isQueueOpen, setIsQueueOpen] = useState(false);
    const [highlightedTrack, setHighlightedTrack] = useState(null);

    useEffect(() => {
        setPlay(!!trackUri);
        setCurrentTrackUri(trackUri);
    }, [trackUri]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        setPlay(isPlaying);
    }, [isPlaying]);

    useEffect(() => {
        if (currentSongIndex >= 0 && currentSongIndex < songQueue.length) {
            setCurrentTrackUri(songQueue[currentSongIndex].uri);
            setHighlightedTrack(currentSongIndex);
        }
    }, [currentSongIndex, songQueue]);

    if (!accessToken) return null;

    return (
        <div className="relative">
            <SpotifyPlayer
                token={accessToken}
                showSaveIcon
                callback={(state) => {
                    setIsPlaying(state.isPlaying);
                    if (!state.isPlaying) setPlay(false);
                }}
                play={play}
                uris={currentTrackUri ? [currentTrackUri] : []}
            />
            <div className='fixed top-24 left-4 px-10 py-2 m-2 rounded-lg bg-black shadow-2xl w-3/12 opacity-40 hover:opacity-95 transition-opacity duration-300'>
                <div className="flex justify-between items-center px-1">
                    <h2 className="text-white text-lg opacity-60 py-3">Queue</h2>
                    <button
                        className="text-white px-4 py-2"
                        onClick={() => {
                            setIsQueueOpen(!isQueueOpen);
                        }}
                    >
                        {isQueueOpen ? (
                            <img src={hide} className="h-8 w-8 hover:scale-110 transition-transform opacity-60" />
                        ) : (
                            <img src={show} className="h-8 w-8 hover:scale-110 transition-transform opacity-60" />
                        )}
                    </button>
                </div>

                {isQueueOpen && (
                    <ul className="text-white mt-2 max-h-96 overflow-y-auto">
                        {songQueue.map((song, index) => (
                            <div
                                key={song.id}
                                className={`d-flex m-2 align-items-center px-8 py-2 cursor-pointer rounded-xl transition-transform relative ${index === highlightedTrack ? "bg-green-600/30" : ""
                                    }`}
                                onClick={() => {
                                    chooseTrack(song);
                                    setHighlightedTrack(index);
                                }}
                            >
                                <div className="absolute inset-0 bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
                                <img
                                    src={song.albumUrl}
                                    style={{ height: "64px", width: "64px" }}
                                />
                                <div className="ml-3">
                                    <div>{song.title}</div>
                                    <div className="text-green-600">{song.artist}</div>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}

                {isQueueOpen && (
                    <div className="flex p-2 justify-evenly mt-8">
                        <button
                            className="text-white px-2 rounded-full"
                            onClick={() => {
                                playPrevious();
                            }}
                        >
                            <img src={prevButton} className="h-8 w-8 hover:scale-110 transition-transform opacity-60" />
                        </button>
                        <button
                            className="text-white px-4 py-2 rounded-full ml-4"
                            onClick={togglePlayPause}
                        >
                            {isPlaying ? <img src={pauseButton} className="h-8 w-8 hover:scale-110 transition-transform opacity-60" /> : <img src={playButton} className="h-8 w-8 hover:scale-110 transition-transform opacity-60" />}
                        </button>
                        <button
                            className="text-white px-2 rounded-full ml-4"
                            onClick={() => {
                                playNext();
                                // Update the highlighted track when "Next" is pressed
                                setHighlightedTrack((prevTrack) =>
                                    prevTrack !== null ? prevTrack + 1 : null
                                );
                            }}
                        >
                            <img src={nextButton} className="h-8 w-8 hover:scale-110 transition-transform opacity-60" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

Player.propTypes = {
    accessToken: PropTypes.string,
    trackUri: PropTypes.string,
    songQueue: PropTypes.array.isRequired,
    currentSongIndex: PropTypes.number.isRequired,
    chooseTrack: PropTypes.func.isRequired,
    playNext: PropTypes.func.isRequired,
    playPrevious: PropTypes.func.isRequired,
};

export default Player;

