import { Meta, StoryObj } from '@storybook/react';
import { Selection } from './Selection';

export default {
    component: Selection,
} as Meta<typeof Selection>;

export const Default: StoryObj = {
    args: {
        targets: [],
        onSelect: () => {},
        color: '#1dcc25',
        borderWidth: 1,
        borderStyle: 'dashed',
    },
};
Default.storyName = 'Selection';
