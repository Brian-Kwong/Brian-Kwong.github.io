import React from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import Toast from "../components/Toast";

import styles from "../sections/ContactMe.module.css";

import { submitForm, verifyForm } from "../scripts/ContactFormHandler";

import { CiCircleCheck } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";

const ContactForm: React.FC = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [error, setError] = React.useState("");

    const [showToast, setShowToast] = React.useState(false);

    return (
        <>
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
                <Button
                    text="Submit"
                    showText={true}
                    onClick={() => {
                        const errorMessage = verifyForm(name, email, message);
                        if (errorMessage !== "") {
                            setError(errorMessage);
                            setShowToast(true);
                        } else {
                            submitForm(
                                name,
                                email,
                                message,
                                () => {
                                    setError("");
                                    setShowToast(true);
                                    setName("");
                                    setEmail("");
                                    setMessage("");
                                },
                                (error) => {
                                    setError(error);
                                    setShowToast(true);
                                }
                            );
                        }
                    }}
                />
            </div>
            <Toast
                icon={error ? <MdErrorOutline /> : <CiCircleCheck />}
                showToast={showToast}
                setShowToast={setShowToast}
                type={error ? "error" : "success"}
                title={error ? "Error" : "Message Sent Successfully"}
                message={error ? error : "We will get back to you shortly."}
            />
        </>
    );
};

export default ContactForm;
