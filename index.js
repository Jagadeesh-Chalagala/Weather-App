// reference elements
let searchInput = document.getElementById("search-input");
let addCityBtn = document.getElementById("btn");
let cardContainer = document.getElementsByClassName("card-container")[0];
let inputText = "";

const searchedCities = [];
let temperatureObject = {};

//event listeners
searchInput.addEventListener("change", (e) => {

  inputText = e.target.value;

});

addCityBtn.addEventListener("click", () => {
  if (inputText !== "") {

    if(searchedCities.length !== 0)
    {
        let moveon = searchedCities.every( x => x !== inputText.toLowerCase());
        if(moveon === false) return;
    }
    searchedCities.push(inputText.toLowerCase())
    getCitiesWeather();
  }
});

//functions
async function getCitiesWeather() {

  let CITY_NAME = inputText;
  let API_KEY = "b7dc21448211c6a3e4584491c39eb68d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;
  let response = await fetch(url);
  let requiredData = await response.json();

  let cityName = requiredData.name;
  let country = requiredData.sys.country;
  let temperature = requiredData.main.temp;
  let temperatureMax = requiredData.main.temp_max;
  let temperatureMin = requiredData.main.temp_min;
  let humidity = requiredData.main.humidity;
  let pressure = requiredData.main.pressure;
  let windSpeed = requiredData.wind.speed;
  let winddeg = requiredData.wind.deg;
  let condition = requiredData.weather[0].description;
  let weatherIcon = requiredData.weather[0].icon;

  //card
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
                <div class="card-left">
                    <div class="temperature">
                        ${temperature}°
                    </div>
                    <div class="temp-levels">
                        <b>H</b> : ${temperatureMax}° &nbsp;<b>L</b> : ${temperatureMin}°
                    </div>
                    <div class="wind">
                        Wind Speed : ${windSpeed}
                        </br>
                        Wind Direction : ${winddeg}°
                    </div>
                    <div class="hp-levels">
                        Humidity: ${humidity} 
                        </br>
                        Pressure: ${pressure}
                    </div>
                    <div class="city">
                        ${cityName},  ${country}
                    </div>
                </div>
                <div class="card-right">
                    <div class="weather-icon">
                         <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="">
                    </div>
                    <div class="condition">
                        ${condition}
                    </div>
                </div>
  `
  // filtering
  temperatureObject = {...temperatureObject , [temperature] : card}
  let list = [...Object.keys(temperatureObject)].sort();
  list.forEach((item)=> {
    cardContainer.appendChild(temperatureObject[item]);
  })

}
