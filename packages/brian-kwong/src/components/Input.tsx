import React from "react";

import styles from "./Input.module.css";

interface InputProps {
    label: string;
    value: string;
    onChange: (
        newValue: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    inputType?: string;
    type?: "singleLine" | "multiline";
}

const Input: React.FC<InputProps> = ({
    label,
    value,
    onChange,
    inputType = "text",
    type = "singleLine",
}) => {
    return (
        <div className={styles.inputComponent}>
            {type === "singleLine" ? (
                <input
                    className={styles.input}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                />
            ) : (
                <textarea
                    value={value}
                    onChange={onChange}
                    className={styles.textArea}
                    placeholder={label}
                    rows={5}
                />
            )}
        </div>
    );
};

export default Input;
