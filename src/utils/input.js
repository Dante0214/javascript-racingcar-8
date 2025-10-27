import { Console } from "@woowacourse/mission-utils";
import { validateNames, validateTryCount } from "./validator.js";
import { MESSAGES } from "../constants/constants.js";

export async function getCarNames() {
  const nameInput = await Console.readLineAsync(
    `${MESSAGES.INPUT_CAR_NAMES}\n`
  );
  const names = nameInput.split(",").map((name) => name.trim());
  validateNames(names);
  return names;
}
export async function getTryCount() {
  const tryCountInput = await Console.readLineAsync(
    `${MESSAGES.INPUT_TRY_COUNT}\n`
  );
  validateTryCount(tryCountInput);
  return Number(tryCountInput);
}
