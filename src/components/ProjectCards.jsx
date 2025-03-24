// ProjectCards.jsx
import React from 'react';

const ProjectCards = ({ title, description, imageUrl, demoUrl, githubUrl, className }) => {
    return (
        <div className={`rounded-lg border border-gray-200 p-4 shadow-md transition-transform hover:scale-105 ${className || 'bg-white'}`}>
            <img src={imageUrl} alt={title} className="mb-4 h-48 w-full object-cover rounded-md" />
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="mb-4 text-gray-600">{description}</p>
            <div className="flex space-x-4">
                {demoUrl && (
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        Live Demo
                    </a>
                )}
                {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-800">
                        GitHub
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCards;