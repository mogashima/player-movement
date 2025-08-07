import type { Terrain } from "./terrain";
export class River implements Terrain {
    name = 'River';
    symbol = 'r';
    htmlClassName = 'terrain-river';
    movementCost = 1;
    isPassable = true;
}