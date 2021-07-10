function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let currentConditionsElement = document.querySelector("#current-conditions");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  currentConditionsElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "fdcd56ea6e53c9d3c7330d2c7397cff6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Richmond&appid=${apiKey}&units=imperial`;

//console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
