/**
 * Freezes the value and everything reachable from it, so that any attempt to
 * mutate it throws a TypeError (modules always run in strict mode).
 * Use it in tests to make sure that reducers do not mutate the previous state.
 */
export const deepFreeze = <T>(value: T): T => {
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value);
        Object.getOwnPropertyNames(value).forEach((key) => {
            deepFreeze((value as Record<string, unknown>)[key]);
        });
    }
    return value;
};
