import { NavBar } from "./components/NavBar";
import AboutMe from "./sections/AboutMe";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import ContactMe from "./sections/ContactMe";

function App() {
    return (
        <div className="App">
            <NavBar />
            <section id="about-me">
                <AboutMe />
            </section>
            <section id="projects">
                <Projects />
            </section>
            <section id="experience">
                <Experience />
            </section>
            <section id="education">
                <Education />
            </section>
            <section id="contact-me">
                <ContactMe />
            </section>
        </div>
    );
}

export default App;
