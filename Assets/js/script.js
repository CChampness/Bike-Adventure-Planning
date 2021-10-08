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