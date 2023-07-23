import { startRound } from "./index.js";

const board_1 = document.querySelector(".container-one");
const board_2 = document.querySelector(".container-two");

export function createGrids(parentDiv) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const newCell = document.createElement("div");
            newCell.className = `cell x${j}y${i}`;

            parentDiv.appendChild(newCell);
        }
    }
}

export function addListeners(container) {
    const cells = container.querySelectorAll(".cell");

    cells.forEach(function (element) {
        element.addEventListener("click", function () {
            startRound(element);
        });
    });
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

export function renderAttackLog(attackLogArray, container) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (attackLogArray[i][j] == "hit") {
                const element = findCellElement(container, i, j);
                element.style.backgroundColor = "hsl(0, 85%, 60%)";
            }
            if (attackLogArray[i][j] == "miss") {
                const element = findCellElement(container, i, j);
                element.style.backgroundColor = "hsl(196, 82%, 74%)";
            }
        }
    }
}

function findCellElement(container, x, y) {
    const cell = container.querySelector(`.x${x}y${y}`);
    return cell;
}

export function DivToPos(element) {
    const x = element.className.slice(6, 7);
    const y = element.className.slice(8, 9);

    return [x, y];
}
