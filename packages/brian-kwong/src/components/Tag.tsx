import React from "react";
import styles from "./Tag.module.css";

interface TagProps {
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ icon = null, label, onClick }) => {
    return (
        <div onClick={onClick} className={styles.tag}>
            {icon}
            <div className={styles.tagText}>{label}</div>
        </div>
    );
};

export default Tag;
