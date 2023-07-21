export class Gameboard {
    constructor() {
        this.boardArray;
        this.attackLogArray;
        this.shipArray = [];
        this.init();
    }

    init() {
        this.boardArray = this.create2DArray();
        this.attackLogArray = this.create2DArray();
    }

    create2DArray() {
        const array = new Array();

        for (var i = 0; i < 10; i++) {
            array[i] = new Array(10);
        }

        return array;
    }

    placeShip(x, y, len) {
        const newShip = new Ship(len);

        this.shipArray.push(newShip);
        this.boardArray[x][y] = newShip;
    }

    receiveAttack(x, y) {
        if (this.hasShip(x, y)) {
            this.boardArray[x][y].gotHit();
            this.attackLogArray[x][y] = "hit";
        } else {
            this.attackLogArray[x][y] = "miss";
        }
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
