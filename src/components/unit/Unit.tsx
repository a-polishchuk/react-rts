import { useState, useEffect } from 'react';
import styles from './Unit.module.css';
import { cn } from 'utils/cn';
import { Position } from 'types';
import { getDistance } from 'utils/geometry';

export type UnitProps = {
    emoji: string;
    initialPosition: Position;
    speed: number;
};

export function Unit({ emoji, initialPosition, speed }: UnitProps) {
    const [position, setPosition] = useState<Position>(initialPosition);
    const [duration, setDuration] = useState(0);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (!isSelected) {
            return;
        }
        const handleMapClick = (e: MouseEvent) => {
            const newPos = { x: e.clientX, y: e.clientY };
            const newDistance = getDistance(position, newPos);
            const newDuration = newDistance / speed;
            setDuration(newDuration);
            setPosition(newPos);
        };
        document.addEventListener('click', handleMapClick);
        return () => {
            document.removeEventListener('click', handleMapClick);
        };
    }, [isSelected, position, speed]);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected((prev) => !prev);
    };

    return (
        <div
            onClick={handleClick}
            className={cn(styles.unit, isSelected && styles.selected)}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transition: `left ${duration}s linear, top ${duration}s linear`,
            }}
        >
            {emoji}
        </div>
    );
}
