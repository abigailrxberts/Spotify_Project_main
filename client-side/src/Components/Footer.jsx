
import spotifyLogo from './Pages/Images/spotifyLogo.png';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="bg-black text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src={spotifyLogo} alt="Spotify Logo" className="w-8 h-8 mr-2" />
                    <p className="text-lg font-semibold">Spotify Buddy</p>
                </div>
                <p className="text-sm">Not Officially Affiliated With Spotify©</p>
                <div className="cursor-pointer" onClick={scrollToTop}>
                    <p className="text-sm hover:underline hover:text-green-600">Back to Top</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
