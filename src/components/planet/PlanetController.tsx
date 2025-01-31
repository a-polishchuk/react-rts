import { MouseEventHandler, useState } from 'react';
import { Planet } from './Planet';
import { add, Position, toCssProps } from 'utils/geometry';
import { COLORS } from 'types/colors';
import { Progress } from 'components/progress/Progress';
import styles from './PlanetController.module.css';
import { Line } from 'components/line/Line';
import { cn } from 'utils/cn';
import { useMapClick } from 'hooks/use-map-click';

const EMOJIS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
const DEFAULT_RALLY_OFFSET: Position = { x: 100, y: 100 };
const SPAWN_DELAY = 1000;

export type PlanetControllerProps = {
    position: Position;
    onSpawn: (position: Position) => void;
};

export function PlanetController({ position, onSpawn }: PlanetControllerProps) {
    const [isSelected, setIsSelected] = useState(false);
    const [isPickingRallyPoint, setIsPickingRallyPoint] = useState(false);
    const [rallyPoint, setRallyPoint] = useState<Position>(add(position, DEFAULT_RALLY_OFFSET));

    const [timeouts, setTimeouts] = useState<number[]>([]);

    useMapClick((clickPosition) => {
        if (isPickingRallyPoint) {
            setRallyPoint(clickPosition);
        }
    });

    const toggleRallyPoint: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        setIsPickingRallyPoint((val) => !val);
    };

    const spawn: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        const timeout = setTimeout(() => {
            onSpawn(
                add(rallyPoint, {
                    x: Math.random() * 20 - 10,
                    y: Math.random() * 20 - 10,
                }),
            );
            setTimeouts((prev) => prev.filter((t) => t !== timeout));
        }, SPAWN_DELAY);
        setTimeouts((prev) => [...prev, timeout]);
    };

    return (
        <>
            {isSelected && (
                <>
                    <Line
                        from={position}
                        to={rallyPoint}
                        color={
                            isPickingRallyPoint ? COLORS.selectionActive : COLORS.selectionInactive
                        }
                        width={isPickingRallyPoint ? 2 : 1}
                    />
                    <div
                        className={cn(
                            styles.rallyPoint,
                            isPickingRallyPoint && styles.rallyPointSelected,
                        )}
                        style={toCssProps(rallyPoint)}
                        onClick={toggleRallyPoint}
                    />
                </>
            )}
            <div className={styles.root} style={toCssProps(position)}>
                <Planet
                    emojis={EMOJIS}
                    color={isSelected ? COLORS.selectionActive : COLORS.selectionInactive}
                    rotationDelay={300}
                    onClick={() => setIsSelected((prev) => !prev)}
                />
                {isSelected && (
                    <>
                        <div className={styles.progress}>
                            <Progress color={COLORS.selectionActive} progress={50} />
                        </div>
                        <div className={styles.toolbar}>
                            <button onClick={spawn}>{`👾 - ${timeouts.length}`}</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
