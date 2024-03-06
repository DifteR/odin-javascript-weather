/* eslint-disable linebreak-style */
// async function getWeather(kraj) {
//   // Fetch data only once using a closure
//   let cachedData;
//   return async () => {
//     if (!cachedData) {
//       cachedData = await fetch(
//         `http://api.weatherapi.com/v1/forecast.json?key=9c460b6effe04bb588065926242602&q=${kraj}&days=3&aqi=no&alerts=no`,
//         { mode: "cors" }
//       );
//       cachedData = await cachedData.json();
//     }
//     return cachedData;
//   };
// }

const inputBox = document.getElementById("inputBox");
let weatherLocation = "Maribor";
inputBox.addEventListener("keyup", () => getWeather(inputBox.value));

async function getWeather(location) {
  const cachedData = fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=9c460b6effe04bb588065926242602&q=${location}&days=3&aqi=no&alerts=no`,
    { mode: "cors" }
  )
    .then(function (response) {
      const cardContainer = document.getElementById("cardContainer");
      cardContainer.innerHTML = "";
      //console.log(response.json());
      return response.json();
    })
    .then(function (response) {
      processCurrentWeatherData(response);
      response.forecast.forecastday.forEach((element) => {
        processForecast(element);
      });
    });
}
//console.log(getWeather("Maribor"));

function processCurrentWeatherData(data) {
  const cardContainer = document.getElementById("cardContainer");
  console.log(data);
  const newCard = document.createElement("div");
  const cardContent = document.createElement("div");
  const cardPic = document.createElement("div");
  const cardTitle = document.createElement("div");
  const cardDegrees = document.createElement("div");
  cardContent.setAttribute("class", "pic");
  cardContent.setAttribute("class", "content");
  cardTitle.setAttribute("class", "title");
  cardDegrees.setAttribute("class", "degrees");
  cardTitle.innerText = data.location.name;
  cardPic.innerHTML = `<img src=${data.current.condition.icon}></img>`;
  cardDegrees.innerText = data.current.temp_c + "°C";
  newCard.setAttribute("class", "card");
  newCard.append(cardContent);
  cardContent.append(cardTitle);
  cardContent.append(cardPic);
  cardContent.append(cardDegrees);
  cardContainer.append(newCard);
}

function processForecast(forecast) {
  const cardContainer = document.getElementById("cardContainer");
  console.log(forecast);
  const newCard = document.createElement("div");
  const cardContent = document.createElement("div");
  const cardPic = document.createElement("div");
  const cardTitle = document.createElement("div");
  const cardDegrees = document.createElement("div");
  cardContent.setAttribute("class", "pic");
  cardContent.setAttribute("class", "content");
  cardTitle.setAttribute("class", "title");
  cardDegrees.setAttribute("class", "degrees");
  cardTitle.innerText = forecast.date;
  cardPic.innerHTML = `<img src=${forecast.day.condition.icon}></img>`;
  cardDegrees.innerText =
    forecast.day.mintemp_c + "°C | " + forecast.day.maxtemp_c + "°C";
  newCard.setAttribute("class", "card");
  newCard.append(cardContent);
  cardContent.append(cardTitle);
  cardContent.append(cardPic);
  cardContent.append(cardDegrees);
  cardContainer.append(newCard);
}
