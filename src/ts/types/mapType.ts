export interface MapData {
    width: number;
    height: number;
    terrains: string[][];
    player: {
        x: number,
        y: number
    }
}