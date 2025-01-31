import styles from './Planet.module.css';
import { useInterval } from 'hooks/use-interval';
import { useState } from 'react';

export type PlanetProps = {
    emojis: string[];
    color: string;
    rotationDelay: number;
    onClick: () => void;
};

export function Planet({ emojis, color, rotationDelay, onClick }: PlanetProps) {
    const [emojiIndex, setEmojiIndex] = useState(0);

    useInterval(() => {
        setEmojiIndex((prev) => {
            return prev >= emojis.length - 1 ? 0 : prev + 1;
        });
    }, rotationDelay);

    return (
        <div
            className={styles.root}
            style={{ borderColor: color }}
            onClick={onClick}
        >
            {emojis[emojiIndex]}
        </div>
    );
}
