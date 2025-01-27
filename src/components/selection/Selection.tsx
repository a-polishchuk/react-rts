import { useState, MouseEventHandler } from 'react';
import styles from './Selection.module.css';
import { Position } from 'types';

export type SelectionTarget = {
    id: string;
    ref: React.RefObject<HTMLDivElement>;
};

export type SelectionProps = {
    targets: SelectionTarget[];
    onSelect: (selectedIds: string[]) => void;
    color?: string;
    borderWidth?: number;
    borderStyle?: 'solid' | 'dashed' | 'dotted';
};

export function Selection({
    targets,
    onSelect,
    color = '#1dcc25',
    borderWidth = 1,
    borderStyle = 'dashed',
}: SelectionProps) {
    const [startPos, setStartPos] = useState<Position | null>(null);
    const [endPos, setEndPos] = useState<Position | null>(null);

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        setStartPos(toPosition(e));
        setEndPos(toPosition(e));
    };

    const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (startPos) {
            setEndPos(toPosition(e));
        }
    };

    const handleMouseUp: MouseEventHandler<HTMLDivElement> = () => {
        if (!startPos || !endPos) {
            return;
        }
        const rect = toRect(startPos, endPos);
        const selectedTargets = targets.filter(({ ref }) => {
            if (!ref.current) {
                return false;
            }
            const targetRect = ref.current.getBoundingClientRect();
            return (
                rect.left <= targetRect.right &&
                rect.left + rect.width >= targetRect.left &&
                rect.top <= targetRect.bottom &&
                rect.top + rect.height >= targetRect.top
            );
        });
        onSelect(selectedTargets.map(({ id }) => id));
        setStartPos(null);
        setEndPos(null);
    };

    return (
        <div
            className={styles.selectionContainer}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {startPos && endPos ? (
                <div
                    className={styles.selectionBox}
                    style={{
                        ...toRect(startPos, endPos),
                        border: `${borderWidth}px ${borderStyle} ${color}`,
                        backgroundColor: `${color}20`,
                    }}
                />
            ) : null}
        </div>
    );
}

function toPosition(e: { clientX: number; clientY: number }) {
    return { x: e.clientX, y: e.clientY };
}

function toRect(startPos: Position, endPos: Position) {
    return {
        left: Math.min(startPos.x, endPos.x),
        top: Math.min(startPos.y, endPos.y),
        width: Math.abs(startPos.x - endPos.x),
        height: Math.abs(startPos.y - endPos.y),
    };
}
