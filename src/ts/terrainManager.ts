import * as map1 from '../maps/map1.json';
import type { Terrain } from './terrains/terrain';
import type { MapData } from './types/mapType';
import { Player } from './materials/player';
import { Plain } from './terrains/plain';
import { Mountain } from './terrains/mountain';
import { River } from './terrains/river';
import { Route } from './route';
import type { Position } from './types/position';

const terrainMap: Record<string, Terrain> = {
    p: new Plain(),
    m: new Mountain(),
    r: new River(),
};

export class TerrainManager {
    private terrainGrid: Terrain[][] = [];
    private player: Player;

    constructor() {
        const mapData: MapData = map1
        this.terrainGrid = this.createTerrainGrid(mapData.terrains);
        this.player = new Player(mapData.player.x, mapData.player.y);
    }

    private createTerrainGrid(symbolGrid: string[][]): Terrain[][] {
        return symbolGrid.map(row =>
            row.map(symbol => {
                const terrain = this.terrainFromSymbol(symbol);
                if (!terrain) {
                    throw new Error(`Unknown terrain symbol: ${symbol}`);
                }
                return terrain;
            })
        );
    }

    private terrainFromSymbol(symbol: string): Terrain | undefined {
        return terrainMap[symbol];
    }

    public getTerrains(): Terrain[][] {
        return this.terrainGrid
    }

    public getPlayer(): Player {
        return this.player;
    }

    public movePlayer(to: Position): void {
        this.player.move(to);
    }

    public getRoute(to: Position): Route {
        return new Route(['right', 'right', 'down', 'down']);
    }
}
