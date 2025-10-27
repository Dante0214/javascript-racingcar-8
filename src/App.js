import { Console } from "@woowacourse/mission-utils";
import { getCarNames, getTryCount } from "./utils/input.js";
import { MESSAGES } from "./constants/constants.js";
import RacingGame from "./RacingGame.js";
import Car from "./Car.js";
import { getWinners } from "./utils/racingResult.js";
class App {
  async run() {
    try {
      const names = await getCarNames();
      const tryCount = await getTryCount();

      const cars = names.map((name) => new Car(name));

      Console.print(MESSAGES.RESULT_TITLE);
      const game = new RacingGame(cars);
      game.play(tryCount);

      const winners = getWinners(game.getCars());

      Console.print(`${MESSAGES.FINAL_WINNER}${winners.join(", ")}`);
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
  }
}

export default App;
