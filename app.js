const button = document.querySelector("button");
const input = document.querySelector("input");
const temperaturePara = document.querySelector(".temperature");
const namePara = document.querySelector(".name");
const weatherPara = document.querySelector(".weather");

let weather;
let temperature;
let city = "";

let errors = false;
let searchedCity = "London";
let key = "f1694491f317f6affb2dd707b7bc7ba3";

async function obtainWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${key}`,
      { mode: "cors" }
    );

    const weatherObj = await response.json();

    weather = weatherObj.weather[0].main;
    temperature = (weatherObj.main.temp - 273.15).toFixed(1);
    city = weatherObj.name;
  } catch {
    errors = true;
  }
}

async function renderWeather() {
  if (!errors) {
    await obtainWeather();
    namePara.textContent = city;
    temperaturePara.textContent = temperature;
    weatherPara.textContent = weather;
  }
  errors = false;
}

button.addEventListener("click", function () {
  searchedCity = input.value;
  renderWeather();
  input.value = "";
});

renderWeather();
