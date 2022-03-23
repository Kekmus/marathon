const btn = document.querySelector('.btn')

btn.addEventListener('click', kek)

function sendRequest(url) {
    return fetch(url).then(response => response.json())   
}

function kek() {
    const name = document.querySelector('.name').value
    if (name.length > 0) {
        const serverUrlName = 'https://api.genderize.io';
        let url = `${serverUrlName}?name=${name}`;
        sendRequest(url)
                .then(data => console.log(`${data.name} is ${data.gender} with probability ${data.probability}`))
                .catch(err => console.log(err))
        const serverUrlCountry = 'https://api.nationalize.io';
        url = `${serverUrlCountry}?name=${name}`;
        sendRequest(url)
                .then(data => console.log(`${name} from ${data.country[0].country_id}`))
                .catch(err => console.log(err))
    } else {
        console.log('Введи имя')
    }
}