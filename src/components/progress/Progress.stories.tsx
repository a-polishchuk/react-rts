import { Meta, StoryObj } from '@storybook/react';
import { Progress, ProgressProps } from './Progress';
import { useState } from 'react';
import { useInterval } from 'hooks/use-interval';

export default {
    title: 'Components/Progress',
    component: Progress,
} as Meta<typeof Progress>;

export const Default: StoryObj<ProgressProps> = {
    args: {
        color: '#1dcc25',
        progress: 50,
    },
    render: Render,
};
Default.storyName = 'Progress';

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
