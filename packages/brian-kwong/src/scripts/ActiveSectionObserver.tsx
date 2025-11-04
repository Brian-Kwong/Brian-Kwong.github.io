import React from "react";

const ActiveSectionObserver = ({ threshold = 0.1 }) => {
    const [activeSections, setActiveSections] = React.useState<
        Map<string, number>
    >(
        new Map([
            ["about-me", 0],
            ["projects", 0],
            ["experience", 0],
            ["education", 0],
            ["contact-me", 0],
        ])
    );
    const sections = React.useRef<HTMLElement[]>([]);
    React.useEffect(() => {
        sections.current = Array.from(document.querySelectorAll("section"));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSections((prev) => {
                            const newMap = new Map(prev);
                            newMap.set(
                                entry.target.id,
                                entry.intersectionRatio
                            );
                            return newMap;
                        });
                    } else {
                        setActiveSections((prev) => {
                            const newMap = new Map(prev);
                            newMap.set(entry.target.id, 0);
                            return newMap;
                        });
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
        activeSections: Array.from(activeSections.entries())
            .filter(([, ratio]) => ratio > 0)
            .map(([section]) => section),
        selectedSection:
            Array.from(activeSections.entries()).sort(
                (a, b) => b[1] - a[1]
            )[0]?.[0] || null,
    };
};

export default ActiveSectionObserver;
