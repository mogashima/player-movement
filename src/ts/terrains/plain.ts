import type { Terrain } from "./terrain";
export class Plain implements Terrain {
    name = 'Plain';
    symbol = 'p';
    htmlClassName = 'terrain-plain';
    movementCost = 1;
    isPassable = true;
}