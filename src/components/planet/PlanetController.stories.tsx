import { Meta, StoryObj } from '@storybook/react';
import { PlanetController } from './PlanetController';

export default {
    title: 'Components/Planet',
    component: PlanetController,
} as Meta<typeof PlanetController>;

export const Default: StoryObj = {
    render: () => <PlanetController position={{ x: 100, y: 100 }} />,
};
Default.storyName = 'Planet';
