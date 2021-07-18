function formatDate(timestamp) {
  //calculates the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="" width="60" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-high">82°</span>
          <span class="weather-forecast-temperature-low"> 75°</span>
        </div>
      
    </div>`;
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "fdcd56ea6e53c9d3c7330d2c7397cff6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  //   console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let currentConditionsElement = document.querySelector("#current-conditions");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  currentConditionsElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "fdcd56ea6e53c9d3c7330d2c7397cff6";
  //   let city = "Richmond";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  //console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  //remove the active class to the fahrenheit link
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  //   alert(celsiusTemperature);

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function currentLocationSearch(position) {
  let apiKey = "fdcd56ea6e53c9d3c7330d2c7397cff6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocationSearch);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", currentLocation);

// function displayWindKilometers(event) {
//   event.preventDefault();
//   let windSpeedElement = document.querySelector("#wind-speed");

//   //   //remove the active class to the fahrenheit link
//   //   fahrenheitLink.classList.remove("active");
//   //   celsiusLink.classList.add("active");
//   //   let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
//   //   //   alert(celsiusTemperature);

//   let miles = Math.round(response.data.wind.speed);
//   let kilometers = miles / 1.609;

//   windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
// }

// function displayWindKilometers(event) {
//   event.preventDefault();

//   let windSpeedElement = document.querySelector("#wind-speed");
//   let miles = Math.round(response.data.wind.speed);
//   let kilometers = miles / 1.609;

//   windSpeedElement.innerHTML = miles;
// }

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// let windKilometers = document.querySelector("#wind-kilometers");
// celsiusLink.addEventListener("click", displayWindKilometers);

// let windMiles = document.querySelector("#wind-miles");
// fahrenheitLink.addEventListener("click", displayWindMiles);

search("Richmond");
