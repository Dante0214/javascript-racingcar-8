import { Console } from "@woowacourse/mission-utils";

export default class RacingGame {
  #cars;
  constructor(cars) {
    this.#cars = cars;
  }
  play(rounds) {
    for (let i = 0; i < rounds; i++) {
      this.#cars.forEach((car) => car.move());
      this.printRound();
    }
  }
  printRound() {
    this.#cars.forEach((car) => Console.print(car.getStatus()));
    Console.print("");
  }
  getCars() {
    return this.#cars;
  }
}
