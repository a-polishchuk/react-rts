export type Position = {
    x: number;
    y: number;
};

export function toCssProps(position: Position) {
    return {
        left: position.x,
        top: position.y,
    };
}

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

export function add(a: Position, b: Position): Position {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

export function subtract(a: Position, b: Position): Position {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}

/**
 * Multiplies the given position (vector) by the given factor
 */
export function multiply(a: Position, factor: number): Position {
    return {
        x: a.x * factor,
        y: a.y * factor,
    };
}

/**
 * @returns a random position within a radius of the given position
 */
export function randomize(a: Position, radius: number): Position {
    return {
        x: a.x + (Math.random() - 0.5) * radius,
        y: a.y + (Math.random() - 0.5) * radius,
    };
}
