function search(event){
    event.preventDefault(); // prevents it from loading into another page
    let searchInput = document.querySelector("#search-text-input");
    let city = searchInput.value;
    let apikey = "06cffcec970a84624ftfdo3fb2c867aa"; // api key 
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
    axios.get(apiUrl).then(displayTemp);


}

function displayTemp (response){
    console.log(response);
    let city = response.data.city;
    let temperature = Math.round(response.data.temperature.current);
    let humidity = response.data.temperature.humidity;
    let wind = response.data.wind.speed;

    let cityElement = document.querySelector("h1");
    cityElement.innerHTML =`${city}`;

    let temperatureElement = document.querySelector("#current-temperature")
    temperatureElement.innerHTML = `${temperature}`;

    let humidityElement = document.querySelector("#current-humidity");
    humidityElement.innerHTML = `${humidity}%`;

    let windElement = document.querySelector("#current-wind");
    windElement.innerHTML = `${wind}mlh`;

    getForecast(response.data.city);
 }

 function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;

}

let currentDateELement = document.querySelector("#current-details");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

 
let form = document.querySelector("#search-input");
form.addEventListener ("submit", search);

function changeTheme() {
    // Select the <body> element
    let body = document.querySelector("body");
    
    // Toggle the "dark" class
    body.classList.toggle("dark");
  
  }

  function getForecast(city){
    let apikey = "06cffcec970a84624ftfdo3fb2c867aa";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
    console.log(apiUrl);
    axios(apiUrl).then(displayForcast);
  }

  function displayForcast(response) {
    console.log(response.data);
    let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed","Thu","Fri","Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index){
    if(index < 5) {
     forecastHtml += `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <div class="weather-forecast-icon">
    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
    </div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}º</strong>
      </div>
      <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
    </div>
  </div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}


 

  
  // Attach the event listener to the button
  let themeButton = document.querySelector("#dark-theme-button");
  themeButton.addEventListener("click", changeTheme);
  


  
