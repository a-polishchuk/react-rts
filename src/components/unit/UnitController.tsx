import { ReactNode, useState } from 'react';
import { Position } from 'utils/geometry';
import { Unit } from './Unit';
import { useMapClick } from 'hooks/use-map-click';

export type UnitControllerProps = {
    initialPosition: Position;
    speed: number;
    children: ReactNode;
};

export function UnitController({
    initialPosition,
    speed,
    children,
}: UnitControllerProps) {
    const [position, setPosition] = useState(initialPosition);
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected((prev) => !prev);
    };

    useMapClick((newPosition) => {
        if (isSelected) {
            setPosition(newPosition);
        }
    });

    return (
        <Unit
            position={position}
            speed={speed}
            selected={isSelected}
            onClick={handleClick}
        >
            {children}
        </Unit>
    );
}
