import { createGrids, renderShips, renderAttackLog } from "./DOM.js";

export function newPlayer(name, containerDiv) {
    const board = new Gameboard(containerDiv);
    return {
        name: name,
        board: board,
    };
}

export class Gameboard {
    constructor(containerDiv) {
        this.boardArray;
        this.attackLogArray;
        this.shipArray = [];
        this.containerDiv = containerDiv;
        this.init();
    }

    init() {
        this.boardArray = this.#create2DArray();
        this.attackLogArray = this.#create2DArray();
        createGrids(this.containerDiv);
    }

    #create2DArray() {
        const array = new Array();

        for (var i = 0; i < 10; i++) {
            array[i] = new Array(10);
        }

        return array;
    }

    placeShip(x, y, len, dir) {
        const newShip = new Ship(len);

        if (this.IsInbounds(x, y, len, dir)) {
            if (this.checkForCollision(x, y, len, dir) == false) {
                this.shipArray.push(newShip);

                for (let i = 0; i < len; i++) {
                    if (dir === "horizontal") {
                        this.boardArray[x + i][y] = newShip;
                    } else if (dir === "vertical") {
                        this.boardArray[x][y + i] = newShip;
                    }
                }
            } else return "collision";
        } else return "out of bounds";
    }

    checkForCollision(x, y, len, dir) {
        for (let i = 0; i < len; i++) {
            if (dir === "horizontal") {
                if (this.boardArray[x + i][y] != null) return true;
            } else if (dir === "vertical") {
                if (this.boardArray[x][y + i] != null) return true;
            }
        }
        return false;
    }

    IsInbounds(x, y, len, dir) {
        if (dir === "horizontal") {
            if (x + len - 1 > 9 || x < 0) return false;
        } else if (dir === "vertical") {
            if (y + len - 1 > 9 || y < 0) return false;
        }
        return true;
    }

    receiveAttack(x, y) {
        if (this.attackLogArray[x][y] == null) {
            if (this.hasShip(x, y)) {
                this.boardArray[x][y].gotHit();
                this.attackLogArray[x][y] = "hit";
            } else {
                this.attackLogArray[x][y] = "miss";
            }
        } else return "duplicate attack";
    }

    hasShip(x, y) {
        if (this.boardArray[x][y] === undefined) {
            return false;
        }
        return true;
    }

    IsEveryShipSunk() {
        for (let i = 0; i < this.shipArray.length; i++) {
            const ship = this.shipArray[i];

            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    render() {
        renderShips(this.boardArray, this.containerDiv);
        renderAttackLog(this.attackLogArray, this.containerDiv);
    }
}

export class Ship {
    constructor(length) {
        this.length = length;
        this.hitCounter = 0;
    }

    gotHit() {
        this.hitCounter++;
    }

    isSunk() {
        if (this.length === this.hitCounter) {
            return true;
        }
        return false;
    }
}
