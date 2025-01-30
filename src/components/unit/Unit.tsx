import { useEffect, ReactNode, useRef, useState } from 'react';
import styles from './Unit.module.css';
import { cn } from 'utils/cn';
import { Position } from 'utils/geometry';
import { getDistance } from 'utils/geometry';

export type UnitProps = {
    position: Position;
    speed: number;
    selected: boolean;
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
};

export function Unit({
    position,
    speed,
    selected,
    children,
    onClick,
}: UnitProps) {
    const [displayPosition, setDisplayPosition] = useState(position);
    const [duration, setDuration] = useState(0);
    const prevPositionRef = useRef(position);

    useEffect(() => {
        const newDistance = getDistance(position, prevPositionRef.current);
        setDuration(newDistance / speed);
        setDisplayPosition(position);
        prevPositionRef.current = position;
    }, [position, speed]);

    return (
        <div
            onClick={onClick}
            className={cn(styles.unit, selected && styles.selected)}
            style={{
                left: `${displayPosition.x}px`,
                top: `${displayPosition.y}px`,
                transition: `left ${duration}s linear, top ${duration}s linear`,
            }}
        >
            {children}
        </div>
    );
}
