import { Meta, StoryObj } from '@storybook/react';
import { Unit, UnitProps } from './Unit';

export default {
    component: Unit,
} as Meta<typeof Unit>;

export const Alien: StoryObj<UnitProps> = {
    args: {
        emoji: '👾',
        initialPosition: { x: 100, y: 100 },
        speed: 200,
    },
};

export const Robot: StoryObj<UnitProps> = {
    args: {
        emoji: '🤖',
        initialPosition: { x: 100, y: 100 },
        speed: 100,
    },
};
