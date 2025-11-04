import React from "react";
import { NavBar } from "./components/NavBar";
import AboutMe from "./sections/AboutMe";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import ContactMe from "./sections/ContactMe";

import ActiveSectionObserver from "./scripts/ActiveSectionObserver";

function App() {
    const { activeSections, selectedSection } = ActiveSectionObserver({
        threshold: 0.15,
    });
    const [selected, setSelected] = React.useState<string>(
        selectedSection?.toLowerCase() || "about-me"
    );

    React.useEffect(() => {
        if (selectedSection) {
            if (selectedSection.toLowerCase() === "about-me") {
                window.history.replaceState(null, "", window.location.pathname);
            } else if (
                window.location.hash.slice(1).toLowerCase() !==
                selectedSection.toLowerCase()
            ) {
                window.history.replaceState(
                    null,
                    "",
                    `#${selectedSection.toLowerCase()}`
                );
            }
            setSelected(selectedSection.toLowerCase());
        }
    }, [selectedSection, setSelected]);

    return (
        <div className="App">
            <nav>
                <NavBar selected={selected} />
            </nav>
            <main id="top">
                <section
                    id="about-me"
                    className={
                        activeSections.includes("about-me") ? "visible" : ""
                    }
                >
                    <AboutMe />
                </section>
                <section
                    id="projects"
                    className={
                        activeSections.includes("projects") ? "visible" : ""
                    }
                >
                    <Projects />
                </section>
                <section
                    id="experience"
                    className={
                        activeSections.includes("experience") ? "visible" : ""
                    }
                >
                    <Experience />
                </section>
                <section
                    id="education"
                    className={
                        activeSections.includes("education") ? "visible" : ""
                    }
                >
                    <Education />
                </section>
                <section
                    id="contact-me"
                    className={
                        activeSections.includes("contact-me") ? "visible" : ""
                    }
                >
                    <ContactMe />
                </section>
            </main>
        </div>
    );
}

export default App;
