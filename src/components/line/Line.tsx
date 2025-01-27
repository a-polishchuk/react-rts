import { memo } from 'react';
import { getAngle, getDistance, getMiddle } from 'utils/geometry';
import { Position } from 'types';

export type LineProps = {
    from: Position;
    to: Position;
    color?: string;
    width?: number;
    lineStyle?: 'solid' | 'dashed';
};

export function Line({
    from,
    to,
    color = '#0003',
    width = 1,
    lineStyle = 'solid',
}: LineProps) {
    const middle = getMiddle(from, to);
    const distance = getDistance(from, to);
    const angle = getAngle(from, to);

    return (
        <div
            style={{
                pointerEvents: 'none',
                position: 'absolute',
                height: 0,
                border: `${width / 2}px ${lineStyle} ${color}`,
                left: middle.x,
                top: middle.y,
                width: distance,
                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
            }}
        />
    );
}

export const MemoizedLine = memo(Line);
