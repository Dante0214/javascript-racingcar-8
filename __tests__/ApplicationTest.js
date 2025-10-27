import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { validateNames, validateTryCount } from "../src/utils/validator.js";
import Car from "../src/Car.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 이름 검증", () => {
  test("5자 초과 이름 입력 시 에러", () => {
    const carNames = "pobi,javascript";
    expect(() => validateNames(carNames.split(","))).toThrow("[ERROR]");
  });

  test("빈 이름 입력 시 에러", () => {
    const carNames = "pobi,,woni";
    expect(() => validateNames(carNames.split(","))).toThrow("[ERROR]");
  });

  test("정상 입력", () => {
    const carNames = "pobi,woni";
    expect(() => validateNames(carNames.split(","))).not.toThrow();
  });
});

describe("시도 횟수 검증", () => {
  test("숫자가 아닌 입력 시 에러", () => {
    const attempts = "a";
    expect(() => validateTryCount(attempts)).toThrow("[ERROR]");
  });

  test("음수 입력 시 에러", () => {
    const attempts = "-1";
    expect(() => validateTryCount(attempts)).toThrow("[ERROR]");
  });

  test("정상 입력", () => {
    const attempts = "5";
    expect(() => validateTryCount(attempts)).not.toThrow();
  });
});

describe("자동차 전진 로직", () => {
  test("무작위 값 4 이상일 때 전진", () => {
    mockRandoms([4]);
    const car = new Car("pobi");
    car.move();
    expect(car.getPosition()).toBe(1);
  });

  test("무작위 값 4 미만일 때 정지", () => {
    mockRandoms([3]);
    const car = new Car("pobi");
    car.move();
    expect(car.getPosition()).toBe(0);
  });
});

describe("우승자 판별", () => {
  const MOVING_FORWARD = 4;
  const STOP = 3;

  test("단독 우승자", async () => {
    const inputs = ["pobi,woni", "1"];
    const logs = ["최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    const app = new App();
    await app.run();

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("공동 우승자", async () => {
    const inputs = ["pobi,woni", "1"];
    const logs = ["최종 우승자 : pobi, woni"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, MOVING_FORWARD]);

    const app = new App();
    await app.run();

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
});
