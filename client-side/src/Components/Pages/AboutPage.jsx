import devan from './images/devan.png'
import jadyn from './images/jadyn.png'
import abigail from './images/abigail.png'
import tequan from './images/tequan.png'
import noor from './images/noor.png'
import abdullah from './images/abdullah.png'

const AboutPage = () => {
    return (
        <section className="pt-20 px-60 bg-black/70">
            <div className="lg:gap-xl-12 grid gap-x-20 md:grid-cols-2 xl:grid-cols-3 pt-2">
                <div className="mb-12 bg-gradient-to-b from-black/30 to-black/95 rounded-full p-20 transition-transform hover:scale-105 shadow-2xl">
                    <img src={abigail}
                        className="mx-auto mb-6 rounded-full shadow-lg dark:shadow-black/20 w-56 h-56" />
                    <p className="mb-2 font-bold text-center black/80 text-green-600">Abigail Roberts</p>
                    <p className="text-neutral-500 dark:text-gray-300 text-center">WCCI Student</p>
                    <p className="text-neutral-500/ dark:text-white/50 p-3 text-xs text-center">Graduating with a bachelors degree in forensic science from Eastern Kentucky University in 2022, I quickly shifted paths of what I wanted to do with my life. I have always had a passion for technology, whether it be an interest in programming, or building computers from the ground up, I knew that working in the tech industry was where I was meant to be. I am an aspiring fullstack web developer, and I hope to soon make my dreams a reality after finishing the We Can Code IT bootcamp.</p>
                </div>
                <div className="mb-12 bg-gradient-to-b from-black/30 to-black/95 rounded-full p-20 transition-transform hover:scale-105 shadow-2xl">
                    <img src={devan}
                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 w-56 h-56" />
                    <p className="mb-2 font-bold text-center text-green-600">Devan Spears</p>
                    <p className="text-neutral-500 dark:text-gray-300 text-center">WCCI Student</p>
                    <p className="text-neutral-500/ dark:text-white/50 p-3 text-center">Why hello! I am a FullStack developer that specializes in Java and Java Script. I have had a passion for coding for quite some time and now, with the help of WCCI, I am able to pursue that passion</p>
                </div>
                <div className="mb-12 bg-gradient-to-b from-black/30 to-black/95 rounded-full p-20 transition-transform hover:scale-105 shadow-2xl">
                    <img src={jadyn}
                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 w-56 h-56" />
                    <p className="mb-2 font-bold text-center text-green-600">Jadyn Asamoah</p>
                    <p className="text-neutral-500 dark:text-gray-300 text-center">WCCI Student</p>
                    <p className="text-neutral-500/ dark:text-white/50 p-3 text-xs text-center">Coming from a small country like Ghana, I have always aspired to one day help create solutions to better the community that made me. During my study for a degree in Biophysics at North Carolina A & T, my journey has led me to discover my true passion lies in technology, particularly computers and the internet. I am now an aspiring fullstack web developer & software engineer, eager to embark on a dynamic career in the world of web development, where science and technology converge to create innovative solutions. -- all around the world.</p>
                </div>
            </div>

            <div className="lg:gap-xl-12 grid gap-x-20 md:grid-cols-2 xl:grid-cols-3 pt-2">
                <div className="mb-12 bg-gradient-to-b from-black/30 to-black/95 rounded-full p-20 transition-transform hover:scale-105 shadow-2xl">
                    <img src={tequan}
                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 w-56 h-56" />
                    <p className="mb-2 font-bold text-center text-green-600">Tequan Browning</p>
                    <p className="text-neutral-500 dark:text-gray-300 text-center">WCCI Student</p>
                    <p className="text-neutral-500/ dark:text-white/50 p-3 text-xs text-center">
                        Graduated DePaul University in 2018 with a BA in Political Science, I changed my career path to software development because of the ever growing field of technology and it ways of helping those in need.</p>
                </div>
                <div className="mb-12 bg-gradient-to-b from-black/30 to-black/95 rounded-full p-20 transition-transform hover:scale-105 shadow-2xl">
                    <img src={abdullah}
                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 w-56 h-56" />
                    <p className="mb-2 font-bold text-center text-green-600 ">Abdullah Abuharb</p>
                    <p className="text-neutral-500 dark:text-gray-300 text-center">WCCI Student</p>
                    <p className="text-neutral-500/ dark:text-white/50 p-3 text-xs text-center">I was initially drawn to the Java Full Stack Bootcamp due to my deep-rooted fascination with technology and a desire to be at the forefront of web development. Javas reputation as a versatile and powerful language, particularly in backend development, intrigued me. I knew that mastering Java would open doors to exciting opportunities in the tech industry.</p>
                </div>
                <div className="mb-12 bg-gradient-to-b from-black/30 to-black/95 rounded-full p-20 transition-transform hover:scale-105 shadow-2xl">
                    <img src={noor}
                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 w-56 h-56" />
                    <p className="mb-2 font-bold text-center text-green-600">Noor Abutaha</p>
                    <p className="text-neutral-500 dark:text-gray-300 text-center">WCCI Student</p>
                    <p className="text-neutral-500/ dark:text-white/50 p-3 text-xs text-center">Im excited about the prospect of diving into the world of web development and gaining proficiency in the latest tools and frameworks. This bootcamp provides an ideal platform for me to enhance my skills and knowledge, empowering me to create dynamic and user-friendly web applications that can make a positive impact.</p>
                </div>
            </div>

        </section>
    )
}
export default AboutPage
