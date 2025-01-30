import { useEffect, useRef } from 'react';
import { Position } from 'utils/geometry';

export function useMapClick(onMapClick: (position: Position) => void) {
    const callbackRef = useRef(onMapClick);

    useEffect(() => {
        callbackRef.current = onMapClick;
    }, [onMapClick]);

    useEffect(() => {
        const handleMapClick = (e: MouseEvent) => {
            callbackRef.current({
                x: e.clientX,
                y: e.clientY,
            });
        };
        document.addEventListener('click', handleMapClick);
        return () => {
            document.removeEventListener('click', handleMapClick);
        };
    }, []);
}
