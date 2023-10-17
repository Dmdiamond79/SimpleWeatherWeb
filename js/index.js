function fetchWeatherData() {
    const apiKey = 'diamond79';
    const url = `https://secure.geonames.org/searchJSON?country=id&maxRows=1000&style=SHORT&username=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const locations = data?.geonames;
        if (locations && locations.length > 0) {
          for (let i = 0; i < 3; i++) {
            const randomLocation = locations[Math.floor(Math.random()*locations.length)]; // generate 1 random location
            const { lat, lng } = randomLocation;
            fetchWeatherForecast(lat, lng, i+1);
          }
        }
      })
      .catch(error => {
        alert("failed")
      });
  }
  
function fetchWeatherForecast(latitude, longitude, index) {
  const apiKey = '52cbc71d08a447d2bf690953231710'; // api key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const forecast = data;
      if (forecast) {
        const locationName = data?.location?.name;
        const temperatureC = forecast?.current.temp_c;
        const temperatureF = forecast?.current.temp_f;
        const condition = forecast?.current?.condition.text;
        const iconURL = forecast?.current?.condition?.icon;

        // DOM Manupulation random weather
        const container = document.querySelector('.random-weather-forecast-container');
        const report = container.querySelectorAll('.forecast-report')[index - 1];

        const timeElement = report.querySelector('.time');
        const locationElement = report.querySelector('.location');
        const tempElementC = report.querySelector('.temp .celcius');
        const tempElementF = report.querySelector('.temp .fahrenheit');
        const conditionElement = report.querySelector('.condition');
        const iconElement = report.querySelector('.icon-forecast');

        timeElement.textContent = new Date().toLocaleTimeString();
        locationElement.textContent = `${locationName}, ${data?.location?.country}`;
        tempElementC.textContent = `${temperatureC}°C`;
        tempElementF.textContent = `${temperatureF}°F`;
        conditionElement.textContent = condition;
        iconElement.src = iconURL;
      }
    })
    .catch(error => {
      alert("failed")
    });
}

fetchWeatherData();
  