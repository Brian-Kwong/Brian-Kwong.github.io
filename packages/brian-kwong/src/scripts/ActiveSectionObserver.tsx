import React from "react";

const ActiveSectionObserver = ({ threshold = 0.1 }) => {
    const [activeSections, setActiveSections] = React.useState<string[]>([]);
    const sections = React.useRef<HTMLElement[]>([]);
    React.useEffect(() => {
        sections.current = Array.from(document.querySelectorAll("section"));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSections((prev) => [...prev, entry.target.id]);
                    } else {
                        setActiveSections((prev) =>
                            prev.filter((id) => id !== entry.target.id)
                        );
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
    return {
        activeSections: activeSections,
        selectedSection:
            activeSections.length > 0
                ? activeSections[activeSections.length - 1]
                : null,
    };
};

export default ActiveSectionObserver;
