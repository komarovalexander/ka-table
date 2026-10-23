export const isEmpty = (value: unknown): boolean => (value == null || (value as { length?: unknown }).length === 0);

const isPlainObjectOrArray = (value: unknown): value is Record<string, unknown> => {
    if (Array.isArray(value)) {
        return true;
    }
    if (value === null || typeof value !== 'object') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};

const isDeepEqualInner = (a: unknown, b: unknown, comparing: Map<unknown, unknown>): boolean => {
    if (Object.is(a, b)) {
        return true;
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    if (!isPlainObjectOrArray(a) || !isPlainObjectOrArray(b) || Array.isArray(a) !== Array.isArray(b)) {
        return false;
    }
    if (comparing.get(a) === b) {
        // a circular reference which is already being compared
        return true;
    }
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
        return false;
    }
    comparing.set(a, b);
    const isEqual = keysA.every((key) => Object.prototype.hasOwnProperty.call(b, key) && isDeepEqualInner(a[key], b[key], comparing));
    comparing.delete(a);
    return isEqual;
};

/**
 * Compares plain objects, arrays and dates by value; everything else (functions, class instances) by reference.
 */
export const isDeepEqual = (a: unknown, b: unknown): boolean => isDeepEqualInner(a, b, new Map());
