function calc(operation, value1, value2) {
    let ans;
    switch(operation) {
        case 'sum':
            ans = value1 + value2
            break
        case 'multi':
            ans = value1 * value2
            break
        case 'sub':
            ans = value1 - value2
            break
        case 'div':
            ans = value1 / value2
            break  
        default:
            return new Error('unknown operation')      
    }
    return ans;
}

function isCorrectType(value, type) {
    if (type === 'number') return isNumber(value);
}

function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

console.log(calc('sum', 1, 2))
console.log(calc('multi', 3, 2))
console.log(calc('sub', 1, 5))
console.log(calc('div', 4, 2))
console.log(calc('kek', 4, 2))