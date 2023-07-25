import "./style.css";
import { newPlayer } from "./Classes.js";
import {
    placeShips_static,
    placeShips_random,
    changeTurns,
    cpuRandomAttack,
    generateRandomNum,
} from "./helperFunctions.js";
import { DivToPos, addListeners, showAttackResult } from "./DOM.js";

const board_1 = document.querySelector(".container-one");
const board_2 = document.querySelector(".container-two");
const gameInstructions = document.querySelector(".instructions");

const shipLengths = [5, 4, 3, 3, 2];
const directions = ["horizontal", "vertical"];

const User = newPlayer("User", board_1);
const Computer = newPlayer("Computer", board_2);

// Current turn is the first player in the array
let turnQueue = [User, Computer];
let Winner = null;

placeShips_static(User);
placeShips_random(Computer, shipLengths, directions);

User.board.render();
Computer.board.render();
addListeners(board_2);

gameInstructions.innerHTML = `${turnQueue[0].name} gets the first turn!`;

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
            showAttackResult(turnQueue, gameInstructions, x, y);
            await sleep(1, 0);
            endTurn(turnQueue);

            await sleep(1, 0.5);
            const attackPos = cpuRandomAttack(User.board);
            showAttackResult(
                turnQueue,
                gameInstructions,
                attackPos[0],
                attackPos[1]
            );
            await sleep(1, 0);
            endTurn(turnQueue);
        }
    } else if (
        turnQueue[0] === User &&
        turnQueue[1].board.attackLogArray[x][y] != undefined
    ) {
        gameInstructions.innerHTML = `You can't attack the same position twice!`;
    }
}

async function endTurn(turnQueue) {
    const sunkShip = turnQueue[1].board.IsAnyShipSunk();
    if (sunkShip != false) {
        gameInstructions.innerHTML = `One of ${turnQueue[1].name}'s ships has been sunk!`;
        await sleep(1, 0);
    }

    if (turnQueue[1].board.IsEveryShipSunk() != true) {
        turnQueue = changeTurns(turnQueue);
        gameInstructions.innerHTML = `${turnQueue[0].name}'s turn`;
    } else {
        Winner = turnQueue[0];
        gameInstructions.innerHTML = `${Winner.name} won!`;
    }
}

async function sleep(s, error) {
    const min = 10 - 10 * error;
    const max = 10 + 10 * error;
    const variation = generateRandomNum(min, max) / 10;

    return new Promise((resolve) => setTimeout(resolve, s * 1000 * variation));
}
