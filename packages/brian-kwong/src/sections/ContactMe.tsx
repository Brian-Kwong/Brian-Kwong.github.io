import React from "react";

import "../components/Components.css";
import Button from "../components/Button";
import ContactForm from "../components/ContactForm";
import ChatBot from "../components/ChatBot";

import styles from "./ContactMe.module.css";

import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const ContactMe: React.FC = () => {
    const [contactMethod, setContactMethod] = React.useState<
        "form" | "chatbot" | "undecided"
    >("undecided");

    const [secondaryContactMethod, setSecondaryContactMethod] = React.useState<
        "email" | "github" | "linkedin" | null
    >(null);

    React.useEffect(() => {
        if (!secondaryContactMethod) return;
        const timeout = setTimeout(() => {
            setSecondaryContactMethod(null);
        }, 100);
        if (secondaryContactMethod === "email") {
            window.location.href = "mailto:brianl200486@gmail.com";
        } else if (secondaryContactMethod === "github") {
            window.open("https://github.com/brian-kwong", "_blank");
        } else if (secondaryContactMethod === "linkedin") {
            window.open(
                "https://www.linkedin.com/in/brian-kwong-b68215249/",
                "_blank"
            );
        }
        return () => clearTimeout(timeout);
    }, [secondaryContactMethod]);

    return (
        <div className="sectionContainer">
            <div className={styles.contactMeSection + " vstack"}>
                {contactMethod === "undecided" && (
                    <>
                        <h1>Contact Me</h1>
                        <div className={styles.linksContainer}>
                            <Button
                                isSelected={secondaryContactMethod === "email"}
                                icon={<MdOutlineMail className={styles.icon} />}
                                onClick={() =>
                                    setSecondaryContactMethod("email")
                                }
                            />
                            <Button
                                isSelected={
                                    secondaryContactMethod === "linkedin"
                                }
                                icon={<FaLinkedin className={styles.icon} />}
                                onClick={() =>
                                    setSecondaryContactMethod("linkedin")
                                }
                            />
                            <Button
                                isSelected={secondaryContactMethod === "github"}
                                icon={<FaGithub className={styles.icon} />}
                                onClick={() =>
                                    setSecondaryContactMethod("github")
                                }
                            />
                        </div>
                    </>
                )}
                {contactMethod !== "undecided" && (
                    <div className={styles.backButtonSection}>
                        <Button
                            icon={<IoIosArrowBack className={styles.icon} />}
                            onClick={() => setContactMethod("undecided")}
                        />
                        <h3>
                            {contactMethod === "chatbot"
                                ? "AI Assistant"
                                : "Contact Form"}
                        </h3>
                    </div>
                )}
                {contactMethod === "chatbot" && <ChatBot />}
                {contactMethod === "form" && <ContactForm />}

                {contactMethod === "undecided" && (
                    <div className={styles.chatChoiceSection}>
                        <Button
                            icon={<AiFillStar className={styles.icon} />}
                            showText={true}
                            text="AI Assistant"
                            onClick={() => setContactMethod("chatbot")}
                        />
                        <Button
                            icon={
                                <FaEnvelopeOpenText className={styles.icon} />
                            }
                            showText={true}
                            text="Contact Form"
                            onClick={() => setContactMethod("form")}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactMe;
