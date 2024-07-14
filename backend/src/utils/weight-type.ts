import { WEIGHT_RESULT } from "../enums/weight-result";

export function weightType(buffer: Buffer): keyof typeof WEIGHT_RESULT {
  const bufferString = buffer.toString();

  if (bufferString.includes("IIIII")) {
    return WEIGHT_RESULT.UNSTABLE_WEIGHT;
  }

  if (bufferString.includes("NNNNN")) {
    return WEIGHT_RESULT.NEGATIVE_WEIGHT;
  }

  if (bufferString.includes("SSSSS")) {
    return WEIGHT_RESULT.OVER_WEIGHT;
  }

  return WEIGHT_RESULT.OK;
}
