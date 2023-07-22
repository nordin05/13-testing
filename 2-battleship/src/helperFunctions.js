export function placeShips_static(Player) {
    Player.board.placeShip(2, 3, 5, "horizontal");
    Player.board.placeShip(1, 8, 3, "horizontal");
    Player.board.placeShip(3, 7, 2, "horizontal");
    Player.board.placeShip(6, 5, 3, "vertical");
    Player.board.placeShip(8, 5, 4, "vertical");
}
