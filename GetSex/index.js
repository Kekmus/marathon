const firstName = 'artem';
const serverUrl = 'https://api.genderize.io';
const url = `${serverUrl}?name=${firstName}`;

fetch(url).then(response => {
    let kek = response.json()
    console.log(kek)
    kek.then(data => console.log(data))
})

// sendRequest(url)
//             .then(data => console.log((data.name.charAt(0).toUpperCase() + data.name.slice(1)) + ' is ' + data.gender))
