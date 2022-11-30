/* eslint-disable @typescript-eslint/no-explicit-any */
import stringifyJSON from 'fast-json-stable-stringify';

export type Fetch<I extends any[], O> = (...args: I) => Promise<O>;

export type FnReturningPromise<R = any, P extends any[] = any[]> = (
  ...args: P
) => Promise<R>;

export type PromiseType<P extends Promise<any>> = P extends Promise<infer T>
  ? T
  : never;

export interface AsyncFnOptions {
  leading?: string;
  freeze?: boolean;
  debounce?: number;
  throttle?: number;
  delay?: number;
}

interface Any {
  [key: string]: any;
}

export const omit = (input: Any, omitKey: string): Any => {
  const output = {} as Any;
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key) && key !== omitKey) {
      output[key] = input[key];
    }
  }
  return output;
};

export const stringifyKey = (key: any): string => {
  if (key === undefined) {
    return 'undefined';
  }

  return stringifyJSON(key);
};
