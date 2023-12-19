import { splitString } from "../../utils.js";

function parseGame(game) {
  const [gameName, marbles] = game.split(":");
  const gameNumber = parseInt(gameName.split(" ")[1]);
  const draws = marbles.trim().split(";");
  const marbleCount = draws.map(splitString(",")).reduce((acc, curr) => {
    console.log({ curr });
      acc
  }, {});
}

export function part1(input) {
  const games = input.split("\n");
  games.map(parseGame);
  return games;
}

export function part2(input) {
  return "part2 has not been implemented";
}
