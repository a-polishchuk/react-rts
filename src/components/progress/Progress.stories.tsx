import { Meta, StoryObj } from '@storybook/react';
import { Progress, ProgressProps } from './Progress';
import { useState } from 'react';
import { useInterval } from 'hooks/use-interval';
import { COLORS } from 'types/colors';

export default {
    title: 'Components/Progress',
    component: Progress,
} as Meta<typeof Progress>;

export const Snap: StoryObj<ProgressProps> = {
    args: {
        color: COLORS.selectionActive,
        progress: 50,
        smoothTransition: false,
    },
    render: Render,
};

export const Smooth: StoryObj<ProgressProps> = {
    args: {
        color: COLORS.selectionActive,
        progress: 50,
        smoothTransition: true,
    },
    render: Render,
};

function Render(args: ProgressProps) {
    const [progress, setProgress] = useState(args.progress);

    useInterval(() => {
        setProgress((prev) => {
            return prev === 100 ? 0 : prev + 1;
        });
    }, 100);

    return (
        <div style={{ width: '150px' }}>
            <Progress {...args} progress={progress} />
        </div>
    );
}
