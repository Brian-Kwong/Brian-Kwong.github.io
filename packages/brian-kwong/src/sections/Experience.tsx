import React from "react";
import ExperienceCard from "../components/ExperienceCard";
import experienceData from "../data/experience.json";

import { resolveExprIconString } from "../components/Icons";

const Experience: React.FC = () => {
    return (
        <div className="sectionContainer">
            <h1>Experience</h1>
            <div className="vstack">
                {experienceData.map((exp, index) => (
                    <ExperienceCard
                        key={index}
                        location={`${exp.company} ${exp.location}`}
                        from={exp.from}
                        to={exp.to}
                        position={exp.title}
                        gpa={0}
                        keyCourses={exp.keySkills}
                        icon={resolveExprIconString(exp.icon)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Experience;
