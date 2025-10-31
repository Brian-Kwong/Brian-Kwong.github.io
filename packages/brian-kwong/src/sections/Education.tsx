import React from "react";
import ExperienceCard from "../components/ExperienceCard";
import educationData from "../data/education.json";

import { resolveExprIconString } from "../components/Icons";

const Education: React.FC = () => {
    return (
        <div className="sectionContainer">
            <h1>Education</h1>
            <div className="vstack">
                {educationData.map((edu, index) => (
                    <ExperienceCard
                        key={index}
                        location={edu.institution}
                        from={edu.from}
                        to={edu.to}
                        position={`${edu.degree} ${edu.fieldOfStudy ? `${edu.fieldOfStudy}` : ""}`}
                        gpa={edu.gpa}
                        keyCourses={edu.keyCourses}
                        icon={resolveExprIconString(edu.icon)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Education;
