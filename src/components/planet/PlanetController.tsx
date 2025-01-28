import { useState } from 'react';
import { Planet } from './Planet';
import { Position } from 'utils/geometry';
import { COLORS } from 'types/colors';

const EMOJIS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

export type PlanetControllerProps = {
    position: Position;
};

export function PlanetController({ position }: PlanetControllerProps) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <Planet
            position={position}
            emojis={EMOJIS}
            color={
                isSelected ? COLORS.selectionActive : COLORS.selectionInactive
            }
            rotationDelay={300}
            onClick={() => setIsSelected((prev) => !prev)}
        />
    );
}
