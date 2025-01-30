import { useMapClick } from 'hooks/use-map-click';
import { ReactNode, useState } from 'react';
import { Position } from 'utils/geometry';
import { Unit } from './Unit';
import { mapToLines } from 'components/line/map-to-lines';
import { COLORS } from 'types/colors';

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
    const [posIndex, setPosIndex] = useState(0);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected((prev) => !prev);
    };

    const handleAnimationEnd = () => {
        if (posIndex < positions.length - 1) {
            setPosIndex(posIndex + 1);
        }
    };

    useMapClick((newPosition) => {
        if (isSelected) {
            setPositions((prev) => [...prev, newPosition]);
        }
    });

    return (
        <>
            {mapToLines(positions, { color: COLORS.selectionInactive })}
            <Unit
                position={positions[posIndex]}
                speed={speed}
                selected={isSelected}
                onClick={handleClick}
                onAnimationEnd={handleAnimationEnd}
            >
                {children}
            </Unit>
        </>
    );
}
