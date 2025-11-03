import React from "react";
import { useMediaQuery } from "react-responsive";

import { resolveActionIconString } from "./Icons";

import styles from "./ProjectCard.module.css";
import Tag from "./Tag";
import Button from "./Button";

import "./Components.css";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    imageUrls: string[];
    imageDirection?: string;
    actions?: {
        icon: string;
        text: string;
        link: string;
    }[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    tags,
    imageUrls,
    imageDirection = "auto",
    actions = [],
}) => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <div className={styles["project-card"]}>
            <h2>{title}</h2>
            <div className={isMobile ? "vstack" : "hstack"}>
                {imageUrls.length > 0 && (
                    <div
                        className={`${styles["project-images"]} ${styles[imageDirection]}`}
                    >
                        {imageUrls.map((url, index) => (
                            <img
                                className={styles[imageDirection]}
                                key={index}
                                src={url}
                                alt={`${title} screenshot ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
                <div className={styles["project-details"]}>
                    {tags.length > 0 && (
                        <div className={styles["project-tags"]}>
                            {tags.map((tag, index) => (
                                <Tag key={index} label={tag} />
                            ))}
                        </div>
                    )}
                    <p>{description}</p>
                    <div className={styles["project-actions"]}>
                        {actions.map((action, index) => (
                            <Button
                                key={index}
                                ariaLabel={action.text}
                                showText={true}
                                icon={resolveActionIconString(action.icon)}
                                text={action.text}
                                onClick={() =>
                                    window.open(action.link, "_blank")
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
