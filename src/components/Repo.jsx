// Repo.jsx
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";

import AnimatedTitle from "./AnimatedTitle";
import ProjectCard from "./ProjectCards";

gsap.registerPlugin(ScrollTrigger);

const Repo = () => {
    const repoRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const welcomeTextRef = useRef(null);
    const projectsRef = useRef(null);

    const { contextSafe } = useGSAP({ scope: repoRef });

    // Sample project data
    const projects = [
        {
            title: "Portfolio Website",
            description: "My personal portfolio website...",
            imageUrl: "/img/Portfolio.png",
            demoUrl: "",
            githubUrl: "https://github.com/deckercr/Portfolio-Website",
        },
        {
            title: "C# MVC: SmithSwimmingScool",
            description: "Full-stack web application using C# MVC...",
            imageUrl: "/img/Smith.png",
            demoUrl: "",
            githubUrl: "https://github.com/deckercr/SmithSwimmingSchool",
        },
        {
            title: "CourseMate: Course Management App",
            description: "A simple course manager application...",
            imageUrl: "/img/CourseMate.png",
            demoUrl: null,
            githubUrl: "https://github.com/deckercr/MyBook/tree/main/ProjectOne",
        },
        {
            title: "C++ Project: Binary Search Algorithms",
            description: "A simple binary search algor...",
            imageUrl: "/img/C++.png",
            demoUrl: "",
            githubUrl: "https://github.com/deckercr/BinarySearchAlgorithms/tree/main"
        }
    ];

    useEffect(() => {
        const titleElement = titleRef.current;
        const imageElement = imageRef.current;
        const welcomeElement = welcomeTextRef.current;
        const projectsElement = projectsRef.current;
        const maskElement = titleElement.querySelector('.title-mask'); // Get the mask element


        // Initial states
        gsap.set(titleElement, { opacity: 0, y: 50 });
        gsap.set(welcomeElement, { opacity: 0, y: 20 });
        gsap.set(imageElement, { opacity: 0 });
        gsap.set(projectsElement, { opacity: 0, x: 50 });
        gsap.set(maskElement, { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }); // Initial mask state


        // Create master timeline
        const masterTl = gsap.timeline({ paused: true });

        // Welcome text animation
        const welcomeTl = gsap.timeline();
        welcomeTl.to(welcomeElement, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.inOut"
        });

        // Title animation (including mask)
        const titleTl = gsap.timeline();
        titleTl.to(titleElement, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.inOut",
        })
            .to(maskElement, {
                clipPath: "polygon(100% 0, 10% 100%, 100% 100%)",
                duration: 1.5,
                ease: "power2.inOut",
            }, "-=0.8"); // Start the mask animation slightly before title animation ends


        // Image animation
        const imageTl = gsap.timeline();
        imageTl
            .to(imageElement, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.inOut"
            })
            .to(imageElement, {
                clipPath: "polygon(0 40%, 100% 0%, 100% 60%, 0% 100%)",
                duration: 1.5,
                ease: "power2.inOut"
            }, "-=0.3")
            .to(projectsElement, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=0.5");


        // Add sequences to master timeline
        masterTl
            .add(welcomeTl, 0)
            .add(titleTl, 0.2) // Adjust timing as needed
            .add(imageTl, 0.4); // Adjust timing as needed
        // Create ScrollTrigger
        const st = ScrollTrigger.create({
            trigger: repoRef.current,
            start: "top 70%",
            end: "bottom top",
            onEnter: () => masterTl.play(),
            onLeave: () => masterTl.reverse(),
            onEnterBack: () => masterTl.play(),
            onLeaveBack: () => masterTl.reverse(),
            markers: false,
        });

        return () => {
            masterTl.kill();
            st.kill();
        };
    }, []);

    return (
        <div
            id="repo"
            className="min-h-screen w-screen relative pt-16"
            ref={repoRef}
        >
            {/* Title Section */}
            <div className="relative w-full z-10 mt-12" ref={titleRef}>
                <div className="relative mb-8 flex flex-col items-center gap-5">
                    <p
                        className="font-general text-sm uppercase md:text-lg welcome-text" // Added class
                        ref={welcomeTextRef}
                    >
                        Welc<b>o</b>me t<b>o</b> <span>CRD Tech S</span><b>o</b><span>luti</span><b>o</b><span>ns</span>
                    </p>

                    <AnimatedTitle
                        title="expl<b>o</b>re my repo <br /> my latest pr<b>o</b>jects"
                        containerClass="mt-5 !text-black text-center" //Added text color
                        specialFont={true} // Added specialFont prop

                    />


                    <div className="text-white relative max-w-96 mx-auto text-center font-circular-web text-lg md:max-w-[34rem] mt-6">
                        <p>Ready to build something amazing together?</p>
                        <p className="text-white">
                        Dive into my GitHub repo and explore the code behind the magic!
                        </p>
                    </div>
                </div>
            </div>

            {/* Image and Projects Section - Combined */}
            <div className="relative h-[22vh] w-screen flex justify-center items-center mt-4">
                <div className="mask-clip-path absolute w-[100%] max-w-[1700px] h-full"
                     ref={imageRef}>
                    <img
                        src="img/repo.png"
                        alt="Background"
                        className="absolute left-0 top-0 size-full object-cover"
                    />
                </div>
                {/* Project Grid - Single Row, Horizontal Scroll, Centered, Semi-Transparent, Moved Up */}
                <div ref={projectsRef} className="absolute z-20  px-4 sm:px-6 lg:px-8 w-full overflow-x-auto top-1/4"> {/* Moved Up */}
                    <div className="flex gap-8 whitespace-nowrap justify-center"> {/* Centered */}
                        {projects.map((project, index) => (
                            <div key={index} className="bg-white/50 backdrop-blur-md bg-opacity-50"> {/* Semi-Transparent */}
                                <ProjectCard {...project} className="bg-white/20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Repo;