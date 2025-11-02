import React from "react";

const ActiveSectionObserver = ({ threshold = 0.1 }) => {
    const [activeSection, setActiveSection] = React.useState<string | null>(
        null
    );
    const sections = React.useRef<HTMLElement[]>([]);
    React.useEffect(() => {
        sections.current = Array.from(document.querySelectorAll("section"));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold }
        );

        sections.current.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.current.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, [threshold]);
    return activeSection;
};

export default ActiveSectionObserver;
