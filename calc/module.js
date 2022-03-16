export function isCorrectType(value, type) {
    if (type === 'number') return isNumber(value);
}

function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}