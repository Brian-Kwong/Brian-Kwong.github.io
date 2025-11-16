import React, { useEffect } from "react";

import styles from "../sections/ContactMe.module.css";
import chatBotStyles from "./ChatBot.module.css";
import Markdown from "react-markdown";
import Button from "./Button";

import processUserMessage from "../scripts/ChatBotProcessor";

import { FiSend } from "react-icons/fi";

const ChatMessage: React.FC<{ message: string; isUser: boolean }> = ({
    message,
    isUser,
}) => {
    const [displayedMessage, setDisplayedMessage] = React.useState("");
    React.useEffect(() => {
        if (isUser) {
            setDisplayedMessage(message);
            return;
        }
        if (displayedMessage === message) return;
        const timeout = setTimeout(() => {
            if (displayedMessage.length < message.length) {
                setDisplayedMessage(
                    message.slice(0, displayedMessage.length + 1)
                );
            }
        }, 20);
        return () => clearTimeout(timeout);
    }, [message, isUser, displayedMessage]);

    return (
        <div
            className={`${chatBotStyles.message} ${isUser ? chatBotStyles.user : message === "Formulating a response..." ? chatBotStyles.waiting : chatBotStyles.bot}`}
        >
            <Markdown>{displayedMessage}</Markdown>
        </div>
    );
};

const ChatBot: React.FC = () => {
    const [userMessage, setUserMessage] = React.useState("");
    const [messages, setMessages] = React.useState<
        { message: string; isUser: boolean }[]
    >([
        {
            message:
                "Hi I'm Meowy, your web assistant! How can I map help you?",
            isUser: false,
        },
    ]);

    const [waitingForResponse, setWaitingForResponse] = React.useState(false);

    const chatMessageRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBotResponse = async () => {
            if (messages[messages.length - 1].isUser === false) return;
            const botResponse = await processUserMessage(
                messages[messages.length - 1].message,
                messages
            );

            setMessages([...messages, { message: botResponse, isUser: false }]);
        };
        fetchBotResponse();
    }, [messages]);

    useEffect(() => {
        if (messages[messages.length - 1].isUser === false) {
            setWaitingForResponse(false);
        } else {
            setWaitingForResponse(true);
        }
    }, [messages]);

    useEffect(() => {
        if (chatMessageRef.current) {
            const oneRem = parseFloat(
                getComputedStyle(document.documentElement).fontSize
            );
            const paddingOffsetPx = oneRem;
            chatMessageRef.current.scrollTop =
                chatMessageRef.current.scrollHeight + paddingOffsetPx;
        }
    }, [waitingForResponse, messages]);

    const sendMessage = () => {
        if (userMessage.trim() === "") return;
        setMessages([...messages, { message: userMessage, isUser: true }]);
        setUserMessage("");
    };

    const checkIfEnterPressed = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className={styles.formContainer}>
            <div
                ref={chatMessageRef}
                className={chatBotStyles.chatBoxMessageBox}
            >
                {messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        message={msg.message}
                        isUser={msg.isUser}
                    />
                ))}
                {waitingForResponse && (
                    <ChatMessage
                        message="Formulating a response..."
                        isUser={false}
                    />
                )}
            </div>
            <div className={chatBotStyles.chatInputBox}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={checkIfEnterPressed}
                />
                <Button
                    ariaLabel="Send Message"
                    icon={<FiSend />}
                    onClick={() => {
                        sendMessage();
                    }}
                />
            </div>
        </div>
    );
};

export default ChatBot;
