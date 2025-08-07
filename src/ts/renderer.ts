import type { Terrain } from './terrains/terrain';
import { TerrainManager } from './terrainManager';
import type { Position } from './types/position';
import type { Player } from './materials/player';
import { Route } from './route';
import { directionToOffset } from './types/direction';

const tileSize = 32;

export function resetDivToCanvas(terrainManager: TerrainManager) {

    const canvas = document.getElementById('playerMovementCanvas');

    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    // 描画の初期化
    canvas.innerHTML = '';

    // マップの描画
    const terrains: Terrain[][] = terrainManager.getTerrains();
    // 各行を div.terrain-row にまとめる
    for (let y = 0; y < terrains.length; y++) {
        const row = terrains[y];
        if (!row) continue;

        const rowDiv = document.createElement('div');
        rowDiv.className = 'terrain-row';

        for (let x = 0; x < row.length; x++) {
            const terrain = row[x];
            if (!terrain) continue;

            const tileDiv = document.createElement('div');
            tileDiv.className = 'terrain ' + terrain.htmlClassName;

            // 🔽 クリックイベント追加
            tileDiv.addEventListener('click', () => {
                console.log(`Tile clicked at (${x}, ${y})`);
                const to: Position = { x: x, y: y }
                const route = terrainManager.getRoute(to);
                //resetDivToCanvas(terrainManager);
                moveAlongRoute(route, terrainManager, () => {
                    console.log('Route completed!');
                    //resetDivToCanvas(terrainManager);
                });

            });


            rowDiv.appendChild(tileDiv);
        }

        canvas.appendChild(rowDiv);
    }

    // プレイヤーの描画
    const player: Player = terrainManager.getPlayer();
    const playerPosition: Position = player.getPosition();
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player';
    playerDiv.style.left = playerPosition.x * tileSize + "px";;
    playerDiv.style.top = playerPosition.y * tileSize + "px";
    canvas.appendChild(playerDiv);


}


function moveAlongRoute(
    route: Route,
    terrainManager: TerrainManager,
    onComplete?: () => void
): void {
    const playerDiv = document.querySelector('.player') as HTMLDivElement;
    if (!playerDiv) return;

    let index = 0;

    function moveNext() {
        const direction = route.getDirection(index);
        if (!direction) {
            if (onComplete) onComplete();
            return;
        }

        const directionPosition: Position = directionToOffset(direction);
        const player = terrainManager.getPlayer();
        const playerPosition = player.getPosition();
        const newPosition = {
            x: playerPosition.x + directionPosition.x,
            y: playerPosition.y + directionPosition.y
        }

        animateMove(playerDiv, directionPosition, () => {
            terrainManager.movePlayer(newPosition); // ← 状態更新
            index++;
            moveNext(); // 次の移動へ
        });
    }

    moveNext();
}

function animateMove(
    element: HTMLDivElement,
    directionPosition: Position,
    callback: () => void
) {
    const duration = 200;              // アニメーションの所要時間（ms）

    const startLeft = parseInt(element.style.left || '0', 10);
    const startTop = parseInt(element.style.top || '0', 10);
    const targetLeft = startLeft + directionPosition.x * tileSize;
    const targetTop = startTop + directionPosition.y * tileSize;

    const startTime = performance.now();

    function step(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 0〜1に収める

        // 線形補間で座標更新
        const currentLeft = startLeft + (targetLeft - startLeft) * progress;
        const currentTop = startTop + (targetTop - startTop) * progress;

        element.style.left = `${currentLeft}px`;
        element.style.top = `${currentTop}px`;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            // 最終位置に合わせて終了＆コールバック
            element.style.left = `${targetLeft}px`;
            element.style.top = `${targetTop}px`;
            callback();
        }
    }

    requestAnimationFrame(step);
}
