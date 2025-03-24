import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import clsx from "clsx";

const TechCard = ({ icon, name, description, type, delay }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        // Entrance animation
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: delay,
            }
        );

        // Hover effect - simplified
        const hoverTween = gsap.to(cardRef.current, {
            scale: 1.05,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Stronger shadow on hover
            duration: 0.3,
            ease: "power2.out",
            paused: true, // Start paused
            overwrite: "auto",
        });

        const handleMouseEnter = () => {
            hoverTween.play();
            cardRef.current.classList.add("z-10"); // Add z-index here
        };

        const handleMouseLeave = () => {
            hoverTween.reverse();
            cardRef.current.classList.remove("z-10"); // Remove z-index here
        };

        cardRef.current.addEventListener("mouseenter", handleMouseEnter);
        cardRef.current.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (cardRef.current) {
                cardRef.current.removeEventListener("mouseenter", handleMouseEnter);
                cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
            }
            // Kill the tween to prevent memory leaks
            hoverTween.kill();
        };
    }, [delay]);

    return (
        <div
            ref={cardRef}
            className={clsx(
                "group relative flex h-48 w-64 cursor-pointer flex-col rounded-lg border border-gray-300 bg-white/30 backdrop-blur-md p-4 shadow-md transition-all duration-300",
            )}
        >
            <div className="flex-center mb-2">
                {/* Increased icon size */}
                <img src={icon} alt={name} className="h-16 w-16 object-contain rounded-lg" />
            </div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-amber-50">{description}</p>
            <div className="mt-auto">
        <span
            className={clsx(
                "rounded-full px-3 py-1 text-xs font-semibold",
                type === "Front-End" && "bg-blue-100 text-blue-800",
                type === "Back-End" && "bg-green-100 text-green-800",
                type === "Full-Stack" && "bg-purple-100 text-purple-800"
            )}
        >
          {type}
        </span>
            </div>
        </div>
    );
};

const TechCards = () => {
    const techData = [
        {
            icon: "/img/React.png",
            name: "React",
            description: "Extensive experience building interactive UIs.",
            type: "Front-End",
        },
        {
            icon: "/img/ASP_MVC.jpg",
            name: "ASP.NET MVC",
            description: "Experience with building scalable web applications.",
            type: "Back-End",
        },
        {
            icon: "/img/Python.png",
            name: "Python",
            description: "Proficient in Python for data analysis and scripting.",
            type: "Back-End",
        },
        {
            icon: "/img/C_Sharp.png",
            name: "C#",
            description: "Solid understanding of C# and .NET development.",
            type: "Back-End",
        },
        {
            icon: "/img/Tailwind.jpg",
            name: "Tailwind CSS",
            description: "Utilize Tailwind for rapid and responsive styling.",
            type: "Front-End",
        },
        {
            icon: "/img/Node.webp",
            name: "Node.js",
            description: "Experience in building RESTful APIs and server-side applications.",
            type: "Back-End",
        },
    ];

    return (
        <div className="flex flex-wrap gap-4">
            {techData.map((tech, index) => (
                <TechCard
                    key={index}
                    icon={tech.icon}
                    name={tech.name}
                    description={tech.description}
                    type={tech.type}
                    delay={index * 0.1} // Staggered animation delay
                />
            ))}
        </div>
    );
};

export default TechCards;