// App.jsx
import Repo from "./components/Repo.jsx";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import About from "./components/About.jsx";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const App = () => {
    // Initialize GSAP
    useEffect(() => {
        // Confirm GSAP plugins are loaded
        console.log("ScrollToPlugin registered:", ScrollToPlugin !== undefined);
    }, []);

    // Scroll functions
    const scrollToRepo = () => {
        // Adding a small delay to ensure DOM is ready
        setTimeout(() => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: "#repo", offsetY: 0 }, // Changed offsetY to 0
                ease: "power2.inOut",
                onComplete: () => {
                    // Force trigger ScrollTrigger refresh to ensure animations work
                    if (window.ScrollTrigger) {
                        window.ScrollTrigger.refresh();
                    }
                }
            });
        }, 100);
    };

    const scrollToHero = () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: "power2.inOut",
            onComplete: () => {
                // Force trigger ScrollTrigger refresh
                if (window.ScrollTrigger) {
                    window.ScrollTrigger.refresh();
                }
            }
        });
    };

    const scrollToAbout = () => {
        setTimeout(() => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: "#about", offsetY: 0 },
                ease: "power2.inOut",
                onComplete: () => {
                    // Force trigger ScrollTrigger refresh
                    if (window.ScrollTrigger) {
                        window.ScrollTrigger.refresh();
                    }
                }
            });
        }, 100);
    };

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Navbar scrollToHero={scrollToHero} scrollToRepo={scrollToRepo} scrollToAbout={scrollToAbout} />
            <Hero />
            <Repo />
            <About />
        </main>
    );
};

export default App;