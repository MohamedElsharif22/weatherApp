// get Api function
let searchInpt = document.getElementById("search");
// get user's Position
getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  getApi(`${position.coords.latitude},${position.coords.longitude}`);
}

getApi("sohag");

async function getApi(s) {
  let http = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=240f30789a264b27ab504634230608&q=${s}&days=3`
  );

  if (http.status === 200 && http.ok) {
    let daysWeather = await http.json();
    console.log(daysWeather);
    display(daysWeather.location, daysWeather.forecast.forecastday);
  }
}

// define month and weak Names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// generate search

searchInpt.addEventListener("keyup", function () {
  // console.log(searchInpt.value);
  getApi(searchInpt.value);
  // console.log("got it", daysWeather);
});

// display function
function display(location, threeDays) {
  const todayDate = new Date(threeDays[0].date);
  const tommorow = new Date(threeDays[1].date);
  const afterTommorow = new Date(threeDays[2].date);
  let d1 = todayDate.getDay();
  let m1 = todayDate.getMonth();
  let n1 = todayDate.getDate();
  let d2 = tommorow.getDay();
  let d3 = afterTommorow.getDay();
  // console.log(days[d]);
  // console.log(months[m]);
  // console.log(n);
  let divs = `
  <div class="col-lg">
							<div class="day-content">
								<div class="one date d-flex justify-content-between text-light text-opacity-75 bg-dark px-2 py-1 ">
									<span>${days[d1]}</span>
									<span>${n1} ${months[m1]}</span>
								</div>
								<div class="day-weather px-3 py-2">
									<span class="city text-light text-opacity-75">${location.name}</span>
									<p class="tempreture text-white">${threeDays[0].day.avgtemp_c}<span>o</span>C</p>
									<img src="https:${threeDays[0].day.condition.icon}" alt="...">
									<p class="weather-disc fs-6 text-info">${threeDays[0].day.condition.text}</p>
								</div>
							</div>
						</div>
						<div class="col-lg">
							<div class="day-content rounded">
								<div class="date text-center text-light text-opacity-75 bg-dark bg-opacity-75 px-2 py-1">
									<span>${days[d2]} </span>
								</div>
								<div class="tday-weather d-flex flex-column justify-content-between align-items-center text-center px-3 py-4">
									<img src="https:${threeDays[1].day.condition.icon}" alt="...">
									<p class="small-tempreture text-white fs-1 ">${threeDays[1].day.avgtemp_c}<span class="fs-3">o</span>C</p>
									<p class="weather-disc fs-6 text-info">${threeDays[1].day.condition.text}</p>
								</div>
							</div>
						</div>
						<div class="col-lg">
							<div class="day-content">
								<div class="three date text-center text-light text-opacity-75 bg-dark px-2 py-1">
									<span>${days[d3]}</span>
								</div>
								<div class="tday-weather day-weather d-flex flex-column justify-content-between align-items-center text-center px-3 py-4">
									<img src="https:${threeDays[2].day.condition.icon}" alt="...">
									<p class="small-tempreture text-white fs-1 ">${threeDays[2].day.avgtemp_c}<span class="fs-3">o</span>C</p>
									<p class="weather-disc fs-6 text-info">${threeDays[2].day.condition.text}</p>
								</div>
							</div>
						</div>
  `;
  document.getElementById("weatherRow").innerHTML = divs;
}
async function test1() {
  console.log(daysWeather);
}
