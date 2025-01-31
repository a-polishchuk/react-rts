import { MouseEventHandler, useState, useEffect } from 'react';
import { Planet } from './Planet';
import { add, Position, randomize, toCssProps } from 'utils/geometry';
import { COLORS } from 'types/colors';
import { Progress } from 'components/progress/Progress';
import styles from './PlanetController.module.css';
import { Line } from 'components/line/Line';
import { cn } from 'utils/cn';
import { useMapClick } from 'hooks/use-map-click';

const EMOJIS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
const DEFAULT_RALLY_OFFSET: Position = { x: 100, y: 100 };
const PRODUCTION_TIME = 1000;
const RANDOM_SPAWN_RADIUS = 20;

export type PlanetControllerProps = {
    position: Position;
    onSpawn: (position: Position) => void;
};

type ProductionItem = {
    id: number;
    startTime: number;
    productionTime: number;
};

export function PlanetController({ position, onSpawn }: PlanetControllerProps) {
    const [isSelected, setIsSelected] = useState(false);
    const [isPickingRallyPoint, setIsPickingRallyPoint] = useState(false);
    const [rallyPoint, setRallyPoint] = useState<Position>(add(position, DEFAULT_RALLY_OFFSET));

    const [productionQueue, setProductionQueue] = useState<ProductionItem[]>([]);
    const [currentProgress, setCurrentProgress] = useState(0);

    useMapClick((clickPosition) => {
        if (isPickingRallyPoint) {
            setRallyPoint(clickPosition);
        }
    });

    useEffect(() => {
        if (!productionQueue.length) {
            setCurrentProgress(0);
            return;
        }
        const currentItem = productionQueue[0];
        const interval = setInterval(() => {
            const elapsed = Date.now() - currentItem.startTime;
            const progress = Math.min((elapsed / currentItem.productionTime) * 100, 100);
            setCurrentProgress(progress);
            if (progress >= 100) {
                onSpawn(randomize(rallyPoint, RANDOM_SPAWN_RADIUS));
                setProductionQueue(([, ...rest]) => {
                    return rest.map((item, index) =>
                        index === 0 ? { ...item, startTime: Date.now() } : item,
                    );
                });
            }
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, [productionQueue, rallyPoint, onSpawn, currentProgress]);

    const toggleRallyPoint: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        setIsPickingRallyPoint((val) => !val);
    };

    const spawn: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        setProductionQueue((prev) => {
            const newItem: ProductionItem = {
                id: Date.now(),
                startTime: prev.length === 0 ? Date.now() : 0,
                productionTime: PRODUCTION_TIME,
            };
            return [...prev, newItem];
        });
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
                {isSelected && currentProgress > 0 && currentProgress < 100 && (
                    <div className={styles.progress}>
                        <Progress
                            color={COLORS.selectionActive}
                            progress={currentProgress}
                            smoothTransition={true}
                        />
                    </div>
                )}
                {isSelected && (
                    <div className={styles.toolbar}>
                        <button onClick={spawn}>{`👾×${productionQueue.length}`}</button>
                    </div>
                )}
            </div>
        </>
    );
}
