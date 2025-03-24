// About.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaDownload } from 'react-icons/fa'; // Make sure to install this if needed

gsap.registerPlugin(ScrollTrigger);

function About() {
  const containerRef = useRef(null);
  const colorImageRef = useRef(null); // Ref for the color image div
  const buttonRef = useRef(null); // Ref for the button
  const educationCardRef = useRef(null); // Ref for education card
  const workHistoryCardRef = useRef(null); // Ref for work history card
  const cardsContainerRef = useRef(null); // Ref for cards container

  useEffect(() => {
    if (!containerRef.current || !colorImageRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state (important for resetting)
      gsap.set(colorImageRef.current, {
         maskImage: 'url("/img/ink-mask.gif")', // Ensure correct initial mask
         maskSize: 'cover',
         maskPosition: 'center',
         maskRepeat: 'no-repeat',
      });

      // Initial state for cards and button (hidden)
      if (cardsContainerRef.current) {
        gsap.set(cardsContainerRef.current, {
          opacity: 0,
          x: -50, // Changed from y to x for left-to-right animation
        });
      }

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%", // Adjust as needed
        end: "bottom 20%", // Adjust as needed
        markers: false,   // Keep or remove markers

        onEnter: () => {
            //console.log("onEnter");
          // Reset and replay the mask animation
            gsap.set(colorImageRef.current, {
                maskImage: 'url("/img/ink-mask.gif")', // Ensure correct initial mask
                maskSize: 'cover',
                maskPosition: 'center',
                maskRepeat: 'no-repeat',
            });

          // Animate cards and button into view after mask animation
          if (cardsContainerRef.current) {
            gsap.to(cardsContainerRef.current, {
              opacity: 1,
              x: 0, // Animate from left to right
              duration: 1,
              delay: 0.5, // Start after mask animation
              ease: "power2.out",
            });
          }
        },
        onEnterBack: () => {
            //console.log("onEnterBack");
           // Reset on re-entering from above
            gsap.set(colorImageRef.current, {
              maskImage: 'url("/img/ink-mask.gif")',
              maskSize: 'cover',
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
            });

          // Re-animate cards on entering back
          if (cardsContainerRef.current) {
            gsap.to(cardsContainerRef.current, {
              opacity: 1,
              x: 0,
              duration: 1,
              delay: 0.5,
              ease: "power2.out",
            });
          }
        },

        onLeave: () => {  //  IMPORTANT: onLeave resets
            //console.log("onLeave");
          if (cardsContainerRef.current) {
            gsap.to(cardsContainerRef.current, {
              opacity: 0,
              x: -50,
              duration: 0.5,
              ease: "power2.in",
            });
          }
        },
        onLeaveBack: () => { // IMPORTANT:  onLeaveBack resets
          //console.log("onLeaveBack");
          gsap.set(colorImageRef.current, {  // Important: Reset on leaving
              maskImage: 'url("/img/ink-mask.gif?reset=' + new Date().getTime() + '")', // Use a timestamp to force reload
              maskSize: 'cover',
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
            });

          // Hide cards when leaving back
          if (cardsContainerRef.current) {
            gsap.to(cardsContainerRef.current, {
              opacity: 0,
              x: -50,
              duration: 0.5,
              ease: "power2.in",
            });
          }
        }

      });

      return () => {
          st.kill();
      }
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);


  return (
    <div
      id="about"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
      }}
    >
      <div className="mask-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        position: 'relative'
      }}>
        {/* Color Overlay Div */}
        <div
          ref={colorImageRef} // Use the ref here
          className="color-image"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("/img/about-top.png")',
            backgroundSize: 'cover',
            top: 65,
            left: 250,
            width: '80%',
            height: '90%',
            zIndex: 1,

            // Removed mask properties from here.  Managed by GSAP
          }}
        >
        </div>

        {/* Black and White Image */}
        <img
          src="/img/about-background.png"
          alt="Background"
          style={{
            width: '80%',
            height: 'auto',
            objectFit: 'contain',
            zIndex: 0,
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block'
          }}
        />
        
        {/* Card Container - Now positioned absolutely to avoid pushing the background */}
        <div 
          ref={cardsContainerRef}
          className="absolute z-20" 
          style={{
            left: '8%', // Position to the left
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
            maxWidth: '400px', // Limit width
          }}
        >
          {/* Button */}
          <button 
            ref={buttonRef} 
            className="mb-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 flex items-center"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <FaDownload className="mr-2" /> Download Resume
          </button>
          
          {/* Education Card */}
          <div 
            ref={educationCardRef} 
            className="mb-4 bg-violet-300/70 backdrop-blur-md p-6 rounded-lg shadow-md w-full"
          >
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            <p>Bachelor of Science in Cybersecurity</p>
            <p>Expected Graduation: August 2025</p>
            <p>Dean's List Honoree</p>
            <p>-  Summer 2023</p>
            <p>-  Fall 2023</p>
            <p>-  Spring 2024</p>
          </div>
          
          {/* Work History Card */}
          <div 
            ref={workHistoryCardRef} 
            className="bg-violet-300/70 backdrop-blur-md p-6 rounded-lg shadow-md w-full"
          >
            <h2 className="text-xl font-semibold mb-2">Work History</h2>
            <p>United States Navy - Retired</p>
            <p>Sept 2001 - Aug 2023</p>
            <br />
            <p>Absolute Computer Systems</p>
            <p>Kenosha, WI</p>
            <p>Sept 2023 - Aug 2023</p>
            <br />
            <p>Columbia College of Missouri</p>
            <p>Columbia, MO</p>
            <p>Full-time Student</p>
            <p>Sept 2023 - Present</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;