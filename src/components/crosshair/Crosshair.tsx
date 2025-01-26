import { Position } from 'types';
import styles from './Crosshair.module.css';

export type CrosshairProps = {
    position: Position;
};

export function Crosshair({ position }: CrosshairProps) {
    return (
        <div
            className={styles.crosshair}
            style={{ top: position.y, left: position.x }}
        >
            ➕
        </div>
    );
}
