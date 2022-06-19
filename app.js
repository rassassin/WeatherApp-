const apiKey = "5b823175756edca6881486f2a5b1816b";
const pics = {
  snow: "https://images.unsplash.com/photo-1457269449834-928af64c684d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  rain: "https://images.unsplash.com/photo-1428592953211-077101b2021b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  shower:
    "https://images.unsplash.com/photo-1568749060075-55a51f687fa3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  drizzle:
    "https://images.unsplash.com/photo-1576234699886-7eb7f11aecb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
  cloudy:
    "https://images.unsplash.com/photo-1594156596782-656c93e4d504?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
  clouds:
    "https://images.unsplash.com/photo-1594156596782-656c93e4d504?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
  clear:
    "https://images.unsplash.com/photo-1495511167051-13bb07bde85b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
  sunny:
    "https://images.unsplash.com/photo-1465577512280-1c2d41a79862?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
  thunder:
    "https://images.unsplash.com/photo-1461511669078-d46bf351cd6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  storm:
    "https://images.unsplash.com/photo-1493243350443-9e3048ce7288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2097&q=80",
  extream:
    "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=989&q=80",
  mist: "https://images.unsplash.com/photo-1482841628122-9080d44bb807?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
  haze: "https://images.unsplash.com/photo-1517278401293-161e3fffd176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
};
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let days = document.querySelectorAll(".day");

  var now = new Date();
  for (let i = 1; i < 5; i++) {
    var dayIndex = (now.getDay() + i) % 7;
    days[i].textContent = dayNames[dayIndex];
  }

  function setPic(weatherName) {
    var keyNames = Object.keys(pics);
    for (var i in keyNames) {
      const keyName = keyNames[i];
      if (weatherName.toLowerCase().includes(keyName.toLowerCase())) {
        document.body.style.backgroundImage = "url(" + pics[keyName] + ")";
      }
    }
  }

  function getWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
        const forcastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const temperature = data.main.temp;
            const locationName = data.name;
            const summary = data.weather[0].description;
            const icon = data.weather[0].icon;
            const weatherName = data.weather[0].main;

            //set DOM Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = `${locationName} ${data.sys.country}`;
            setPic(weatherName);
          });

        fetch(forcastApi)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            var iconData = [];
            for (let i = 0; i < data.list.length; i++) {
              if (i == 0) {
                iconData.push(data.list[i]);
                continue;
              }
              if (data.list[i].dt_txt.endsWith("12:00:00")) {
                iconData.push(data.list[i]);
              }
              if (iconData.length == 5) {
                break;
              }
            }
            for (let i = 0; i < 5; i++) {
              days[i].textContent += ` ${iconData[i].main.feels_like} °C`;
            }
          });
      });
    }
  }
  getWeather();
});
