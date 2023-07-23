import "./style.css";
import { newPlayer } from "./Classes.js";
import {
    placeShips_static,
    changeTurns,
    cpuRandomAttack,
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

export function startRound(element) {
    console.log(Winner);
    if (turnQueue[0] === User && Winner === null) {
        if (element.parentElement == Computer.board.containerDiv) {
            const pos = DivToPos(element);
            turnQueue[1].board.receiveAttack(pos[0], pos[1]);
            endTurn(turnQueue);

            cpuRandomAttack(User.board);
            endTurn(turnQueue);
        }
    }
}

function endTurn(turnQueue) {
    if (turnQueue[1].board.IsEveryShipSunk() === true) {
        Winner = turnQueue[0];
        gameInstructions.innerHTML = `${Winner.name} won!`;
    }

    turnQueue[1].board.render();
    turnQueue = changeTurns(turnQueue);
}
