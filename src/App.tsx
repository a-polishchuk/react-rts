import { Unit } from './components/Unit';

export function App() {
    return (
        <>
            <Unit emoji="👾" speed={150} initialPosition={{ x: 100, y: 100 }} />
            <Unit emoji="🤖" speed={100} initialPosition={{ x: 200, y: 200 }} />
        </>
    );
}
