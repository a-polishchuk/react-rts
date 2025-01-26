import { useEffect, useRef, useState } from 'react';
import { Position } from 'types';
import { Crosshair } from './Crosshair';

export function CrosshairController() {
    const [position, setPosition] = useState<Position | null>(null);
    const key = useRef(0);

    useEffect(() => {
        const handleMapClick = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            key.current = key.current === 0 ? 1 : 0;
        };
        document.addEventListener('click', handleMapClick);
        const cleanup = () => {
            document.removeEventListener('click', handleMapClick);
        };
        return cleanup;
    }, []);

    return position && <Crosshair key={key.current} position={position} />;
}
