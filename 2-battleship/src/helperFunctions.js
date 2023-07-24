export function placeShips_static(Player) {
    Player.board.placeShip(2, 3, 5, "horizontal");
    Player.board.placeShip(1, 8, 3, "horizontal");
    Player.board.placeShip(3, 7, 2, "horizontal");
    Player.board.placeShip(6, 5, 3, "vertical");
    Player.board.placeShip(8, 5, 4, "vertical");
}

export function placeShips_random(Player, shipLengths, directions) {
    if (Player.board.shipArray.length === 5) {
        return;
    }

    const x = generateRandomNum(0, 9);
    const y = generateRandomNum(0, 9);
    const shipLen = shipLengths[0];
    const dir = directions[Math.round(Math.random())];

    if (Player.board.placeShip(x, y, shipLen, dir) != true) {
        placeShips_random(Player, shipLengths, directions);
    } else {
        shipLengths.shift();
        placeShips_random(Player, shipLengths, directions);
    }
}

export function cpuRandomAttack(userBoard) {
    if (!userBoard.attackLogArray.includes(undefined)) {
        const x = generateRandomNum(0, 9);
        const y = generateRandomNum(0, 9);

        if (userBoard.attackLogArray[x][y] == null) {
            userBoard.receiveAttack(x, y);
        } else {
            cpuRandomAttack(userBoard);
        }
    }
}

export function changeTurns(turnQueue) {
    const firstElement = turnQueue.shift();
    turnQueue.push(firstElement);

    return turnQueue;
}

export function generateRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
