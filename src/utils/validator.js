import { ERROR_MESSAGE } from "../constants/constants.js";

export const validateNames = (names) => {
  if (!names || names.length === 0) {
    throw new Error(ERROR_MESSAGE.INVALID_NAME);
  }
  names.forEach((name) => {
    if (name.trim() === "" || name.length > 5) {
      throw new Error(ERROR_MESSAGE.INVALID_NAME);
    }
  });
};

export const validateTryCount = (tryCount) => {
  const count = Number(tryCount);
  if (isNaN(count) || count <= 0 || !Number.isInteger(count)) {
    throw new Error(ERROR_MESSAGE.INVALID_TRY_COUNT);
  }
};
