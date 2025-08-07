import type { Terrain } from "./terrain";
export class Mountain implements Terrain {
    name = 'Mountain';
    symbol = 'm';
    htmlClassName = 'terrain-mountain';
    movementCost = 1;
    isPassable = true;
}