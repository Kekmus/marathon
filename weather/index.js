import {Lol, Lol1} from './kek.js'
import * as UI from './view.js'

console.log(UI)

let cityName = 'Amur'

UI.form.addEventListener('click', getNewCity)
UI.likeButton.addEventListener('click', addLocationContainer)
UI.locationsContainer.addEventListener('click', handlLocationsContainerClick)

function handlLocationsContainerClick(event) {
    if(event.target.className === 'cross-btn'){
        delParentContainer(event)
    }
    if(event.target.className === 'location-item') {
        UI.input.value = event.target.innerText
    }
}

function delParentContainer(event) {
    event.target.parentElement.remove()
}

function addLocationContainer() {
    	console.log(111)
        let newLocation = document.createElement('div')
        newLocation.className = 'location-container'
        newLocation.innerHTML = `
                            <li class="location-item">${cityName}</li>
                            <span class="cross-btn"></span>
        `
        UI.locationsContainer.append(newLocation)
}

function sendRequest(url) {
    return fetch(url).then(response => response.json())   
}

function getNewCity(e) {
    if(e.target.type) {
        let newCityName = UI.input.value
        UI.input.value = ''
        if(newCityName.length > 0) {
            const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
            const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
            const url = `${serverUrl}?q=${newCityName}&appid=${apiKey}`;
            sendRequest(url)
                            .then(processDataResponse)
                            .catch(err => console.log(err))
        }
    }
}

function processDataResponse(data) {
    let temp = data.main.temp
    let newCityName = data.name
    let weather = data.weather[0].main
    console.log(temp, newCityName, weather)
    for (let i of UI.cityNames) {
        i.innerHTML = newCityName
    }
    cityName = newCityName
    let celsiusTemp = getCelsiusFromKelvin(temp)
    for(let i of temperatureContainers) {
        i.innerHTML = celsiusTemp
    }
    changeWeatherIcon(weather)

}

function changeWeatherIcon(weather) {
    let useTag = UI.weatherIcon.childNodes[1]
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