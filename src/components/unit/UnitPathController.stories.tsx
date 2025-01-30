import { Meta, StoryObj } from '@storybook/react';
import { CrosshairController } from 'components/crosshair/CrosshairController';
import {
    UnitPathController,
    UnitPathControllerProps,
} from './UnitPathController';

export default {
    title: 'Units/UnitPathController',
    component: UnitPathController,
} as Meta<typeof UnitPathController>;

export const Default: StoryObj<UnitPathControllerProps> = {
    args: {
        initialPosition: { x: 100, y: 100 },
        speed: 200,
        children: '👾',
    },
    render: Render,
};
Default.storyName = 'UnitPathController';

function Render(args: UnitPathControllerProps) {
    return (
        <>
            <CrosshairController />
            <UnitPathController {...args} />
        </>
    );
}
