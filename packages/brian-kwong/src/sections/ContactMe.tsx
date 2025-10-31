import React from "react";

import "../components/Components.css";
import Button from "../components/Button";
import Input from "../components/Input";

import styles from "./ContactMe.module.css";

import { MdOutlineMail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import Toast from "../components/Toast";

import { CiCircleCheck } from "react-icons/ci";

const ContactMe: React.FC = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [showToast, setShowToast] = React.useState(false);

    return (
        <div className="sectionContainer">
            <div className={styles.contactMeSection + " vstack"}>
                <h1>Contact Me</h1>
                <div className={styles.linksContainer}>
                    <Button
                        text="Email"
                        icon={<MdOutlineMail className={styles.icon} />}
                        onClick={() =>
                            (window.location.href =
                                "mailto:your.email@example.com")
                        }
                    />
                    <Button
                        text="LinkedIn"
                        icon={<FaLinkedin className={styles.icon} />}
                        onClick={() =>
                            window.open(
                                "https://www.linkedin.com/in/yourprofile",
                                "_blank"
                            )
                        }
                    />
                    <Button
                        text="GitHub"
                        icon={<FaGithub className={styles.icon} />}
                        onClick={() =>
                            window.open(
                                "https://github.com/yourprofile",
                                "_blank"
                            )
                        }
                    />
                </div>
                <div className={styles.formContainer}>
                    <Input
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Message"
                        value={message}
                        type="multiline"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className={styles.submitButton}>
                    <Button text="Submit" showText={true} onClick={() => setShowToast(true)} />
                </div>
            </div>
            <Toast icon={<CiCircleCheck />} showToast={showToast} setShowToast={setShowToast} title="Message Sent Successfully" message="We will get back to you shortly." />
        </div>
    );
};

export default ContactMe;
