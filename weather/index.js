import * as storage from './storage.js'
import * as UI from './view.js'
import * as DATE from './date.js'


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

    for(let favoriteCity of favoriteCities) {
        addNewFavoriteCity(favoriteCity)
    }
}

function updateCity(e) {
    if(e.target.type) { 
        updateInfo()
    }
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

function updateInfo() {
    let newCityName = UI.input.value
    UI.input.value = ''
    if(newCityName.length > 0) {
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${newCityName}&appid=${apiKey}`;
        sendRequest(url)
                        .then(processCurrentDataResponse)
                        .then(updateForecast)
                        .catch(err => console.log(err))
    }
}

function updateForecast () {
    if(cityName.length > 0) {
        const serverUrl = 'http://api.openweathermap.org/data/2.5/forecast';
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
        sendRequest(url)
                        .then(processForecastDataResponse)
                        .catch(err => console.log(err))
    }
}

function processForecastDataResponse(data) {
    delAllForecastContainers()
    let timezone = data.city.timezone
    for(let i = 0; i < 5; i++) {
        const dataItem = data.list[i]

        const dateTime = dataItem.dt
        let temp = dataItem.main.temp
        let weather = dataItem.weather[0].main
        let feelsLike = dataItem.main.feels_like

        const todayFormatDate = DATE.getFormatDate('en-GB', 'MonthDay', dateTime, timezone)
        const tempCelsius = getCelsiusFromKelvin(temp)
        const feelsLikeCelsius = getCelsiusFromKelvin(feelsLike)
        const timeFormateDate = DATE.getFormatDate('ru', 'HHMM', dateTime, timezone)

        addNewForecastContainer(todayFormatDate, timeFormateDate, tempCelsius, weather, feelsLikeCelsius)
    }
}

function addNewForecastContainer(todayFormatDate, timeFormateDate, tempCelsius, weather, feelsLikeCelsius) {
    let newForecastContainer = document.createElement('div')
    newForecastContainer.className = 'forecast-wrapper'
    newForecastContainer.innerHTML = `
    <div class="forecast-date-value">
        ${todayFormatDate}
    </div>
    <div class="forecast-time-value">
        ${timeFormateDate}
    </div>
    <div class="forecast-temperature-container">
        <div class="forecast-temperature-item">Temperature: <span>${tempCelsius}</span></div>
        <div class="forecast-temperature-item">Feels like: <span>${feelsLikeCelsius}</span></div>
    </div>
    <div class="forecast-weather-container">
        <div class="forecast-weather-item"><span>${weather}</span></div>
        <div class="forecast-weather-icon-container">
            <svg class="forecast-weather-icon">
                <use xlink:href="./assets/svg/sprite.svg#${weather.toLowerCase()}"></use>
            </svg>
        </div>
    </div>
    `
    UI.forecastsContainer.append(newForecastContainer)
}

function processCurrentDataResponse(data) {
    let temp = data.main.temp
    let newCityName = data.name
    let weather = data.weather[0].main
    let feelsLike = data.main.feels_like
    let sunrise = data.sys.sunrise
    let sunset = data.sys.sunset
    let timezone = data.timezone

    const todayFormatDate = DATE.getFormatDate('en-GB', 'MonthDay', sunrise, timezone)
    const sunriseFormatDate = DATE.getFormatDate('ru', 'HHMM', sunrise, timezone)
    const sunsetFormatDate = DATE.getFormatDate('ru', 'HHMM', sunset, timezone)
    const tempCelsius = getCelsiusFromKelvin(temp)
    const feelsLikeCelsius = getCelsiusFromKelvin(feelsLike)
    
    UpdateAllNewCityParametres(
        tempCelsius, 
        newCityName, 
        weather, 
        feelsLikeCelsius, 
        sunriseFormatDate, 
        sunsetFormatDate,
        todayFormatDate
    )
    
    cityName = newCityName
    storage.setCurrentCity(cityName)

}

function UpdateAllNewCityParametres(temp, newCityName, weather, feelsLike, sunrise, sunset, todayFormatDate) {
    UpdateValueContainers(temp, 'temperatureContainers')
    UpdateValueContainers(newCityName, 'cityNameContainers')
    UpdateValueContainers(weather, 'weatherCountContainers')
    UpdateValueContainers(feelsLike, 'feelsLikeContainers')
    UpdateValueContainers(sunrise, 'sunriseContainers')
    UpdateValueContainers(sunset, 'sunsetContainers')
    UpdateValueContainers(todayFormatDate, 'todayDateContainers')
    UpdateValueContainers(getNewWeatherIconInnerHtml(weather), 'weatherIconsContainers')
}

function UpdateValueContainers(value, containersName) {
    for (let i of UI[containersName]) {
        i.innerHTML = value
    }
}

function getNewWeatherIconInnerHtml(weather) {
    let weatherIconInnerHTML = UI['weatherIconsContainers'][0].innerHTML
    let newHrefValue = `./assets/svg/sprite.svg#${weather.toLowerCase()}`
    
    let kek = weatherIconInnerHTML.split('\"')
    kek[1] = newHrefValue
    kek = kek.join('\"')

    return kek
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

function delAllForecastContainers() {
    UI.forecastsContainer.innerHTML = ''
}
