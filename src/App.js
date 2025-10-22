import { Console } from "@woowacourse/mission-utils";
import { getCarNames, getTryCount } from "./utils/input.js";
class App {
  async run() {
    try {
      const names = await getCarNames();
      const tryCount = await getTryCount();
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
  }
}

export default App;
