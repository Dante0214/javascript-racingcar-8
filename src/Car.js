import { MOVE_THRESHOLD } from "../constants";
import { Random } from "@woowacourse/mission-utils";

export default class Car {
  #name;
  #position;
  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }
  move() {
    const randomNumber = Random.pickNumberInRange(0, 9);
    if (randomNumber >= MOVE_THRESHOLD) {
      this.#position += 1;
    }
  }
  getStatus() {
    return `${this.#name} : ${"-".repeat(this.#position)}`;
  }
}
