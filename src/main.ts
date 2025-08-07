import './styles/main.scss';
import { resetDivToCanvas } from './ts/renderer';
import { TerrainManager } from './ts/terrainManager'

window.addEventListener('DOMContentLoaded', () => {
    const terrainManager = new TerrainManager();
    resetDivToCanvas(terrainManager);
});
