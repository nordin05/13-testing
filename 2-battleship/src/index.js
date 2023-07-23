import "./style.css";
import { newPlayer } from "./Classes.js";
import {
    placeShips_static,
    changeTurns,
    cpuRandomAttack,
    generateRandomNum,
} from "./helperFunctions.js";
import { DivToPos, addListeners } from "./DOM.js";

const board_1 = document.querySelector(".container-one");
const board_2 = document.querySelector(".container-two");
const gameInstructions = document.querySelector(".instructions");

const shipLengths = [5, 4, 3, 3, 2];

const User = newPlayer("User", board_1);
const Computer = newPlayer("Computer", board_2);

// Current turn is the first player in the array
let turnQueue = [User, Computer];
let Winner = null;

placeShips_static(User);
placeShips_static(Computer);

User.board.render();
Computer.board.render();
addListeners(board_2);

gameInstructions.innerHTML = `${turnQueue[0].name}'s turn`;

export async function startRound(element) {
    const pos = DivToPos(element);
    const x = pos[0];
    const y = pos[1];

    if (
        turnQueue[0] === User &&
        Winner === null &&
        turnQueue[1].board.attackLogArray[x][y] == undefined
    ) {
        if (element.parentElement == Computer.board.containerDiv) {
            turnQueue[1].board.receiveAttack(x, y);
            endTurn(turnQueue);

            await sleep(1);
            cpuRandomAttack(User.board);
            endTurn(turnQueue);
        }
    } else if (
        turnQueue[0] === User &&
        turnQueue[1].board.attackLogArray[x][y] != undefined
    ) {
        gameInstructions.innerHTML = `You can't attack the same position twice!`;
    }
}

function endTurn(turnQueue) {
    turnQueue[1].board.render();

    if (turnQueue[1].board.IsEveryShipSunk() != true) {
        turnQueue = changeTurns(turnQueue);
        console.log(`${turnQueue[0].name}'s turn`);
        gameInstructions.innerHTML = `${turnQueue[0].name}'s turn`;
    } else {
        Winner = turnQueue[0];
        gameInstructions.innerHTML = `${Winner.name} won!`;
    }
}

async function sleep(s) {
    const variation = generateRandomNum(1, 15) / 10;
    return new Promise((resolve) => setTimeout(resolve, s * 1000 * variation));
}
