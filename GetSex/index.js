const btn = document.querySelector('.btn')
let name = document.querySelector('.name');

btn.addEventListener('click', kek)

function sendRequest(url) {
    return fetch(url).then(response => response.json())   
}

function kek() {
    if (name.value.length > 0) {
        const serverUrl = 'https://api.genderize.io';
        const url = `${serverUrl}?name=${name.value}`;
        sendRequest(url)
                .then(data => console.log(`${data.name} is ${data.gender} with probability ${data.probability}`))
                .catch(err => console.log(err))
    } else {
        console.log('Введи имя')
    }
}