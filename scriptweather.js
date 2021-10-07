var searchbottom1 = document.getElementById("searchBotton")
var location1 = document.getElementById("location")
var weatherapi = " "


// add click event
$(searchbottom1).click(async function (event) {
    event.preventDefault()
    weatherapi = "https://api.openweathermap.org/data/2.5/weather?q=" + location1.value + "&units=imperial&current.temp=&current.humidity=&daily.weather.description=&current.uvi=&hourly.wind_speed=&current.weather.icon=&appid=913f8a0c9bf081d9e94bfd04b9efd30c"

    // fetch api inside click event

    data = await fetch(weatherapi)
        .then(response => response.json()
            .then(data => data))
    console.log(data)
})
