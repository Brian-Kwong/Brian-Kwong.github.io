import React from "react";

import Button from "../components/Button";

import { TbPackages } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import { MdSchool } from "react-icons/md";
import { MdEmail } from "react-icons/md";

import styles from "./NavBar.module.css";
import ActiveSectionObserver from "../scripts/ActiveSectionObserver";

export const NavBar: React.FC = () => {

    const activeSection = ActiveSectionObserver({ threshold: 0.1 });
    const [selected, setSelected] = React.useState<string>(
        activeSection?.toLowerCase() || "about me"
    );

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    React.useEffect(() => {
        if (activeSection) {
            setSelected(activeSection.toLowerCase());
        }
    }, [activeSection]);

    return (
        <div className={styles["navbar"]}>
            <Button
                ariaLabel="About Me"
                icon={<IoPerson className="icon" />}
                text="About Me"
                isSelected={selected === "about-me"}
                onClick={() => scrollToSection("about-me")}
            />
            <Button
                ariaLabel="Projects"
                icon={<TbPackages className="icon" />}
                text="Projects"
                isSelected={selected === "projects"}
                onClick={() => scrollToSection("projects")}
            />
            <div className={styles.mobileExpr}>
            <Button
                ariaLabel="Experience"
                icon={<MdOutlineWork className="icon" />}
                text="Exper..."
                isSelected={selected === "experience"}
                onClick={() => scrollToSection("experience")}
            />
            </div>
            <div className={styles.desktopExpr}>
                        <Button
                ariaLabel="Experience"
                icon={<MdOutlineWork className="icon" />}
                text="Experience"
                isSelected={selected === "experience"}
                onClick={() => scrollToSection("experience")}
            />
            </div>
            <Button
                ariaLabel="Education"
                icon={<MdSchool className="icon" />}
                text="Education"
                isSelected={selected === "education"}
                onClick={() => scrollToSection("education")}
            />
            <Button
                ariaLabel="Contact Me"
                icon={<MdEmail className="icon" />}
                text="Contact"
                isSelected={selected === "contact-me"}
                onClick={() => scrollToSection("contact-me")}
            />
        </div>
    );
};
