import { Meta, StoryObj } from '@storybook/react';
import { CrosshairController } from './CrosshairController';

export default {
    title: 'Components/Crosshair',
    component: CrosshairController,
} as Meta<typeof CrosshairController>;

export const Default: StoryObj = {
    render: () => <CrosshairController />,
};
Default.storyName = 'Crosshair';
