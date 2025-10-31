import React from "react";

import { FaMicrosoft } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

import { FaCode } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";
import { AiOutlineAntDesign } from "react-icons/ai";
import { BsEthernet } from "react-icons/bs";

const resolveActionIconString = (
    iconString: string | undefined
): React.ReactNode => {
    switch (iconString) {
        case "Microsoft":
            return <FaMicrosoft className="icon" />;
        case "Apple":
            return <FaApple className="icon" />;
        case "GitHub":
            return <FaGithub className="icon" />;
        default:
            return <FaExternalLinkAlt className="icon" />;
    }
};

const resolveExprIconString = (
    iconString: string | undefined
): React.ReactNode => {
    switch (iconString) {
        case "Code":
            return <FaCode className="icon" />;
        case "Mobile":
            return <FaMobile className="icon" />;
        case "Design":
            return <AiOutlineAntDesign className="icon" />;
        case "Network":
            return <BsEthernet className="icon" />;
        default:
            return <FaExternalLinkAlt className="icon" />;
    }
};

export { resolveExprIconString, resolveActionIconString };
