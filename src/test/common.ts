export interface Test {
  id: string;
  name: string;
  func: () => Promise<void>;
}

export const assert = (v1: unknown, v2: unknown): void => {
  if (JSON.stringify(v1) !== JSON.stringify(v2)) {
    throw new Error(`Assertion failed: ${v1} !== ${v2}`);
  }
}
