import { Meta, StoryObj } from '@storybook/react';
import { CrosshairController } from 'components/crosshair/CrosshairController';
import { UnitController, UnitControllerProps } from './UnitController';

export default {
    title: 'Units/UnitController',
    component: UnitController,
} as Meta<typeof UnitController>;

export const Default: StoryObj<UnitControllerProps> = {
    args: {
        initialPosition: { x: 100, y: 100 },
        speed: 200,
        children: '👾',
    },
    render: Render,
};
Default.storyName = 'UnitController';

function Render(args: UnitControllerProps) {
    return (
        <>
            <CrosshairController />
            <UnitController {...args} />
        </>
    );
}
