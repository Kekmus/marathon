function calc(operation, a, b) {
    let operations  = {
        sum: a + b,
        sub: a - b,
        multi: a * b,
        div: a / b,
    }
    if(!isCorrectType(a, 'number') || !isCorrectType(b, 'number')) 
        return new Error('Wrong value type')
    if(!(operation in operations))
        return new Error('Unknown operation')
    return operations[operation]
}

function isCorrectType(value, type) {
    if (type === 'number') return isNumber(value);
}

function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

console.log(calc('sum', 1, 3))
console.log(calc('sub', 5, 6))
console.log(calc('multi', 3, 6))
console.log(calc('div', 8, 2))
console.log(calc('div', 8, 0))
console.log(calc('kel', 5, 6))
console.log(calc('sum', 'ff', 6))
console.log(calc('sum', 5, '5555'))