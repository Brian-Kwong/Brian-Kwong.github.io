import React from "react";

import "./Components.css";
import styles from "./ExperienceCard.module.css";
import Tag from "./Tag";

interface ExperienceCardProps {
    location: string;
    from: string;
    to: string;
    position?: string;
    gpa: number;
    keyCourses?: string[];
    icon: React.ReactNode;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    location,
    from,
    to,
    position,
    keyCourses,
    gpa,
    icon,
}) => {
    return (
        <div className={styles.educationCard}>
            <div className={styles.educationHeader}>
                <h2>{position}</h2>
                <span className={styles.educationIcon}>{icon}</span>
            </div>
            <div className={styles.educationHeader}>
                <div className={styles.hstack}>
                    <p className={styles.leftSection}>{location}</p>
                    <p className={styles.leftSection}>{`${from} - ${to}`}</p>
                </div>
                <p className={styles.rightSection}>{`${gpa} GPA`}</p>
            </div>
            <div className={styles.educationBody}>
                {keyCourses && keyCourses.length > 0 && (
                    <>
                        {keyCourses.map((course, index) => (
                            <Tag key={index} label={course} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default ExperienceCard;
