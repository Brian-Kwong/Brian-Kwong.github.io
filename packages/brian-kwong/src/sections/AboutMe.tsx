import React from "react";
import { useMediaQuery } from "react-responsive";

import "../components/Components.css";
import styles from "./AboutMe.module.css";
import Tag from "../components/Tag";

// Icons
import { BsGlobe } from "react-icons/bs";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { FaPaintBrush } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";

const AboutMe: React.FC = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <div className="sectionContainer">
            <div className="hstack">
                <div className="about-me-section">
                    <h1>About Me</h1>
                    {isMobile && (
                        <img
                            fetchPriority="high"
                            className={styles.profilePicture}
                            src="./profilePic.webp"
                            alt="Profile Picture"
                        />
                    )}
                    <p
                        style={{
                            textAlign: "left",
                        }}
                    >
                        Hi, my name is Brian and I'm a new computer science
                        graduate from Cal Poly. Originally from the SGV, my
                        interests are centered around creating fun, interactive
                        and impactful web, mobile, and game projects. In
                        particular I have special interest and experience in
                        frontend development and user-experience design.
                        Additionally I have interest in large scale systems
                        engineering and product research/management. During my
                        free time, I enjoy traveling, digital media creations
                        and hanging out playing with friends over video games. I
                        hope we are able to connect soon!
                    </p>
                    <div className={styles.tagContainer}>
                        <Tag
                            icon={<BsGlobe className={styles.icon} />}
                            label="Web Development"
                        />
                        <Tag
                            icon={
                                <IoPhonePortraitSharp className={styles.icon} />
                            }
                            label="Mobile Development"
                        />
                        <Tag
                            icon={<IoGameController className={styles.icon} />}
                            label="Game Development"
                        />
                        <Tag
                            icon={<FaPaintBrush className={styles.icon} />}
                            label="UI UX Design"
                        />
                        <Tag
                            icon={<GrSystem className={styles.icon} />}
                            label="Systems Design & Engineering"
                        />
                    </div>
                </div>
                {!isMobile && (
                    <img
                        fetchPriority="high"
                        className={styles.profilePicture}
                        src="./profilePic.webp"
                        alt="Profile Picture"
                    />
                )}
            </div>
        </div>
    );
};

export default AboutMe;
