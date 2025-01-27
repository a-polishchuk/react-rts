import { Meta, StoryObj } from '@storybook/react';
import { Line, LineProps } from './Line';
import { useEffect, useState } from 'react';
import { Position } from 'types';

export default {
    component: Line,
} as Meta<typeof Line>;

export const Default: StoryObj<LineProps> = {
    args: {
        color: '#0003',
        width: 1,
        lineStyle: 'solid',
    },
    render: Render,
};
Default.storyName = 'Line';

function Render(args: LineProps) {
    const [from, setFrom] = useState<Position>({ x: 100, y: 100 });
    const [to, setTo] = useState<Position>({ x: 120, y: 270 });
    const [currentSelection, setCurrentSelection] = useState<'start' | 'end'>(
        'end',
    );

    useEffect(() => {
        const handleMapClick = (e: MouseEvent) => {
            if (currentSelection === 'start') {
                setFrom({ x: e.clientX, y: e.clientY });
            } else {
                setTo({ x: e.clientX, y: e.clientY });
            }
        };
        document.addEventListener('click', handleMapClick);
        return () => {
            document.removeEventListener('click', handleMapClick);
        };
    }, [currentSelection]);

    return (
        <>
            <select
                value={currentSelection}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                onChange={(e) => {
                    setCurrentSelection(e.target.value as 'start' | 'end');
                }}
            >
                <option value="start">Line Start</option>
                <option value="end">Line End</option>
            </select>
            <Line {...args} from={from} to={to} />
        </>
    );
}
