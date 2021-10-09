var searchbutton1 = document.getElementById("searchButton")
var weatherapi = " "
var iconpic= " "

// add click event

$(searchbutton1).click(async function (event) {
    event.preventDefault()
    var location1 = document.getElementById("location")
    var array = location1.value.split(',');
    var city = array[0];
    
    // full = location1.value.split(" ").join("");
    weatherapi = "https://api.openweathermap.org/data/2.5/weather/?q=" + city + "&units=imperial&appid=913f8a0c9bf081d9e94bfd04b9efd30c"
    console.log(weatherapi)
    
    // fetch api inside click event

    data = await fetch(weatherapi)
        .then(response => response.json())
        .then(data => data)
    console.log(data)
    
    

    currentweather(data)
})


function currentweather(data) {
    console.log(currentweather)
    var iconimage= document.getElementById("ICON")
    var div1 = document.getElementById("W1")
    var div2= document.getElementById("W2")
    var div3 = document.getElementById("W3")
    iconimage.src= " http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    div1.innerHTML ="current temp: " + data.main.temp
    div2.innerHTML = "max temp: " + data.main.temp_max
    div3.innerHTML=  "min temp: " + data.main.temp_min
    
}



require(["esri/config","esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], function (esriConfig,Map, MapView, FeatureLayer) {
    esriConfig.apiKey = "AAPKbbdca0354bd14e219ced6d2c9ff0409fm8qAWYWDXxZDafmWRXclQUUtOI03SgBdvMNUUo0tI8GQsXwEsBdGdNuR9edPlFc6";
    const map = new Map({
      basemap: "arcgis-topographic" // Basemap layer service
    });
    const view = new MapView({
        map: map,
        center: [-81.0912, 32.0809], // Longitude, latitude of Savannah, GA
        zoom: 13, // Zoom level
        container: "map" // Div element
    });
    const trailheadsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });
    map.add(trailheadsLayer);
    //Trail Lines
    const trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
    });
    map.add(trailsLayer, 0);
    // Parks
    const parksLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
    });
    map.add(parksLayer, 0);
});