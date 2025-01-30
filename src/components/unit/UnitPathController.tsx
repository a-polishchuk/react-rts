import { useMapClick } from 'hooks/use-map-click';
import { ReactNode, useState } from 'react';
import { getDistance, Position } from 'utils/geometry';
import { Unit } from './Unit';
import { mapToLines } from 'components/line/map-to-lines';
import { COLORS } from 'types/colors';
import { useInterval } from 'hooks/use-interval';
import styles from './UnitPathController.module.css';

export type UnitPathControllerProps = {
    initialPosition: Position;
    speed: number;
    children: ReactNode;
};

export function UnitPathController({
    initialPosition,
    speed,
    children,
}: UnitPathControllerProps) {
    const [positions, setPositions] = useState<Position[]>([initialPosition]);
    const [isSelected, setIsSelected] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [prevIndex, setPrevIndex] = useState<number>(0);
    const [index, setIndex] = useState<number>(0);
    const [isMovingForward, setIsMovingForward] = useState(true);

    const distance = getDistance(positions[prevIndex], positions[index]);
    const intervalDelay =
        isMoving && positions.length >= 2 ? (distance / speed) * 1000 : null;

    console.log(prevIndex, index, distance, intervalDelay);

    useInterval(() => {
        setPrevIndex(index);
        if (isMovingForward) {
            if (index < positions.length - 1) {
                setIndex(index + 1);
            } else {
                setIndex(index - 1);
                setIsMovingForward(false);
            }
        } else {
            if (index > 0) {
                setIndex(index - 1);
            } else {
                setIndex(index + 1);
                setIsMovingForward(true);
            }
        }
    }, intervalDelay);

    useMapClick((newPosition) => {
        if (isSelected && !isMoving) {
            setPositions((prev) => [...prev, newPosition]);
        }
    });

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected((prev) => !prev);
    };

    const handleMove = () => {
        setIsMoving(true);
        setIndex(1);
    };

    return (
        <>
            {mapToLines(positions, { color: COLORS.selectionInactive })}
            <Unit
                position={positions[index]}
                speed={speed}
                selected={isSelected}
                onClick={handleClick}
            >
                {children}
                {!isMoving && (
                    <button
                        disabled={positions.length < 2}
                        className={styles.move}
                        onClick={handleMove}
                    >
                        move
                    </button>
                )}
            </Unit>
        </>
    );
}
