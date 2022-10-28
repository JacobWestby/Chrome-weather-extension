const weatherNow = document.querySelector("#weather-now");
const weatherLocation = document.querySelector("#weather-location");
const clouds = document.querySelector("#weather-clouds");
const weatherTitle = document.querySelector("#weather__title");

const background = document.querySelector("body");

const getPos = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5847559e7amsh534c598b8312a2bp12f34ajsn17d2c0051708',
            'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
        }
    };

    const res = await fetch('https://ip-geo-location.p.rapidapi.com/ip/check?format=json', options)
    const data = await res.json();

    const lat = data.location.latitude;
    const lon = data.location.longitude;

    setTimeout(() => {
        weatherTitle.style.opacity = 1;
    }, 800);

    getWeather(lat, lon,);
};

getPos();

const getWeather = async (lat, lon) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5847559e7amsh534c598b8312a2bp12f34ajsn17d2c0051708',
            'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
        }
    };

    const res = await fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${lat}%2C${lon}&contentType=json&unitGroup=metric&shortColumnNames=0`, options);
    const data = await res.json();

    console.log(data);

    const key = Object.keys(data.locations)[0];

    const currTemp = data.locations[key].currentConditions.temp;
    const currLocation = data.locations[key].tz;
    const currClouds = data.locations[key].currentConditions.cloudcover;

    if (currClouds > 50) {
        background.classList.add("cloudy");
    } else {
        background.classList.add("normal");
    }

    weatherNow.innerHTML = currTemp + "°C";
    weatherLocation.innerHTML = currLocation;
    clouds.innerHTML = "clouds " + currClouds + "%";
};