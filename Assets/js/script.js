require(["esri/config","esri/Map", "esri/views/MapView"], function (esriConfig,Map, MapView) {
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
});