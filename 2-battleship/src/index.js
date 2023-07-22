import "./style.css";
import { newPlayer } from "./Classes.js";
import { placeShips_static } from "./helperFunctions.js";
import { renderShips } from "./DOM.js";

const board_1 = document.querySelector(".container-one");
const board_2 = document.querySelector(".container-two");
const shipLengths = [5, 4, 3, 3, 2];

const User = newPlayer("User");
const Computer = newPlayer("Computer");

placeShips_static(User);
renderShips(User.board.boardArray, board_1);

placeShips_static(Computer);
renderShips(Computer.board.boardArray, board_2);
