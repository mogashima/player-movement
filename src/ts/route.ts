import type { Direction } from './types/direction';

export class Route {
    private directions: Direction[];

    constructor(directions: Direction[]) {
        this.directions = directions;
    }

    get length(): number {
        return this.directions.length;
    }

    getDirection(index: number): Direction | null {
        return this.directions[index] ?? null;
    }

    getAll(): Direction[] {
        return this.directions;
    }
}
