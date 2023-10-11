import PropTypes from "prop-types";
import useAuth from "../useAuth";
import { useState, useEffect, useRef, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackResult from "../TrackResult";
import Player from "../Player"
import video from './Images/VideoBackground.mp4'
import spotifyLogo from './Images/spotifyLogo.png';
import Footer from "../Footer";
import About from './AboutPage';
import Contact from './ContactPage'



// Spotify API Setup
const spotifyApi = new SpotifyWebApi({
    clientId: '45c46466ae4e4c91bda130a903e773df',
});

const HomePage = ({ code }) => {
    // Nav Functionality
    const [visibleSections, setVisibleSections] = useState({ about: false, contact: false });


    const sectionRefs = {
        welcome: useRef(null),
        welcomeQuote: useRef(null),
        content1: useRef(null),
        content2: useRef(null),
        picks: useRef(null),
        creators: useRef(null),
        about: useRef(null),
        contact: useRef(null)
    };

    const handleScroll = useCallback(() => {
        const sectionRefsValues = Object.values(sectionRefs);

        const updatedVisibleSections = {};

        for (let i = sectionRefsValues.length - 1; i >= 0; i--) {
            const ref = sectionRefsValues[i];
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const sectionName = ref.current.getAttribute('data-section-name');
                updatedVisibleSections[sectionName] = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.1;
            }
        }

        setVisibleSections(updatedVisibleSections);
    }, [sectionRefs]);

    const scrollToSection = (sectionName) => {
        const targetSectionRef = sectionRefs[sectionName];
        if (targetSectionRef && targetSectionRef.current) {
            const offsetTop = targetSectionRef.current.offsetTop - 100; // Adjust the -20 value to your desired spacing
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    };



    useEffect(() => {
        const initialCheck = () => {
            handleScroll();
        };

        window.addEventListener('scroll', handleScroll);
        initialCheck(); // Initial check
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);



    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isSearchFocused, setSearchFocused] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleSearchFocus = () => {
        setSearchFocused(true);
    };

    const handleSongSelection = () => {
        setSearchFocused(false);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (searchResults.length > 0) {
                handleSongSelection();
            }
        } else if (e.key === 'Escape') {
            setSearchResults([])
        }
    };

    // Access Token Setup
    const accessToken = useAuth(code);

    // Intro
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!accessToken) return;

        const fetchUserData = async () => {
            try {
                const response = await spotifyApi.getMe();
                setUserData(response.body);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (accessToken) {
            fetchUserData();
        } else {
            console.log('No access token available');
        }
    }, [accessToken]);


    // Player
    const [search, setSearch] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch('');
    }


    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken]);


    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;
        let cancel = false;
        spotifyApi.searchTracks(search, { limit: 10 })
            .then((res) => {
                if (cancel) return;
                setSearchResults(
                    res.body.tracks.items.map((track) => {
                        const smallImage = track.album.images.reduce((smallest, image) => {
                            if (image.height < smallest.height) return image;
                            return smallest;
                        }, track.album.images[0]);
                        return {
                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            albumUrl: smallImage.url,
                        };
                    })
                );
            });
        return () => {
            cancel = true;
        };
    }, [search, accessToken]);



    // Liked Tracks
    const [likedTracks, setLikedTracks] = useState([]);

    useEffect(() => {
        const fetchLikedTracks = async () => {
            try {
                const response = await spotifyApi.getMySavedTracks({
                    limit: 5,
                });

                const likedTracksData = response.body.items.map((item) => item.track);
                setLikedTracks(likedTracksData);
            } catch (error) {
                console.error('Error fetching liked tracks:', error);
            }
        };

        if (accessToken) {
            fetchLikedTracks();
        } else {
            console.log('No access token available');
        }
    }, [accessToken]);

    // Top Tracks
    const [topTracks, setTopTracks] = useState([]);

    useEffect(() => {
        const fetchTopTracks = async () => {
            try {
                const response = await spotifyApi.getMyTopTracks({
                    time_range: 'short_term',
                    limit: 5,
                });

                const topTracksData = response.body.items;
                setTopTracks(topTracksData);
            } catch (error) {
                console.error('Error fetching top tracks:', error);
            }
        };

        if (accessToken) {
            fetchTopTracks();
        } else {
            console.log('No access token available');
        }
    }, [accessToken]);

    // Artists You Follow
    const [artistsYouFollow, setArtistsYouFollow] = useState([]);

    useEffect(() => {
        const fetchArtistsYouFollow = async () => {
            try {
                const response = await spotifyApi.getFollowedArtists({
                    limit: 5,
                });

                const artistsYouFollowData = response.body.artists.items;
                setArtistsYouFollow(artistsYouFollowData);
            } catch (error) {
                console.error('Error fetching artists you follow:', error);
            }
        };

        if (accessToken) {
            fetchArtistsYouFollow();
        } else {
            console.log('No access token available');
        }
    }, [accessToken]);

    // Top Albums
    const [topAlbums, setTopAlbums] = useState([]);


    useEffect(() => {
        const fetchTopAlbums = async () => {
            try {
                if (!accessToken) {
                    return;
                }

                const response = await spotifyApi.getMyTopArtists({
                    time_range: 'short_term',
                    limit: 5
                });

                const topArtistsData = response.body.items;
                const topAlbumsPromises = topArtistsData.map(async (artist) => {
                    const albumsResponse = await spotifyApi.getArtistAlbums(artist.id, {
                        limit: 1,
                    });
                    return albumsResponse.body.items[0];
                });

                const topAlbumsData = await Promise.all(topAlbumsPromises);
                setTopAlbums(topAlbumsData);
            } catch (error) {
                console.error('Error fetching top albums:', error);
            }
        };

        if (accessToken) {
            fetchTopAlbums();
        }
    }, [accessToken]);

    // Playlists
    const [userPlaylists, setUserPlaylists] = useState([]);
    useEffect(() => {
        const fetchUserPlaylists = async () => {
            try {
                if (!accessToken) {
                    return;
                }

                const response = await spotifyApi.getUserPlaylists({
                    limit: 5,
                });

                const userPlaylistsData = response.body.items;
                setUserPlaylists(userPlaylistsData);
            } catch (error) {
                console.error('Error fetching user playlists:', error);
            }
        };

        if (accessToken) {
            fetchUserPlaylists();
        }
    }, [accessToken]);


    // Featured Playlists
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

    useEffect(() => {
        const fetchFeaturedPlaylists = async () => {
            try {
                if (!accessToken) {
                    return;
                }

                const response = await spotifyApi.getFeaturedPlaylists({
                    limit: 5,
                });

                const featuredPlaylistsData = response.body.playlists.items;
                setFeaturedPlaylists(featuredPlaylistsData);
            } catch (error) {
                console.error('Error fetching featured playlists:', error);
            }
        };

        if (accessToken) {
            fetchFeaturedPlaylists();
        }
    }, [accessToken]);

    // Personal API
    const [suggestion1, setSuggestion1] = useState([]);
    const [suggestion2, setSuggestion2] = useState([]);
    const [suggestion3, setSuggestion3] = useState([]);
    const [suggestion4, setSuggestion4] = useState([]);
    const [suggestion5, setSuggestion5] = useState([]);
    const [suggestion6, setSuggestion6] = useState([]);

    const suggestionUrl = "http://localhost:8080/suggestions";

    useEffect(() => {
        fetchSuggestionName("Abigail Roberts", setSuggestion1)
    }, []);
    useEffect(() => {
        fetchSuggestionName("Jadyn Asamoah", setSuggestion2)
    }, []);
    useEffect(() => {
        fetchSuggestionName("Devan Spears", setSuggestion3)
    }, []);
    useEffect(() => {
        fetchSuggestionName("Tequan Browning", setSuggestion4)
    }, []);
    useEffect(() => {
        fetchSuggestionName("Noor Abutaha", setSuggestion5)
    }, []);
    useEffect(() => {
        fetchSuggestionName("Abdullah Abuharb", setSuggestion6)
    }, []);

    const fetchSuggestionName = async (name, setDataFunction) => {
        let url = suggestionUrl;
        if (name) {
            url += `/name/${name}`;
        } else {
            url += "/all";
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            const data = await response.json();
            setDataFunction(data);
        } catch (error) {
            console.log(error);
        }
    }

    // Queue functionality
    const [currentSongIndex, setCurrentSongIndex] = useState(-1);

    const [songQueue, setSongQueue] = useState([]);

    const addToQueue = (song) => {
        setSongQueue([...songQueue, song]);

        if (currentSongIndex === -1) {
            setCurrentSongIndex(0);
        }
    };

    const playNext = () => {
        if (currentSongIndex < songQueue.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        }
        console.log("Next button clicked. Current song index:", currentSongIndex);
    };

    const playPrevious = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    };


    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // HomePage Starts
    return (
        <section className=" max-w-full flex justify-center">

            <div className="relative">
                <video
                    className="absolute inset-0 w-fit h-full object-cover z-0"
                    autoPlay
                    loop
                    muted
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="bg-black/40 pb-10 w-fit relative z-10">

                    {/* Nav */}
                    <header className='sticky top-0 z-50'>
                        {/* Main Menu */}
                        <nav className='bg-black shadow-2xl w-screen'>
                            <div className='container mx-auto flex justify-center items-center'>
                                <a
                                    href='https://www.spotify.com/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex space-x-4 text-white text-xl font-bold hover:text-gray-300 p-4'
                                >
                                    <img src={spotifyLogo} alt='Spotify logo' className='w-8 h-8 mr-2 cursor-pointer' />
                                    <span>Spotify Buddy</span>
                                </a>
                                <ul className='flex space-x-6 text-white'>
                                    <li onClick={() => scrollToSection('welcome')} className='hover:bg-green-600 rounded-2xl shadow-xl hover:text-black p-2 cursor-pointer'>
                                        Home
                                    </li>

                                    <li onClick={() => scrollToSection('about')} className='hover:bg-green-600 rounded-2xl shadow-xl hover:text-black p-2 cursor-pointer'>
                                        About
                                    </li>
                                    <li onClick={() => scrollToSection('contact')} className='hover:bg-green-600 rounded-2xl shadow-xl hover:text-black p-2 cursor-pointer'>
                                        Contact
                                    </li>
                                    {/* Dropdown Menu */}
                                    <li
                                        className={`relative group ${isDropdownOpen ? 'hover:dropdown-open' : 'hover:dropdown-closed'} -space-x-2`}
                                        onClick={toggleDropdown}
                                    >
                                        <li className='hover:text-green-600 cursor-pointer pt-2'>
                                            More
                                        </li>
                                        <ul
                                            className={`absolute z-10 left-0 mt-4  w-48 p-4  py-6 bg-black/90 shadow-xl text-white transition-opacity duration-300 opacity-0 ${isDropdownOpen ? 'opacity-100 ' : 'opacity-0 pointer-events-none'
                                                }`}
                                        >
                                            <li onClick={() => scrollToSection('content1')} className='hover:text-green-600 rounded-2xl shadow-xl p-2 cursor-pointer' >
                                                Top Tracks
                                            </li>
                                            <li onClick={() => scrollToSection('content2')} className='hover:text-green-600 rounded-2xl shadow-xl p-2 cursor-pointer'>
                                                Playlists
                                            </li>
                                            <li onClick={() => scrollToSection('creators')} className='hover:text-green-600 rounded-2xl shadow-xl p-2 cursor-pointer'>
                                                Our Picks
                                            </li>
                                            <li onClick={() => scrollToSection('about')} className='hover:text-green-600 rounded-2xl shadow-xl p-2 cursor-pointer'>
                                                About The Team
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                {/* Search Input and Results */}
                                <div className="flex items-center ml-auto">
                                    <input
                                        type="text"
                                        placeholder="Search Songs/Artists..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        onFocus={handleSearchFocus}
                                        onKeyDown={handleSearchKeyDown}
                                        className={`group ${isSearchFocused ? 'hover:dropdown-open' : 'hover:dropdown-closed'} bg-gray-600/20 rounded-xl p-2 text-green-600`}
                                    />


                                    {searchResults.length > 0 && (
                                        <ul
                                            className={`absolute z-10 top-10 right-0 mt-7 space-y-2 px-4 py-6 bg-black/90 shadow-xl text-white transition-opacity duration-300 opacity-0 ${isSearchFocused ? 'opacity-100 ' : 'opacity-0 pointer-events-none'
                                                }`}
                                        >
                                            <li>

                                                {searchResults.map((track) => (
                                                    <TrackResult
                                                        key={track.uri}
                                                        track={track}
                                                        chooseTrack={chooseTrack}
                                                        addToQueue={addToQueue}
                                                    />
                                                ))}
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </nav>
                    </header>

                    {/* Profile Banner */}
                    <div className="pt-10 flex justify-center items-center">
                        <div className="bg-black/90 p-4 rounded-3xl flex items-center justify-evenly">
                            <img
                                className="w-8 h-8 rounded-full mr-2 shadow-2xl"
                                src={userData ? (userData.images[0] ? userData.images[0].url : '') : ''}
                                alt={userData ? userData.display_name : 'User Photo'}
                            />
                            <h1 className="text-white font-bold">{userData ? userData.display_name : 'Loading...'}</h1>
                        </div>
                    </div>


                    {/* Intro*/}
                    <section
                        ref={sectionRefs.welcome}
                        data-section-name="welcome"
                        className={`${visibleSections.welcome
                            ? 'opacity-100 translate-y-0 bg-black/80 rounded-2xl shadow-2xl p-10 mx-96 mt-6'
                            : 'opacity-0 bg-black/80 rounded-2xl shadow-2xl p-10 mx-96 mt-6'
                            } transition-opacity duration-500 ease-in-out`}
                    >
                        <h1 className="flex justify-center text-4xl text-white">Welcome to Spotify Buddy ... </h1>
                        <p className="text-green-600 pt-4 text-center"> ... your Ultimate Music Companion! Spotify Buddy is a dynamic and user-centric website that harnesses the power of the Spotify API to offer an immersive music experience like never before. Seamlessly integrating with your Spotify account, this platform provides a personalized insight into your musical world. Discover your top tracks, favorite albums, and most-played playlists with just a click. Dive deep into your music preferences, explore song/playlist recommendations, and stay updated on the latest releases. Whether you are a dedicated music enthusiast or a casual listener, Spotify Buddy Connect tailors its offerings to your unique tastes. Connect, explore, and share your musical journey with friends, all within this intuitive and visually stunning website. Dive into your own musical universe today with Spotify Buddy!</p>
                    </section>

                    <div className="pt-20 pb-2">
                        <section
                            ref={sectionRefs.welcomeQuote}
                            data-section-name="welcomeQuote"
                            className={`${visibleSections.welcomeQuote
                                ? 'opacity-100 translate-y-0 bg-black/80 rounded-2xl shadow-2xl p-20 mx-96 mt-6'
                                : 'opacity-0 bg-black/80 rounded-2xl shadow-2xl p-20 mx-96 mt-6'
                                } transition-opacity duration-500 ease-in-out`}
                        >
                            <h1 className="flex justify-center text-4xl text-white">Your Year So Far ... </h1>
                            <p className="text-green-600 pt-4 text-center text-xl"> ... An assortment of your favorite songs, playlists, artists and albums you have listened to this year.</p>

                        </section>
                    </div>

                    {/* Player */}
                    <section>
                        <div className="fixed bottom-0 left-0 right-0 z-50">
                            <Player
                                accessToken={accessToken}
                                trackUri={playingTrack ? playingTrack.uri : ""}
                                songQueue={songQueue}
                                currentSongIndex={currentSongIndex}
                                setCurrentSongIndex={setCurrentSongIndex}
                                chooseTrack={chooseTrack}
                                playNext={playNext}
                                playPrevious={playPrevious}
                            />



                        </div>
                    </section>

                    {/* Content1 Grid */}
                    <div className="pt-20">
                        <section
                            ref={sectionRefs.content1}
                            data-section-name="content1"
                            className={`${visibleSections.content1
                                ? 'opacity-100 translate-y-0 grid grid-cols-3 gap-8 p-16 max-w-full'
                                : 'opacity-0 grid grid-cols-3 gap-8 p-16 max-w-full'
                                } transition-opacity duration-500 ease-in-out`}
                        >
                            {/* Liked Tracks */}
                            {accessToken && (
                                <section className="bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                    <h2 className="text-white flex justify-center p-6 text-4xl">Liked Tracks</h2>
                                    <ul className="text-green-600">
                                        {likedTracks.map((track) => (
                                            <li key={track.id} className="mb-4">
                                                <div className="flex items-center">
                                                    <div className="mr-4">
                                                        <img
                                                            src={track.album.images[0].url}
                                                            alt={`${track.artists[0].name}'s Photo`}
                                                            className="w-16 h-16 rounded-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-semibold">{track.name}</p>
                                                        <p className="text-gray-500">{track.artists.map((artist) => artist.name).join(', ')}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Top Tracks */}
                            {accessToken && (
                                <section className="bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                    <h2 className="text-white flex justify-center p-6 text-4xl">Top Tracks</h2>
                                    <ul className="text-green-600">
                                        {topTracks.map((track) => (
                                            <li key={track.id} className="mb-4">
                                                <div className="flex items-center">
                                                    <div className="mr-4">
                                                        <img
                                                            src={track.album.images[0].url}
                                                            alt={`${track.artists[0].name}'s Photo`}
                                                            className="w-16 h-16 rounded-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-semibold">{track.name}</p>
                                                        <p className="text-gray-500">{track.artists.map((artist) => artist.name).join(', ')}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            {/* Top Albums */}
                            {accessToken && topAlbums.length > 0 && (
                                <section className="bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                    <h2 className="text-white flex justify-center p-6 text-4xl">Top Albums</h2>
                                    <ul className="text-green-600">
                                        {topAlbums.map((album) => (
                                            <li key={album.id} className="mb-4">
                                                <div className="flex items-center">
                                                    <div className="mr-4">
                                                        <img
                                                            src={album.images[0].url}
                                                            alt={`${album.artists[0].name}'s Album Cover`}
                                                            className="w-16 h-16 rounded-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-semibold">{album.name}</p>
                                                        <p className="text-gray-500">{album.artists.map((artist) => artist.name).join(', ')}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </section>
                    </div>


                    {/* Content2 Grid */}
                    {/* Artists You Follow */}
                    <div>
                        <section
                            ref={sectionRefs.content2}
                            data-section-name="content2"
                            className={`${visibleSections.content2
                                ? 'opacity-100 translate-y-0 grid grid-cols-3 gap-8 p-16 max-w-full'
                                : 'opacity-0 grid grid-cols-3 gap-8 p-16 max-w-full'
                                } transition-opacity duration-500 ease-in-out`}
                        >
                            <section className="bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                <h2 className="text-white flex justify-center p-6 text-4xl">Artists You Follow</h2>
                                <ul className="text-green-600">
                                    {artistsYouFollow.map((artist) => (
                                        <li key={artist.id} className="mb-4">
                                            <div className="flex items-center">
                                                <div className="mr-4">
                                                    <img
                                                        src={artist.images[0].url}
                                                        alt={`${artist.name}'s Photo`}
                                                        className="w-16 h-16 rounded-full"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-semibold">{artist.name}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* User Playlists */}
                            {accessToken && userPlaylists.length > 0 && (
                                <section className="bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                    <h2 className="text-white flex justify-center p-6 text-4xl">Your Playlists</h2>
                                    <ul className="text-green-600">
                                        {userPlaylists.map((playlist) => (
                                            <li key={playlist.id} className="mb-4">
                                                <div className="flex items-center">
                                                    <div className="mr-4">
                                                        <img
                                                            src={playlist.images[0]?.url || 'placeholder_url'}
                                                            alt={`${playlist.name}'s Cover`}
                                                            className="w-16 h-16 rounded-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-semibold">{playlist.name}</p>
                                                        <p className="text-gray-500">{playlist.description}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Featured Playlists */}
                            <section className="bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                <h2 className="text-white flex justify-center p-6 text-4xl">Featured Playlists</h2>
                                <ul className="text-green-600">
                                    {featuredPlaylists.map((playlist) => (
                                        <li key={playlist.id} className="mb-4">
                                            <div className="flex items-center">
                                                <div className="mr-4">
                                                    <img
                                                        src={playlist.images[0].url}
                                                        alt={`${playlist.name}'s Cover`}
                                                        className="w-16 h-16 rounded-full"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-semibold">{playlist.name}</p>
                                                    <p className="text-gray-500">{playlist.description}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </section>
                    </div>

                    {/* Our Songs */}
                    <section
                        ref={sectionRefs.creators}
                        data-section-name="creators"
                        className={`${visibleSections.creators
                            ? 'opacity-100 bg-black/70'
                            : 'opacity-0 bg-black/70'
                            } transition-opacity duration-500 ease-in-out`}
                    >

                        <section>
                            <h1 className="flex justify-center text-4xl text-white shadow-2xl p-10 my-6 mx-96">Top Picks from the Creators</h1>
                            <section
                                ref={sectionRefs.creators}
                                data-section-name="creators"
                                className={`${visibleSections.creators
                                    ? 'opacity-100 translate-y-0 grid grid-cols-3 grid-rows-2 space-y-10 my-4 space-x-10  mx-10 pb-20'
                                    : 'opacity-0 grid grid-cols-3  grid-rows-2 my-4 space-x-10  mx-10 pb-20'
                                    } transition-opacity duration-500 ease-in-out`}
                            >
                                <div className="pt-10">
                                    <p className="text-green-600 pt-4 text-center bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                        <h2 className="text-xl pb-2 text-white">Picks by Abigail</h2>
                                        <div className="grid grid-cols-3 space-x-4 mb-16">
                                            {suggestion1.map((suggestions) => (
                                                <p key={suggestions.id} className="pb-2 text-green-600 font-bold text-md">{suggestions.songArtist}
                                                </p>
                                            ))}
                                            {suggestion1.map((suggestions) => (
                                                <p key={suggestions.id} className="pb-2">{suggestions.songName}
                                                </p>
                                            ))}
                                            {suggestion1.map((suggestions) => (
                                                <p key={suggestions.id} className="pb-2 italic text-sm text-white/60">{suggestions.songDescription}
                                                </p>
                                            ))}
                                        </div>
                                    </p>


                                </div>
                                <p className="text-green-600 pt-4 text-center bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                    <h2 className="text-xl pb-2 text-white">Picks by Devan</h2>
                                    <div className="grid grid-cols-3 space-x-4">
                                        {suggestion3.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 text-green-600 font-bold text-md">{suggestions.songArtist}
                                            </p>
                                        ))}
                                        {suggestion3.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2">{suggestions.songName}
                                            </p>
                                        ))}
                                        {suggestion3.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 italic text-sm text-white/60">{suggestions.songDescription}
                                            </p>
                                        ))}
                                    </div>
                                </p>

                                <p className="text-green-600 pt-4 text-center bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                    <h2 className="text-xl pb-2 text-white">Picks by Jadyn</h2>
                                    <div className="grid grid-cols-3 space-x-4">
                                        {suggestion2.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 text-green-600 font-bold text-md">{suggestions.songArtist}
                                            </p>
                                        ))}
                                        {suggestion2.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2">{suggestions.songName}
                                            </p>
                                        ))}
                                        {suggestion2.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 italic text-sm text-white/60">{suggestions.songDescription}
                                            </p>
                                        ))}
                                    </div>
                                </p>

                                <p className="text-green-600 pt-4 text-center bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                    <h2 className="text-xl pb-2 text-white">Picks by Tequan</h2>
                                    <div className="grid grid-cols-3 space-x-4">
                                        {suggestion4.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 text-green-600 font-bold text-md">{suggestions.songArtist}
                                            </p>
                                        ))}
                                        {suggestion4.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2">{suggestions.songName}
                                            </p>
                                        ))}
                                        {suggestion4.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 italic text-sm text-white/60">{suggestions.songDescription}
                                            </p>
                                        ))}
                                    </div>
                                </p>

                                <p className="text-green-600 pt-4 text-center bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                    <h2 className="text-xl pb-2 text-white">Picks by Noor</h2>
                                    <div className="grid grid-cols-3 space-x-4">
                                        {suggestion5.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 text-green-600 font-bold text-md">{suggestions.songArtist}
                                            </p>
                                        ))}
                                        {suggestion5.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2">{suggestions.songName}
                                            </p>
                                        ))}
                                        {suggestion5.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 italic text-sm text-white/60">{suggestions.songDescription}
                                            </p>
                                        ))}
                                    </div>
                                </p>

                                <p className="text-green-600 pt-4 text-center bg-black/80 rounded-2xl shadow-2xl p-4 hover:scale-105 transition-transform">
                                    <h2 className="text-xl pb-2 text-white">Picks by Abdullah</h2>
                                    <div className="grid grid-cols-3 space-x-4">
                                        {suggestion6.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 text-green-600 font-bold text-md">{suggestions.songArtist}
                                            </p>
                                        ))}
                                        {suggestion6.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2">{suggestions.songName}
                                            </p>
                                        ))}
                                        {suggestion6.map((suggestions) => (
                                            <p key={suggestions.id} className="pb-2 italic text-sm text-white/60">{suggestions.songDescription}
                                            </p>
                                        ))}
                                    </div>
                                </p>


                            </section>
                        </section>
                    </section>
                    {/* About */}
                    <div>
                        <section className="py-10">
                            <section
                                ref={sectionRefs.about}
                                data-section-name="about"
                                className={`${visibleSections.about
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0'
                                    } transition-opacity duration-500 ease-in-out`}
                            >
                                {/* About content */}
                                <About />
                            </section>
                        </section>

                        {/* Contact */}
                        <section>
                            <section
                                ref={sectionRefs.contact}
                                data-section-name="contact">
                                {/* Contact content */}
                                <Contact />
                            </section>
                        </section>
                    </div>

                    {/* Footer */}
                    <footer className="pb-10">
                        <Footer />
                    </footer>
                </div>
            </div>
        </section>
    );
};


HomePage.propTypes = {
    code: PropTypes.node.isRequired,
    currentSongIndex: PropTypes.number.isRequired,
    setCurrentSongIndex: PropTypes.func.isRequired,
}


export default HomePage;
