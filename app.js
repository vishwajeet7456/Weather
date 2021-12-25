var btnTemperature = document.querySelector("#btn-temperature");
var txtInput = document.querySelector("#txt-input");
var outputDiv = document.querySelector("#output");
var weatherIcon = document.querySelector("#img1");
var weatherCondition = document.querySelector("#wtrCndn")
var weatherDescription = document.querySelector("#output1");

var serverURL = "https://api.openweathermap.org/data/2.5/weather"

function getTemperatureURL(text) {
    return serverURL + "?" + "q=" + text + "&appid=5b8d5172c413d7d626f336e41583f894" + "&units=metric"
}

function errorHandler(error) {
    console.log("error occured", error);
    alert("Something wrong with the server! try again after some time")
}

function clickHandler() {
    var inputText = txtInput.value;

    fetch(getTemperatureURL(inputText))
        .then(response => response.json())
        .then(json => {
            var currentTemperature = json.main.temp;
            outputDiv.innerText = currentTemperature + " °C";
            var currentIcon = json.weather[0].icon;
            weatherIcon.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";
            var currentWeatherCondition = json.weather[0].main;
            weatherCondition.innerText = currentWeatherCondition;
            var wind = json.wind.speed * 3.6;
            var humidity = json.main.humidity;
            var pressure = json.main.pressure;
            weatherDescription.innerText = "Wind: " + wind + " Km/h | Humidity: " + humidity + " % | Pressure: " + pressure + " mb";
        })
        .catch(errorHandler)
};

btnTemperature.addEventListener("click", clickHandler)