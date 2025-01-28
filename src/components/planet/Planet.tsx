import styles from './Planet.module.css';
import { useInterval } from 'hooks/use-interval';
import { useState } from 'react';
import { Position } from 'utils/geometry';

export type PlanetProps = {
    position: Position;
    emojis: string[];
    color: string;
    rotationDelay: number;
    onClick: () => void;
};

export function Planet({
    position,
    emojis,
    color,
    rotationDelay,
    onClick,
}: PlanetProps) {
    const [emojiIndex, setEmojiIndex] = useState(0);

    useInterval(() => {
        setEmojiIndex((prev) => {
            return prev >= emojis.length - 1 ? 0 : prev + 1;
        });
    }, rotationDelay);

    return (
        <div
            className={styles.root}
            style={{
                left: position.x,
                top: position.y,
                borderColor: color,
            }}
            onClick={onClick}
        >
            {emojis[emojiIndex]}
        </div>
    );
}
