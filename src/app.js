// Region
function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

function displayArea(response) {
    let cityElement = document.querySelector("h1");
    let countryElement = document.querySelector(".country");

    cityElement.innerHTML = response.data.name;
    countryElement.innerHTML = response.data.sys.country;
    
    convertCountryCode(countryElement.innerHTML);
}

function convertCountryCode(countryCode){
    document.querySelector(".country").innerText = getCountryName(countryCode).toUpperCase();
}


//Forecast

function displayForecast(){
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row right-aligned" style="
    margin-right: -66px;
">`;
    forecastHTML = forecastHTML + `
        <div class="col-3 forecast-box" style="
        width: 20%;
    ">
            <span class="forecast-day">WED</span> 
            <br>
            <img src="http://openweathermap.org/img/wn/01d@2x.png" width="36">
            <br>
            <span class="maxTemp">18º</span>
            <span class="minTemp">12º</span>
        </div>`;
    
    forecastHTML = forecastHTML + `
        <div class="col-3 forecast-box" style="
        width: 20%;
    ">
            <span class="forecast-day">WED</span> 
            <br>
            <img src="http://openweathermap.org/img/wn/01d@2x.png" width="36">
            <br>
            <span class="maxTemp">18º</span>
            <span class="minTemp">12º</span>
        </div>`;
        forecastHTML = forecastHTML + `
        <div class="col-3 forecast-box" style="
        width: 20%;
    ">
            <span class="forecast-day">WED</span> 
            <br>
            <img src="http://openweathermap.org/img/wn/01d@2x.png" width="36">
            <br>
            <span class="maxTemp">18º</span>
            <span class="minTemp">12º</span>
        </div>`;
        forecastHTML = forecastHTML + `
        <div class="col-3 forecast-box last-forecast-box" style="
        width: 20%;
        border-radius: 20px 0px 0px 20px;">
            <span class="forecast-day">WED</span> 
            <br>
            <img src="http://openweathermap.org/img/wn/01d@2x.png" width="36">
            <br>
            <span class="maxTemp">18º</span>
            <span class="minTemp">12º</span>
        </div>`;
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;

}

displayForecast();

//Date
function formatDate(timestamp){
    let date = new Date(timestamp);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[date.getMonth()];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    let dia = date.getDate();
    return `${day} ${dia}. ${month}`
}



// weather
function displayTemperature(response) {
    let temperatureElement = document.querySelector(".temperature");
    let nowElement = document.querySelector(".nowDescription");
    let feelsLikeElement = document.querySelector(".feelsLike")
    let humidityElement = document.querySelector (".humidity")
    let windElement = document.querySelector(".windSpeed")
    let dateElement = document.querySelector(".date");
    let iconElement = document.querySelector(".imageIcon");

    
    celciusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celciusTemperature);
    nowElement.innerHTML = response.data.weather[0].description;
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

}

function convertFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector(".temperature");
    
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celciusTemperature * 9) /5 + 32; 
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelcius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector(".temperature");
    temperatureElement.innerHTML  = Math.round(celciusTemperature);

    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

let celciusTemperature = null;

// general
function search(city) {
    let apiKey = "72bb2a7b73389d4215aec25363ed9079"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
    axios.get(apiUrl).then(displayArea);
 }

function handleSubmit(event) { 
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);

}

let form = document.querySelector("#searchInput");
form.addEventListener("submit", handleSubmit);

let searchIcon = document.querySelector(".searchIcon")
searchIcon.addEventListener("click", handleSubmit);

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celciusLink = document.querySelector(".celcius");
celciusLink.addEventListener("click", convertCelcius);

// page load
function myLocation(position) {
  let apiKey = "72bb2a7b73389d4215aec25363ed9079"
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(displayArea);
}

navigator.geolocation.getCurrentPosition(myLocation);