const API_KEY = "63616a8b3d2a42fc882122523261106";
const todayDate = document.getElementById("today-date");
const todayTime = document.getElementById("time");
const button = document.getElementById("searchBtn");
const myLoc = document.getElementById("myLoc");
const temp = document.getElementById("temp");
const convertF = document.getElementById("convertF");
const humid= document.getElementById("humid");
const wind= document.getElementById("wind");
const tomorrow=document.getElementById("tomorrow");
const dayAfterTom=document.getElementById("day-after-tom")
const nextToNext=document.getElementById("next-to-next")
const futureday1=document.getElementById("future-day1")
const futureday2=document.getElementById("future-day2")
const futureday3=document.getElementById("future-day3")
// const date=document.getElementById("date")

function showdate() {
  let date = new Date();
  todayDate.innerHTML = date.toDateString();
  console.log(todayDate);
}
showdate();
function time() {
  let time = new Date();
  todayTime.innerHTML = time.toLocaleTimeString();
  console.log(todayTime);
}
time();

async function fetchData(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
  const response = await fetch(url); //fetch the data using url
  const data = await response.json(); //isme response jo aaegas usko json me convert kr rhe h
  console.log(data);
  return data;
}
async function fetchForecast(city) {
    const forecastUrl =
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4`;

    const forecastResponse = await fetch(forecastUrl);

    const forecastData = await forecastResponse.json();
  console.log(forecastData)
    return forecastData;
}
// async function fetchForecast(city) {
//     // const forecastData= document.getElementById("forecast")
//     const forecastUrl=`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`
//     const forecastResponse = await fetch(forecastUrl)
//     const forecastData= forecastResponse.json()
//     console.log(forecastData)
//     return forecastData
// }
button.addEventListener("click", async function (e) {
  e.preventDefault();
  const city = document.getElementById("city").value;
  console.log(city);

  try {
    const data = await fetchData(city);
    const forecastData= await fetchForecast(city)
    myLoc.innerHTML = `${data.location.name} , ${data.location.region}, ${data.location.country}`;
    temp.innerHTML = `${data.current.temp_c}°C`; //fetch temperture
    humid.innerHTML=`${data.current.humidity}`
    wind.innerHTML=`${data.current.wind_kph}`
    futureday1.innerHTML=`${forecastData.forecast.forecastday[1].date}`
    futureday2.innerHTML=`${forecastData.forecast.forecastday[2].date}`
    futureday3.innerHTML=`${forecastData.forecast.forecastday[3].date}`   

tomorrow.innerHTML =
`${forecastData.forecast.forecastday[1].day.avgtemp_c}°C`;

dayAfterTom.innerHTML =
`${forecastData.forecast.forecastday[2].day.avgtemp_c}°C`;

nextToNext.innerHTML =
`${forecastData.forecast.forecastday[3].day.avgtemp_c}°C`;

    console.log()
  } catch (error) {
    console.log(error);
  }
});
convertF.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    const city = document.getElementById("city").value;
    const data = await fetchData(city);
    temp.innerHTML = `${data.current.temp_f}°F`;  
  } catch (error) {
    console.log(error);
  }
});



