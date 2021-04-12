function formatDate(timestamp){
    let date = new Date(timestamp);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[date.getMonth()];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    return `${day} ${month}`
}


function displayTemperature(response) {
let temperatureElement = document.querySelector(".temperature");
let cityElement = document.querySelector("h1");
let nowElement = document.querySelector(".now");
let countryElement = document.querySelector(".country");
let feelsLikeElement = document.querySelector(".feelsLike")
let humidityElement = document.querySelector (".humidity")
let windElement = document.querySelector(".windSpeed")
let dateElement = document.querySelector(".date");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
nowElement.innerHTML = response.data.weather[0].description;
countryElement.innerHTML = response.data.sys.country;
feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000)


}


let apiKey = "72bb2a7b73389d4215aec25363ed9079"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`;



axios.get(apiUrl).then(displayTemperature);