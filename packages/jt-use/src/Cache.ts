/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Fetch } from './utils';
import { omit, stringifyKey } from './utils';

export default class Cache {
  cache = new WeakMap();

  find<I extends any[], O>(action: Fetch<I, O>, key?: I) {
    const keyString = stringifyKey(key);
    const container = this.cache.get(action);
    return container?.[keyString];
  }

  put<I extends any[], O>(
    action: Fetch<I, O>,
    key?: I,
    pending?: Promise<void>,
  ) {
    const keyString = stringifyKey(key);
    const querySet = this.cache.get(action) || {};
    this.cache.set(action, { ...querySet, [keyString]: { pending } });
  }

  receive<I extends any[], O>(action: Fetch<I, O>, key?: I, data?: O) {
    const keyString = stringifyKey(key);
    const querySet = this.cache.get(action) || {};
    this.cache.set(action, { ...querySet, [keyString]: { data } });
  }

  error<I extends any[], O>(action: Fetch<I, O>, key?: I, error?: Error) {
    const keyString = stringifyKey(key);
    const querySet = this.cache.get(action) || {};
    this.cache.set(action, { ...querySet, [keyString]: { error } });
  }

  expire<I extends any[], O>(action: Fetch<I, O>, key?: I) {
    const keyString = stringifyKey(key);
    const querySet = this.cache.get(action);
    if (!querySet || !querySet[keyString]) {
      return;
    }
    this.cache.set(action, omit(querySet, keyString));
  }
}
