import './style.css'
import robotAsset from '/robot.svg'
import {Robot} from "./robot.ts";


const NUMBER_OF_TILES: number = 16;
const NUMBER_OR_ROWS: number = 4;
const NUMBER_OR_COLUMNS: number = 4;

const gridContainer: HTMLDivElement = createGridContainer();
Array(NUMBER_OF_TILES).fill(0).forEach((_, index) => gridContainer.appendChild(createTile(index)));
document.querySelector<HTMLDivElement>('#app')!.appendChild(gridContainer);

function createGridContainer(): HTMLDivElement {
    const gridContainer: HTMLDivElement = document.createElement('div');
    gridContainer.classList.add('grid', 'gap-0', 'w-fit', 'border', 'border-gray-300', 'rounded', 'shadow-12');
    gridContainer.setAttribute('style', `grid-template-rows:repeat(${NUMBER_OR_ROWS}, minmax(0, 1fr))`);
    gridContainer.setAttribute('style', `grid-template-columns:repeat(${NUMBER_OR_COLUMNS}, minmax(0, 1fr))`);
    return gridContainer;
}


function createTile(index: number): HTMLDivElement {
    const tile: HTMLDivElement = document.createElement('div');
    tile.classList.add('border', 'border-gray-300', 'h-20', 'w-20', 'bg-secondary-100');
    // tile.textContent = index.toString();
    createRobot(tile, index);
    return tile;
}

function createRobot(tile: HTMLDivElement, index: number): void {
    if (index === 0) {
        const robotEl: HTMLImageElement = document.createElement('img');
        robotEl.setAttribute('src', robotAsset);
        robotEl.classList.add('w-20', 'h-20', 'absolute', 'inset-0', 'transition-transform', 'duration-500');
        robotEl.setAttribute('style', 'transform: translateX(0)');
        robotEl.setAttribute('style', 'transform: translateY(0)');
        new Robot(NUMBER_OR_COLUMNS-1, NUMBER_OR_ROWS-1, robotEl)
        tile.appendChild(robotEl);
        tile.classList.add('relative')
    }
}
