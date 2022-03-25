export function saveFavoriteCities(favoriteCities) {
    localStorage.setItem('favoriteCities', favoriteCities)
}

export function getFavoriteCities() {
    return localStorage.getItem('favoriteCities')
}

export function setCurrentCity(currentCity) {
    localStorage.setItem('currentCity', currentCity)
}

export function getCurrentCity() {
    return localStorage.getItem('currentCity')
}

