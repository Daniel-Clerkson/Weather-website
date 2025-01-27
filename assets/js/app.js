const apiWeatherKey = "9fc6488ccc8defed7bf0bd293ed68123";
const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let date = document.getElementById("date");
const btn = document.querySelector("button");

let weatherEl = document.getElementById("weather")
let dateObj = new Date();
let month = months[dateObj.getUTCMonth()];
let day = days[dateObj.getUTCDay() - 1];
let dayEl = dateObj.getUTCDate();
let desc = document.getElementById("desc");
let imgDesc = document.getElementById("imgDesc");
let airQuality = document.getElementById("airQuality");
let humidityQuality = document.getElementById("humidity");
let pressureQuality = document.getElementById("pressure");
let sunsetTime = document.getElementById("sunset");
let sunriseTime = document.getElementById("sunrise");
let visibilityQuality = document.getElementById("visibility");
let realFeel = document.getElementById("feel");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");
let date3 = document.getElementById("date3");
let date4 = document.getElementById("date4");
let date5 = document.getElementById("date5");
let day1 = document.getElementById("day1");
let day2 = document.getElementById("day2");
let day3 = document.getElementById("day3");
let day4 = document.getElementById("day4");
let day5 = document.getElementById("day5");
let wday1 = document.getElementById("day1-weather");
let wday2 = document.getElementById("day2-weather");
let wday3 = document.getElementById("day3-weather");
let wday4 = document.getElementById("day4-weather");
let wday5 = document.getElementById("day5-weather");
let wimg1 = document.getElementById("weatherimg1");
let wimg2 = document.getElementById("weatherimg2");
let wimg3 = document.getElementById("weatherimg3");
let wimg4 = document.getElementById("weatherimg4");
let wimg5 = document.getElementById("weatherimg5");

let numbers = [0, 1, 2, 3, 4];


async function getWeather(){
    try{
        let city = document.getElementById("search").value;
        let city1 = document.getElementById("cityName");
        const form = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=metric`;
        const forecastForm = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiWeatherKey}&units=metric`;

        const forecastDataFetch = await fetch(forecastForm,{
            headers:{
                Accept: "application/json"
            }
        });
        const weatherDataFetch = await fetch(form,{
            headers:{
                Accept: "application/json"
            }
        });

        const weatherData = await weatherDataFetch.json();
        const forecastData = await forecastDataFetch.json();

        city1.innerHTML = `${weatherData.name},`;
        date.innerHTML = `${day}, ${month} ${dayEl}`;
        day1.innerHTML = days[dateObj.getUTCDay()];
        day2.innerHTML = days[dateObj.getUTCDay() -3];
        day3.innerHTML = days[dateObj.getUTCDay() -5];
        day4.innerHTML = days[dateObj.getUTCDay() -4];
        day5.innerHTML = days[dateObj.getUTCDay() -3];
        date1.innerHTML = `${dayEl +1}, ${month}`;
        date2.innerHTML = `${dayEl +2}, ${month}`;
        date3.innerHTML = `${dayEl +3}, ${month}`;
        date4.innerHTML = `${dayEl +4}, ${month}`;
        date5.innerHTML = `${dayEl +5}, ${month}`;
        wday1.innerHTML = `${Math.round(forecastData.list[0].main.temp)}&deg;<sup>c</sup>`;
        wday2.innerHTML = `${Math.round(forecastData.list[1].main.temp)}&deg;<sup>c</sup>`;
        wday3.innerHTML = `${Math.round(forecastData.list[2].main.temp)}&deg;<sup>c</sup>`;
        wday4.innerHTML = `${Math.round(forecastData.list[3].main.temp)}&deg;<sup>c</sup>`;
        wday5.innerHTML = `${Math.round(forecastData.list[4].main.temp)}&deg;<sup>c</sup>`;
        wimg1.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[0].weather[0].icon}.png`);
        wimg2.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[numbers[1]].weather[0].icon}.png`);
        wimg3.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[numbers[2]].weather[0].icon}.png`);
        wimg4.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[numbers[3]].weather[0].icon}.png`);
        wimg5.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[numbers[4]].weather[0].icon}.png`);

        city1.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
        let finalWeather = Math.round(weatherData.main.temp);
        weatherEl.innerHTML = `${finalWeather}&deg;<sup>c</sup>`;
        desc.innerHTML = weatherData.weather[0].description;
        let imgs = weatherData.weather[0].icon;
        let humidity = weatherData.main.humidity;
        let pressure = weatherData.main.pressure;
        let sunrise = weatherData.sys.sunrise;
        let sunset = weatherData.sys.sunset;
        let realFeelValue = Math.round(weatherData.main.feels_like);
        let visibility = weatherData.visibility/1000;
        realFeel.innerHTML = `${realFeelValue}&deg;<sup>c</sup>`;
        visibilityQuality.innerHTML = `${visibility}<sub>Km</sub>`;
        humidityQuality.innerHTML = `${humidity}<sub>%</sub>`;
        pressureQuality.innerHTML = `${pressure}<sub>hPa</sub>`;
        imgDesc.setAttribute("src", `./assets/images/weather_icons/${imgs}.png`);
    }
    catch(error){
        console.log(error);
    }
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}
  
async function showPosition(position) {
    console.log(position.coords.latitude + " " + position.coords.longitude);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;


    const form = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiWeatherKey}&units=metric`;
    
    const weatherDataFetch = await fetch(form,{
        headers:{
            Accept: "application/json"
        }
    });
    
    const weatherData = await weatherDataFetch.json();

    let city1 = document.getElementById("cityName");
    city1.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
    let finalWeather = Math.round(weatherData.main.temp);
    weatherEl.innerHTML = `${finalWeather}&deg;<sup>c</sup>`;
    desc.innerHTML = weatherData.weather[0].description;
    let imgs = weatherData.weather[0].icon;
    let humidity = weatherData.main.humidity;
    let pressure = weatherData.main.pressure;
    let realFeelValue = Math.round(weatherData.main.feels_like);
    let visibility = weatherData.visibility/1000;
    realFeel.innerHTML = `${realFeelValue}&deg;<sup>c</sup>`;
    visibilityQuality.innerHTML = `${visibility}<sub>Km</sub>`;
    humidityQuality.innerHTML = `${humidity}<sub>%</sub>`;
    pressureQuality.innerHTML = `${pressure}<sub>hPa</sub>`;
    imgDesc.setAttribute("src", `./assets/images/weather_icons/${imgs}.png`);


    date.innerHTML = `${day}, ${month} ${dayEl}`;
    day1.innerHTML = days[dateObj.getUTCDay()];
    day2.innerHTML = days[dateObj.getUTCDay() +1];
    day3.innerHTML = days[dateObj.getUTCDay() +2];
    day4.innerHTML = days[dateObj.getUTCDay() +3];
    day5.innerHTML = days[dateObj.getUTCDay() +4];
    date1.innerHTML = `${dayEl +1}, ${month}`;
    date2.innerHTML = `${dayEl +2}, ${month}`;
    date3.innerHTML = `${dayEl +3}, ${month}`;
    date4.innerHTML = `${dayEl +4}, ${month}`;
    date5.innerHTML = `${dayEl +5}, ${month}`;
    wday1.innerHTML = `${Math.round(forecastData.list[0].main.temp)}&deg;<sup>c</sup>`;
    wday2.innerHTML = `${Math.round(forecastData.list[1].main.temp)}&deg;<sup>c</sup>`;
    wday3.innerHTML = `${Math.round(forecastData.list[2].main.temp)}&deg;<sup>c</sup>`;
    wday4.innerHTML = `${Math.round(forecastData.list[3].main.temp)}&deg;<sup>c</sup>`;
    wday5.innerHTML = `${Math.round(forecastData.list[4].main.temp)}&deg;<sup>c</sup>`;
    wimg1.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[0].weather[0].icon}.png`);
    wimg2.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[numbers[1]].weather[0].icon}.png`);
    wimg3.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[numbers[2]].weather[0].icon}.png`);
    wimg4.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[numbers[3]].weather[0].icon}.png`);
    wimg5.setAttribute("src", `./assets/images/weather_icons/${forecastData.list[numbers[4]].weather[0].icon}.png`);


    console.log(weatherData.main.temp)


}