function formatValue(value) {
    return typeof value === 'string' ? `"${value}"` : JSON.stringify(value);
}

function fail(message) {
    throw new Error(message);
}

function equal(actual, expected) {
    if (actual !== expected) {
        fail(`Expected ${formatValue(actual)} to equal ${formatValue(expected)}`);
    }
}

function deepEqual(actual, expected) {
    const actualSerialized = JSON.stringify(actual);
    const expectedSerialized = JSON.stringify(expected);

    if (actualSerialized !== expectedSerialized) {
        fail(`Expected ${actualSerialized} to deep equal ${expectedSerialized}`);
    }
}

function isTrue(value) {
    if (value !== true) {
        fail(`Expected ${formatValue(value)} to be true`);
    }
}

function isFalse(value) {
    if (value !== false) {
        fail(`Expected ${formatValue(value)} to be false`);
    }
}

function lengthOf(value, expectedLength) {
    if (value.length !== expectedLength) {
        fail(`Expected length ${value.length} to equal ${expectedLength}`);
    }
}

export const assert = {
    deepEqual,
    equal,
    fail,
    isFalse,
    isTrue,
    lengthOf
};