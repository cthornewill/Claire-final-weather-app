function displayTemperature(response) {
let temperatureElement = document.querySelector(".temperature");
let cityElement = document.querySelector("h1");
let nowElement = document.querySelector(".now");
let countryElement = document.querySelector(".country");
let feelsLikeElement = document.querySelector(".feelsLike")
let humidityElement = document.querySelector (".humidity")
let windElement = document.querySelector(".windSpeed")
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
nowElement.innerHTML = response.data.weather[0].description;
countryElement.innerHTML = response.data.sys.country;
feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);



console.log(response);

}


let apiKey = "72bb2a7b73389d4215aec25363ed9079"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`;



axios.get(apiUrl).then(displayTemperature);