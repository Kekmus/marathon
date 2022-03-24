const form = document.querySelector('.search-btn')
const input = document.querySelector('.search-input')
const cityNames = document.querySelectorAll('.city-name')
const temperatureContainers = document.querySelectorAll('.temperature-value')

form.addEventListener('click', kek)

function sendRequest(url) {
    return fetch(url).then(response => response.json())   
}

function kek(e) {
    if(e.target.type) {
        let cityName = input.value
        input.value = ''
        if(cityName.length > 0) {
            const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
            const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
            const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
            sendRequest(url)
                            .then(processDataResponse)
                            .catch(err => console.log(err))
        }
    }
}

function processDataResponse(data) {
    let temp = data.main.temp
    let cityName = data.name
    let weather = data.weather[0].main
    console.log(temp, cityName, weather)
    for (let i of cityNames) {
        i.innerHTML = cityName
    }
    let celsiusTemp = getCelsiusFromKelvin(temp)
    for(let i of temperatureContainers) {
        i.innerHTML = celsiusTemp
    }
    changeWeatherIcon(weather)

}

function changeWeatherIcon(weather) {
    let useTag = document.querySelector('.weather-icon').childNodes[1]
    let hrefValue = useTag.href.baseVal
    let newValue = hrefValue.split('#')
    newValue[1] = weather.toLowerCase()
    newValue = newValue.join('#')
    for(let i in useTag.href) {
        useTag['href'][i] = newValue
    }
}

function getCelsiusFromKelvin(value) {
    return Math.ceil(value - 273.15)
}