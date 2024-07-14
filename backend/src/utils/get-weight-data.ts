import { AYCE_PRICE } from "../consts/ayce-price";
import { PER_KILO_PRICE } from "../consts/per-kilo-price";
import { Weight } from "../types/weight";

export function getWeightData(weight: number): Weight {
  const type = weight * PER_KILO_PRICE > AYCE_PRICE ? "ayce" : "perKilo";
  const price = type === "perKilo" ? weight * PER_KILO_PRICE : AYCE_PRICE;

  return {
    weight,
    type,
    price,
  };
}
