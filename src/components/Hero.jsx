// Hero.jsx
import TechCards from "./TechCards"; // Import TechCards
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVdRef = useRef(null);
    const containerRef = useRef(null);
    const currentVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos(prev => prev + 1);
    };

    useEffect(() => {
        if (loadedVideos >= totalVideos - 1) {
            setLoading(false);
        }
    }, [loadedVideos]);

    const handleMiniVdClick = () => {
        if (nextVdRef.current) {
            setHasClicked(true);
            setCurrentIndex(prevIndex => (prevIndex % totalVideos) + 1);
        }
    };

    useEffect(() => {
        if (!hasClicked || !nextVdRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set("#next-video", { visibility: "visible" });
            gsap.to("#next-video", {
                transformOrigin: "center center",
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.inOut",
                onStart: () => {
                    if (nextVdRef.current) {
                        nextVdRef.current.play().catch(err => {
                            console.error("Video play failed:", err);
                        });
                    }
                },
            });

            if (currentVideoRef.current) {
                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        });

        return () => ctx.revert();
    }, [hasClicked, currentIndex]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".profile-image", {
                opacity: 1,
                scale: 1,
            });

            gsap.set("#video-frame", {
                clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
                borderRadius: "0% 0% 40% 10%",
            });

            gsap.from("#video-frame", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                borderRadius: "0% 0% 0% 0%",
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: "#video-frame",
                    start: "center center",
                    end: "bottom center",
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

    return (
        <div ref={containerRef} className="relative h-dvh w-screen overflow-x-hidden">
            {loading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}

            <img
                src="/img/ProfileImage.png"
                alt="Rick Decker"
                className="profile-image absolute top-20 right-[10%] z-40 h-40 sm:h-48 md:h-64 lg:h-[35%] w-auto rounded-full object-cover"
            />

            <div className="absolute top-[calc(18%+20%+1rem)] right-[11.4%] z-40 w-auto max-w-[35%]">
                <div className="bg-black bg-opacity-50 rounded-lg p-2">
                    <p className="text-white text-xs md:text-base font-semibold text-left">
                    <span style={{ fontSize: '1.50rem' }}>Carlton "Rick" Decker</span> <br />
                        Full Stack Developer  <br />
                        Retired Navy Veteran <br />
                        Illinois <br />
                        Bachelor CyberSecurity, Aug 2025
                    </p>
                </div>
            </div>

            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <VideoPreview>
                            <div
                                onClick={handleMiniVdClick}
                                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                            >
                                <video
                                    ref={currentVideoRef}
                                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                                    loop
                                    muted
                                    playsInline
                                    id="current-video"
                                    className="size-64 origin-center scale-150 object-cover object-center"
                                    onLoadedData={handleVideoLoad}
                                />
                            </div>
                        </VideoPreview>
                    </div>

                    <video
                        ref={nextVdRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        playsInline
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                    <video
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 drop-shadow-2xl">
                    T<b>E</b>CH
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100 drop-shadow-2xl">
                            redefi<b>n</b>i<b>n</b>g
                        </h1>

                        <div className="mb-5 max-w-[11rem] sm:max-w-60 bg-black bg-opacity-50 rounded-lg p-2">
                            <p className="text-xs sm:text-base font-robert-regular text-center text-blue-100 drop-shadow-2xl">
                                The Digital Forge of <br /> The Phoenix <br /> Code, Create, and Conquer
                            </p>
                        </div>

                        <Button
                            id="watch-trailer"
                            title="Enter my domain"
                            leftIcon={<TiLocationArrow />}
                            containerClass="bg-yellow-100 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                T<b>E</b>CH
            </h1>
            {/* TechCards Integration */}
            <div className="absolute bottom-4 left-4 z-30">
                <TechCards />
            </div>
        </div>
    );
};

export default Hero;