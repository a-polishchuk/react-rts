import styles from './Progress.module.css';

export type ProgressProps = {
    color: string;
    progress: number;
};

export function Progress({ color, progress }: ProgressProps) {
    return (
        <div className={styles.root} style={{ backgroundColor: `${color}55` }}>
            <div
                className={styles.progress}
                style={{ backgroundColor: color, width: `${progress}%` }}
            />
        </div>
    );
}
