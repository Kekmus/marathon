import * as storage from './storage.js'
import * as UI from './view.js'


let cityName;
let favoriteCities = new Set();

UI.form.addEventListener('click', updateCity)
UI.likeButton.addEventListener('click', addLocationContainer)
UI.locationsContainer.addEventListener('click', handlLocationsContainerClick)

initilize()

function initilize() {
    cityName = storage.getCurrentCity()
    favoriteCities = getSetFromStringArray(storage.getFavoriteCities())

    UI.input.value = cityName
    updateCity({target: {type: 1}})

    for(let favoriteCitie of favoriteCities) {
        addNewFavoriteCity(favoriteCitie)
    }


}

function handlLocationsContainerClick(event) {
    if(event.target.className === 'cross-btn'){
        let delCityName = event.target.previousElementSibling.innerText
        favoriteCities.delete(delCityName)
        storage.saveFavoriteCities(getStringFromSet(favoriteCities))
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
    let newCityName = cityName;
    if(favoriteCities.has(newCityName)) 
        throw new Error('Trying to add an existing city to your favorites')
    addNewFavoriteCity(newCityName)
}

function addNewFavoriteCity(newCityName) {
    let newLocation = document.createElement('div')
    newLocation.className = 'location-container'
    newLocation.innerHTML = `
                        <li class="location-item">${newCityName}</li>
                        <span class="cross-btn"></span>
    `
    UI.locationsContainer.append(newLocation)
    favoriteCities.add(newCityName)
    storage.saveFavoriteCities(getStringFromSet(favoriteCities))
}

function sendRequest(url) {
    return fetch(url).then(response => response.json())   
}

function updateCity(e) {
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
    console.log(data)
    let temp = data.main.temp
    let newCityName = data.name
    let weather = data.weather[0].main
    let feelsLike = data.main.feels_like
    let sunrise = data.sys.sunrise
    let sunset = data.sys.sunset
    let timezone = data.timezone
    getHHMMFromUnixTime(sunrise, timezone)
    console.log(temp, newCityName, weather, feelsLike, sunrise, sunset)
    UpdateAllNewCityParametres(
        getCelsiusFromKelvin(temp), 
        newCityName, 
        weather, 
        getCelsiusFromKelvin(feelsLike), 
        getHHMMFromUnixTime(sunrise, timezone), 
        getHHMMFromUnixTime(sunset, timezone)
    )
    cityName = newCityName
    storage.setCurrentCity(cityName)
    changeWeatherIcon(weather)

}

function UpdateAllNewCityParametres(temp, newCityName, weather, feelsLike, sunrise, sunset) {
    UpdateValueContainers(temp, 'temperatureContainers')
    UpdateValueContainers(newCityName, 'cityNameContainers')
    UpdateValueContainers(weather, 'weatherCountContainers')
    UpdateValueContainers(feelsLike, 'feelsLikeContainers')
    UpdateValueContainers(sunrise, 'sunriseContainers')
    UpdateValueContainers(sunset, 'sunsetContainers')
}

function UpdateValueContainers(value, containersName) {
    for (let i of UI[containersName]) {
        i.innerHTML = value
    }
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

function getStringFromSet(set) {
    return JSON.stringify([...set])
}

function getSetFromStringArray(arrayString) {
    return new Set(JSON.parse(arrayString))
}

function getHHMMFromUnixTime(unixTime, timezone) {
    const milliseconds = unixTime * 1000
    const date = new Date(milliseconds)
    const diffWithUTCTime = timezone / 3600

    date.setHours((date.getUTCHours() + diffWithUTCTime) % 24)

    return new Intl.DateTimeFormat("ru", {timeStyle: "short"}).format(date)
}