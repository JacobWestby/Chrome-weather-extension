const weatherNow = document.querySelector("#weather-now");
const weatherForecast = document.querySelector("#weather-forecast");

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

    const latPlusLon = lat + "," + lon;

    getWeather(lat, lon, latPlusLon);
};

getPos();

const getWeather = async (lat, lon, latPlusLon) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5847559e7amsh534c598b8312a2bp12f34ajsn17d2c0051708',
            'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
        }
    };

    const res = await fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${lat}%2C${lon}&contentType=json&unitGroup=metric&shortColumnNames=0`, options);
    const data = await res.json();

    const key = Object.keys(data.locations)[0];

    const currTemp = data.locations[key].currentConditions.temp

    weatherNow.innerHTML = currTemp;
}