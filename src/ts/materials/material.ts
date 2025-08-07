import type { Position } from "../types/position";
export class Material {
    private position: Position;

    public constructor(x: number, y: number) {
        this.position = { x: x, y: y };

    }

    public move(to: Position) {
        this.position.x = to.x;
        this.position.y = to.y;
    }

    public getPosition(): Position {
        return this.position;
    }
}