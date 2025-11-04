import React from "react";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects.json";

const Projects: React.FC = () => {
    return (
        <div className="sectionContainer">
            <h1>Projects</h1>
            <div className="vstack">
                {projectsData.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        imageUrls={Array.from(
                            { length: project.numberOfImages || 3 },
                            (_, i) =>
                                `/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}/img${i + 1}`
                        )}
                        imageDirection={project.imageDirection || "auto"}
                        actions={project.actions || []}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
