const apiKey = "5b823175756edca6881486f2a5b1816b";
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".location-timezone")



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
            const forcastApi = `${proxy}api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const temperature = data.main.temp;
                    const locationName = data.name
                    const summary = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    const weather = data.weather[0].main;

                    //set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.sys.country
                    //set Icon
                    // setIcons(icon, )
                });

                fetch(forcastApi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                });
        });
    }

    function seticons(icon, iconId) {
        const weatherIcons = new weatherIcons({
            color: white
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        iconElement.play()
        return iconElement.set(iconID, iconElement[currentIcon])
    }
});