import { cn } from 'utils/cn';
import styles from './Progress.module.css';

export type ProgressProps = {
    color: string;
    progress: number;
    smoothTransition: boolean;
};

export function Progress({ color, progress, smoothTransition }: ProgressProps) {
    return (
        <div className={styles.root} style={{ backgroundColor: `${color}55` }}>
            <div
                className={cn(styles.progress, smoothTransition && styles.smooth)}
                style={{ backgroundColor: color, width: `${progress}%` }}
            />
        </div>
    );
}
