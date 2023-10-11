import React, { useState } from 'react';
import video from "./Pages/Images/VideoBackground2.mp4";
import music from './Pages/Images/Music.wav';
import play from './Pages/Images/play.svg'
import pause from './Pages/Images/pause.svg'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=45c46466ae4e4c91bda130a903e773df&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20user-follow-read%20playlist-read-collaborative%20playlist-read-private%20user-library-read%20user-library-modify%20user-library-read";

const Login = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <section className="h-screen relative flex flex-col justify-center items-center">
            <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="bg-black/20 absolute inset-0"></div>
            <div className="text-center relative z-10">
                <a href={AUTH_URL}>
                    <button
                        className="bg-green-500 hover:bg-black/80 hover:text-green-600 active:scale-95 px-6 py-3 rounded-full shadow-2xl text-lg font-semibold transition duration-300 ease-in-out hover:scale-105"
                    >
                        Log in with Spotify
                    </button>
                </a>
            </div>
            <div className="fixed bottom-0 flex justify-center w-full p-4">
                <button
                    className=" hover:bg-black/70 active:scale-95 px-6 py-2 rounded-full shadow-2xl text-lg font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
                    onClick={toggleAudio}
                >
                    {isPlaying ? <img src={pause} alt="pause" className='w-6 h-6 shadow-2xl' /> : <img src={play} alt="play" className='w-6 h-6 shadow-2xl' />}
                </button>
            </div>
            <audio ref={audioRef} loop>
                <source src={music} type="audio/wav" />
                Your browser does not support the audio tag.
            </audio>
        </section>
    );
};

export default Login;
