var lon = -84.3880;
var lat = 33.7490;
var zoomLevel = 10;

require(["esri/config","esri/Map", "esri/views/MapView"], function (esriConfig,Map, MapView) {

    esriConfig.apiKey = "AAPKbbdca0354bd14e219ced6d2c9ff0409fm8qAWYWDXxZDafmWRXclQUUtOI03SgBdvMNUUo0tI8GQsXwEsBdGdNuR9edPlFc6";

    const map = new Map({
      basemap: "arcgis-topographic" // Basemap layer service
    });

  const view = new MapView({
    map: map,
    center: [lon, lat], // Longitude, latitude
    zoom: zoomLevel, // Zoom level
    container: "map" // Div element
  });
});

