import { isUtf8 } from "buffer";

export function formatBalanceWeight(buffer: Buffer): number {
  if (!isUtf8(buffer)) {
    throw new Error("Buffer is not utf8");
  }

  const bufferString = buffer
    .toString()
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

  const stringWithDot =
    bufferString.substring(0, 2) + "." + bufferString.substring(2);

  return parseFloat(stringWithDot);
}
