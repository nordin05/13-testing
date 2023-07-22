const board_1 = document.querySelector(".container-one");
const board_2 = document.querySelector(".container-two");

createGrids(board_1);
createGrids(board_2);

function createGrids(parentDiv) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const newCell = document.createElement("div");
            newCell.className = `cell x${j}y${i}`;

            parentDiv.appendChild(newCell);
        }
    }
}

export function renderShips(boardArray, container) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (boardArray[i][j] != null) {
                const element = findCellElement(container, i, j);
                element.style.backgroundColor = "hsl(27, 80%, 70%)";
            }
        }
    }
}

function findCellElement(container, x, y) {
    const cell = container.querySelector(`.x${x}y${y}`);
    return cell;
}
