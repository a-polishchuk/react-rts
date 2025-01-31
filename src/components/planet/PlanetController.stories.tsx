import { Meta, StoryObj } from '@storybook/react';
import { PlanetController } from './PlanetController';
import { useState } from 'react';
import { UnitController, UnitControllerProps } from 'components/unit/UnitController';
import { Position } from 'utils/geometry';
import { CrosshairController } from 'components/crosshair/CrosshairController';

export default {
    title: 'Components/Planet',
    component: PlanetController,
} as Meta<typeof PlanetController>;

export const Default: StoryObj = {
    render: () => <Render />,
};
Default.storyName = 'Planet';

function Render() {
    const [units, setUnits] = useState<UnitControllerProps[]>([]);

    const spawnUnit = (position: Position) => {
        const newUnit: UnitControllerProps = {
            initialPosition: position,
            speed: 200,
            children: '👾',
        };
        setUnits((prev) => [...prev, newUnit]);
    };

    return (
        <>
            <CrosshairController />
            <PlanetController position={{ x: 100, y: 100 }} onSpawn={spawnUnit} />
            {units.map((unit, index) => (
                <UnitController key={index} {...unit} />
            ))}
        </>
    );
}
