function displayTemperature(response) {
console.log(response.data.main.temp);
}


let apiKey = "72bb2a7b73389d4215aec25363ed9079"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`;



axios.get(apiUrl).then(displayTemperature);