import { Ship, Gameboard } from "../Classes.js";

test("Ship not hit yet", () => {
    const testShip = new Ship(2);
    expect(testShip.isSunk()).toBe(false);
});

test("Ship got sunk", () => {
    const testShip = new Ship(2);
    testShip.gotHit();
    testShip.gotHit();
    expect(testShip.isSunk()).toBe(true);
});

test("Gameboard create 10x10 arrays on init", () => {
    const testBoard = new Gameboard();

    expect(testBoard.boardArray[0][0]).toBeUndefined();
    expect(testBoard.boardArray[9][9]).toBeUndefined();
    expect(testBoard.attackLogArray[0][0]).toBeUndefined();
    expect(testBoard.attackLogArray[9][9]).toBeUndefined();
});

test("Gameboard place ship into array", () => {
    const testBoard = new Gameboard();

    testBoard.placeShip(0, 0, 2);
    testBoard.placeShip(9, 9, 2);

    expect(testBoard.boardArray[0][0]).toBeInstanceOf(Ship);
    expect(testBoard.boardArray[1][1]).not.toBeInstanceOf(Ship);
    expect(testBoard.boardArray[9][9]).toBeInstanceOf(Ship);
    expect(testBoard.shipArray.length).toBe(2);
});

test("Gameboard place multiple ships", () => {
    const testBoard = new Gameboard();

    testBoard.placeShip(0, 0, 2);

    expect(testBoard.boardArray[0][0]).toBeInstanceOf(Ship);
    expect(testBoard.boardArray[1][1]).not.toBeInstanceOf(Ship);
});

test("Gameboard array cell contains ship", () => {
    const testBoard = new Gameboard();

    testBoard.placeShip(0, 0, 2);

    expect(testBoard.hasShip(0, 0)).toBe(true);
    expect(testBoard.hasShip(1, 1)).toBe(false);
});

test("Gameboard receive attack", () => {
    const testBoard = new Gameboard();

    testBoard.placeShip(0, 0, 2);
    testBoard.receiveAttack(0, 0);
    testBoard.receiveAttack(1, 1);

    expect(testBoard.boardArray[0][0].hitCounter).toBe(1);
    expect(testBoard.attackLogArray[0][0]).toBe("hit");
    expect(testBoard.attackLogArray[1][1]).toBe("miss");
});

test("Gameboard has every ship sunk", () => {
    const testBoard = new Gameboard();

    testBoard.placeShip(0, 0, 2);
    testBoard.receiveAttack(0, 0);
    testBoard.receiveAttack(0, 0);

    expect(testBoard.IsEveryShipSunk()).toBe(true);

    const testBoard2 = new Gameboard();
    testBoard2.placeShip(0, 0, 2);
    expect(testBoard2.IsEveryShipSunk()).toBe(false);
});
