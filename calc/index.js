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

let a = '0';
let b = '';
let operator = null;
let hasOperator = false;

function setA(value) {
    if(a === '0') a = '';
    a += value
} 

function setB(value) {
    if(b === '0') b = '';
    b += value
}

function setArgument(value) {
    hasOperator ? setB(value) : setA(value);
}

function setOperator(value) {
    if(!b) {
        operator = value
        hasOperator = true
        show()
        console.log(1)
    } else {
        showCalc()
        operator = value
        hasOperator = true
    }
    
}

function show() {
    if(a && operator && b) {
        value.innerHTML = a + operator + b
        return
    }
    if(a && operator) {
        value.innerHTML = a + operator
        return
    }
    value.innerHTML = a

}

function showCalc() {
    let operation;
    switch(operator) {
        case '/':
            operation = 'div'
            break
        case '*':
            operation = 'multi'
            break
        case '-':
            operation = 'sub'
            break
        case '+':
            operation = 'sum'
            break
    }
    let temp = calc(operation, +a, +b)
    parametrsReset()
    a = ''+ temp
}

function parametrsReset() {
    a = '0';
    b = '';
    operator = null;
    hasOperator = false;
}

function delLastSymbol() {
    if(b){
        b = b.slice(0, b.length-1)
        return
    }
    if(hasOperator) {
        operator = null
        hasOperator = false
        return
    }
    a = a.slice(0, b.length-1)
    if(a.length === 0) a = '0';
}

function clickBtn (event) {
    if(event.target.className === 'btn-value') {
        btnType = event.target.innerHTML
        switch (btnType) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                setArgument(btnType)
                break
            case '/':
            case '*':
            case '-':
            case '+':
                setOperator(btnType)
                break
            case '=':
                showCalc()
                break
            case 'C':
                parametrsReset()
                break
            case '&lt;=':
                delLastSymbol()
        }
    }
    show()
}

const value = document.querySelector('.value-item')
const btns = document.querySelector('.buttons-container')

btns.addEventListener('click', clickBtn)

// добавить масштабирование элементов при длинных числах
// переписать говнокод в некоторых методах при приобработке 
