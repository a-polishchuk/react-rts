import { Position } from '../types';

export function getDistance(a: Position, b: Position) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function getMiddle(a: Position, b: Position): Position {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
    };
}

export function getAngle(a: Position, b: Position) {
    return Math.atan2(b.y - a.y, b.x - a.x);
}
