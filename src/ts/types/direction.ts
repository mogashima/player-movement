import type { Position } from "./position";

export type Direction = 'up' | 'down' | 'left' | 'right';

// オフセットを取得するユーティリティ（必要なら）
export function directionToOffset(direction: Direction): Position {
    switch (direction) {
        case 'up': return { x: 0, y: -1 };
        case 'down': return { x: 0, y: 1 };
        case 'left': return { x: -1, y: 0 };
        case 'right': return { x: 1, y: 0 };
    }
}
