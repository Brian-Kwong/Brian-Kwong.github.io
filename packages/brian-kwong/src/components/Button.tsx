import React from "react";
import styles from "./button.module.css";

type ButtonProps = {
    icon?: React.ReactNode;
    text?: string;
    isSelected?: boolean;
    showText?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
    icon,
    text,
    isSelected,
    showText = false,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={isSelected ? styles["selected"] : ""}
        >
            <div className={styles["button-div"]}>
                {icon}
                {(isSelected && text) ||
                    (showText && text && (
                        <span style={{ marginLeft: icon ? "8px" : "0" }}>
                            {text}
                        </span>
                    ))}
            </div>
        </button>
    );
};

export default Button;
