// Default location, comes up the first time the web page is displayed.
var cityName = "El Paso"; 
var defaultLon = -106.499;
var defaultLat = 31.7980770813721;
var lon = defaultLon;
var lat = defaultLat;
var defaultZoomLevel = 13;
var AppID = "acafba783f22a6fd98819aec5579ae53"
var cityApi = "https://api.openweathermap.org/data/2.5/weather?q=";
var cityKey = "cityKey";
var zoomKey = "zoomKey";
var cityFormEl = document.querySelector('#city-form');
var cityNameEl = document.querySelector('#cityname');
var radiusEl = document.querySelector('#radius');
var searchbutton1 = document.getElementById("searchButton")
var weatherapi = " "
var iconpic= " "

async function weatherAndLocation(event) {
  if (event) {
    event.preventDefault();
  }
  weatherapi = "https://api.openweathermap.org/data/2.5/weather/?q=" + cityName + "&units=imperial&appid=913f8a0c9bf081d9e94bfd04b9efd30c"
  console.log(weatherapi)
    
  data = await fetch(weatherapi)
  .then(response => response.json())
  .then(data => data)
  console.log(data)
  currentweather(data)
}

function currentweather(data) {
  console.log("data:"+data)
  document.querySelector(".weatherdata h2").textContent = data.name;
  var iconimage= document.getElementById("ICON")
  var div1 = document.getElementById("W1")
  var div2= document.getElementById("W2")
  var div3 = document.getElementById("W3")
  iconimage.src= " http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
  div1.innerHTML ="current temp: " + data.main.temp
  div2.innerHTML = "max temp: " + data.main.temp_max
  div3.innerHTML=  "min temp: " + data.main.temp_min
  // Save location for the map
  lon = data.coord.lon;
  lat = data.coord.lat;
}

function delay(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
  
// Handle new city searches
var formSubmitHandler = function (event) {
  event.preventDefault();
  cityName = cityNameEl.value.trim();

  console.log("formSubmitHandler, using: "+cityName);
  if (cityName) {
    localStorage.setItem(cityKey, cityName);
    location.reload();
    cityNameEl.value = '';
  } else {
    cityNameEl.value = "City name not found. Try City,State,Country"+
                      " Use 2 chars for State and Country";
  }
};

// Processing starts here
zoomLevel = defaultZoomLevel;
// var zoomLevel = localStorage.getItem(zoomKey);
// console.log("line 152 zoom:"+zoomLevel);
// if (!zoomLevel) {
//   zoomLevel = defaultZoomLevel;
// } else {
//   zoomLevel = radiusEl.value;
// }
// localStorage.setItem(zoomKey, zoomLevel);
var tmpCityName = localStorage.getItem(cityKey);
if (tmpCityName) {
  cityName = tmpCityName;
  // Bring up weather
  weatherAndLocation(null);
  console.log("start, cityName:"+cityName);
} else {
  console.log("Using default lon and lat with cityName:"+cityName);

  // Bring up weather
  weatherAndLocation(null);
  lon = defaultLon;
  lat = defaultLat;
  console.log("Using: "+lon+" "+lat);
}

cityFormEl.addEventListener('submit', formSubmitHandler);
delay(2001);

// Imported code from ArcGIS API
require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/widgets/Editor",
  "esri/views/MapView",
  "esri/popup/content/AttachmentsContent",
  "esri/popup/content/TextContent"
], (
  Map,
  FeatureLayer,
  Editor,
  MapView,
  AttachmentsContent,
  TextContent
) => {
  // Create the Map
  const map = new Map({
    basemap: "topo-vector"
  });
  let editor, features;
  /*************************************************************
   * The PopupTemplate content is the text that appears inside the
   * popup. Bracketed {fieldName} can be used to reference the value
   * of an attribute of the selected feature. HTML elements can be
   * used to provide structure and styles within the content.
   **************************************************************/
  const editThisAction = {
    title: "Edit feature",
    id: "edit-this",
    className: "esri-icon-edit"
  };

  //Trailheads feature layer (points)
  const trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
  });

  map.add(trailheadsLayer);

  //Trails feature layer (lines)
  const trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
  });

  map.add(trailsLayer, 0);

  // Parks and open spaces (polygons)
  const parksLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
  });

  map.add(parksLayer, 0);
 
  // troll trail
  const trailsLayer1 = new FeatureLayer({
    url: "https://services3.arcgis.com/opQwubFkkN0h4iC4/arcgis/rest/services/trollbridge86468/FeatureServer/0"
  });

  map.add(trailsLayer1, 0);

  // NC trails
  const trailsLayer3 = new FeatureLayer({
    url: "https://services3.arcgis.com/opQwubFkkN0h4iC4/arcgis/rest/services/3493/FeatureServer/0"
  });

  map.add(trailsLayer3, 0);

  const trailsLayer4 = new FeatureLayer({
    url: "https://services3.arcgis.com/opQwubFkkN0h4iC4/arcgis/rest/services/3296/FeatureServer/0"
  });

  map.add(trailsLayer4, 0);

  const trailsLayer5 = new FeatureLayer({
    url: "https://services3.arcgis.com/opQwubFkkN0h4iC4/arcgis/rest/services/3309/FeatureServer/0"
  });

  map.add(trailsLayer5, 0);



  // colorado trails

  const trailsLayer2 = new FeatureLayer({
    url: "https://services3.arcgis.com/opQwubFkkN0h4iC4/arcgis/rest/services/cotrails/FeatureServer/0"
  });

  map.add(trailsLayer2, 0);

  // Create a popupTemplate for the featurelayer and pass in a function to set its content and specify an action to handle editing the selected feature
  const template = {
    title: "Trail name: {trailName}",
    content: difficultyLevel,
    fieldInfos: [
      {
        fieldName: "trailName"
      },
      {
        fieldName: "difficulty"
      }
    ],
    actions: [editThisAction]
  };

  // Function that creates two popup elements for the template: attachments and text
  function difficultyLevel(feature) {
    // Set how the attachments should display within the popup
    const attachmentsElement = new AttachmentsContent({
      displayType: "list"
  });

    const textElement = new TextContent();

    const level = feature.graphic.attributes.difficulty;
    const green =
      "<b><span style='color:green'>" + level + "</span></b>.";
    const purple =
      "<b><span style='color:purple'>" + level + "</span></b>.";
    const red = "<b><span style='color:red'>" + level + "</span></b>.";

    // If the feature's "difficulty" attribute is a specific value, set it a certain color
    // "easy" = green
    // "medium" = purple
    // "hard" = red
    switch (level) {
      case "easy":
        textElement.text =
          "The {trailName} trail has a difficulty level of " + green;
        return [textElement, attachmentsElement];
        break;
      case "medium":
        textElement.text =
          "The {trailName} trail has a difficulty level of " + purple;
        return [textElement, attachmentsElement];
        break;
      case "hard":
        textElement.text =
          "The {trailName} trail has a difficulty level of " + red;
        return [textElement, attachmentsElement];
    }
  }


  const featureLayer = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/El_Paso_Recreation_AttributeEditsOnly/FeatureServer/1",
    outFields: ["*"],
    popupTemplate: template
  });
  map.add(featureLayer);
  // Create the MapView
  const view = new MapView({
    container: "map",
    map: map,
    zoom: zoomLevel,
    center: [lon, lat]
  });

  view.when(() => {
    // Create the Editor with the specified layer and a list of field configurations
    editor = new Editor({
      view: view,
      container: document.createElement("div"),
      layerInfos: [
        {
          layer: featureLayer,
          fieldConfig: [
            {
              name: "trailName",
              label: "Trail name",
              editable: false
            },
            {
              name: "condition",
              label: "Condition",
              hint: "The overall condition of for running/biking?"
            },
            {
              name: "difficulty",
              label: "Difficulty",
              hint: "How difficult was this trail to run/bike?"
            },
            {
              name: "trckType",
              label: "Track type",
              hint: "Running or biking?"
            },
            {
              name: "notes",
              label: "Additional comments"
            }
          ]
        }
      ]
    });

    // Execute each time the "Edit feature" action is clicked
    function editThis() {
      // If the EditorViewModel's activeWorkflow is null, make the popup not visible
      if (!editor.viewModel.activeWorkFlow) {
        view.popup.visible = false;
        // Call the Editor update feature edit workflow
        editor.startUpdateWorkflowAtFeatureEdit(
          view.popup.selectedFeature
        );
        view.ui.add(editor, "top-right");
        view.popup.spinnerEnabled = false;
      }

      // We need to set a timeout to ensure the editor widget is fully rendered. We
      // then grab it from the DOM stack
      setTimeout(() => {
        // Use the editor's back button as a way to cancel out of editing
        let arrComp = editor.domNode.getElementsByClassName(
          "esri-editor__back-button esri-interactive"
        );
        if (arrComp.length === 1) {
          // Add a tooltip for the back button
          arrComp[0].setAttribute(
            "title",
            "Cancel edits, return to popup"
          );
          // Add a listerner to listen for when the editor's back button is clicked
          arrComp[0].addEventListener("click", (evt) => {
            // Prevent the default behavior for the back button and instead remove the editor and reopen the popup
            evt.preventDefault();
            view.ui.remove(editor);
            view.popup.open({
              features: features
            });
          });
        }
      }, 150);
    }

    // Event handler that fires each time an action is clicked
    view.popup.on("trigger-action", (event) => {
      if (event.action.id === "edit-this") {
        editThis();
      }
    });
  });

  // Watch when the popup is visible
  view.popup.watch("visible", (event) => {
    // Check the Editor's viewModel state, if it is currently open and editing existing features, disable popups
    if (editor.viewModel.state === "editing-existing-feature") {
      view.popup.close();
    } else {
      // Grab the features of the popup
      features = view.popup.features;
    }
  });

  featureLayer.on("apply-edits", () => {
    // Once edits are applied to the layer, remove the Editor from the UI
    view.ui.remove(editor);
    // Iterate through the features
    features.forEach((feature) => {
      // Reset the template for the feature if it was edited
      feature.popupTemplate = template;
    });

    // Open the popup again and reset its content after updates were made on the feature
    if (features) {
      view.popup.open({
        features: features
      });
    }

    // Cancel the workflow so that once edits are applied, a new popup can be displayed
    editor.viewModel.cancelWorkflow();
  });
});