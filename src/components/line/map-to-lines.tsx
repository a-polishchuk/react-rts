import { Position } from 'types';
import { Line, LineProps } from './Line';

export function mapToLines(
    positions: (Position | null)[],
    props: Omit<LineProps, 'from' | 'to'>,
) {
    return positions.map((position, index, array) => {
        const nextPosition = array[index + 1];
        return position && nextPosition ? (
            <Line key={index} from={position} to={nextPosition} {...props} />
        ) : null;
    });
}
