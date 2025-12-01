import { assertEquals } from "@std/assert";
import { Board, Player } from "./board.ts";

Deno.test("diagonal-falling-detection", () => {
  const board = new Board();

  board.makeMove(Player.PlayerX, 0);

  board.makeMove(Player.PlayerX, 1);
  board.makeMove(Player.PlayerX, 1);

  board.makeMove(Player.PlayerX, 2);
  board.makeMove(Player.PlayerX, 2);
  board.makeMove(Player.PlayerX, 2);

  board.makeMove(Player.PlayerX, 3);
  board.makeMove(Player.PlayerX, 3);
  board.makeMove(Player.PlayerX, 3);
  const lastRow = board.makeMove(Player.PlayerX, 3); 

  const winner = board.winner(Player.PlayerX, lastRow, 3);
  assertEquals(winner, Player.PlayerX);
});
