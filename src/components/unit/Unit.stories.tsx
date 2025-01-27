import { Meta, StoryObj } from '@storybook/react';
import { Unit, UnitProps } from './Unit';
import { CrosshairController } from 'components/crosshair/CrosshairController';

export default {
    title: 'Components/Unit',
    component: Unit,
} as Meta<typeof Unit>;

export const Default: StoryObj<UnitProps> = {
    args: {
        emoji: '👾',
        initialPosition: { x: 100, y: 100 },
        speed: 200,
    },
    render: Render,
};
Default.storyName = 'Unit';

function Render(args: UnitProps) {
    return (
        <>
            <CrosshairController />
            <Unit {...args} />
        </>
    );
}
