function titleCase(str) {
  let result = str.split("").map((char, index) => (index === 0 ? char.toUpperCase() : char)).join("");
  return result;
}

async function getWeather(city) {
  const location = city;
  const apiKey = "c4eeb430d4e671aab85f32f16a691294";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const { temp, feels_like } = data.main;
    const description = data.weather[0].description;
    const cityName = data.name;
    const country = data.sys.country;
    const windSpeed = Number(data.wind.speed);
    const Icon = data.weather[0].icon;

    return {
      temp,
      feels_like,
      description,
      cityName,
      country,
      windSpeed,
      Icon,
    };
  } catch (error) {
    return -1;
  }
}

search_button = document.getElementById('search');
function weather(){
  console.log("clicked")
    const info = document.getElementById("info");
    info.style.display = "none";
    document.getElementById("error").style.display = "none";
    let city = document.getElementById("input").value;
    city = titleCase(city);
    getWeather(city).then((weatherData) => {
      if (weatherData != -1) {
          box.style.height = "max-content";
          info.style.display = "flex";
          document.getElementById("error").style.display = "none";
          const temperature = weatherData.temp;
          const description = weatherData.description;
          const windsp = Number(weatherData.windSpeed);
          const Icon = weatherData.Icon;
          const weathericon = document.getElementById("weather-icon");
          document.getElementById("temp").innerHTML = `${temperature}°C`;
          document.getElementById("city").innerHTML = weatherData.cityName;
          icon_url = `https://openweathermap.org/img/wn/${Icon}@2x.png`;
          weathericon.src = icon_url;
          document.getElementById("descrip").innerHTML = titleCase(description);
          document.getElementById("speed").innerHTML = `Wind: ${windsp} m/s`;
          
      } else if (weatherData == -1) {
          box.style.height = "max-content";
          info.style.display = "none";
          document.getElementById("error").style.display = "block";
          info.style.fontSize = "20px";
      }
    });
  }
search_button.addEventListener('click',weather);
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    document.getElementById("search").click();
    search_button.addEventListener('click',weather);
  }
});
