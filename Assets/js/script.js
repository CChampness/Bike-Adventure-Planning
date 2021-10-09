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

var lon = -106.5;  // -106.48871516310629;
var lat = 31.7980770813721;

var zoomLevel = 10;
var AppID = "acafba783f22a6fd98819aec5579ae53"
var cityApi = "https://api.openweathermap.org/data/2.5/weather?q=";
var storageKey = "bikeMap";
var cityFormEl = document.querySelector('#city-form');
var cityName;
var cityNameEl = document.querySelector('#cityname');

function sleep(milliseconds) {
  console.log("sleeping "+milliseconds);
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
  
function updateStorage(res) {
  lat = res.coord.lat;
  lon = res.coord.lon;
  console.log("updateStorage:lon,lat:"+lon+","+lat);

  localStorage.setItem(storageKey, res.name);
}

// Use 3rd-party API to look up latitude and logitude
var getLatLon = function() {
  console.log("getLatLon of: "+cityName);
  sleep(2001);
  var cityApiQuery = cityApi+cityName+"&appid="+AppID;
  fetch(cityApiQuery)
  .then(function (response) {
    if (!response.ok) {
        console.log("getLatLon response not ok");
      throw response.json();
    }
  
    return response.json();
  })
  .then(function (res) {
      console.log("res:"+res);
    updateStorage(res);
  })
  .catch(function (error) {
    forecast5dayEl.textContent = "";
    cityNameEl.value = "City name not found. Try City,State,Country"+
                       " Use 2 chars for State and Country";
    console.error(error);
  });
}
  
// Handle new city searches
var formSubmitHandler = function (event) {
  event.preventDefault();
  cityName = cityNameEl.value.trim();
  if (cityName) {
    getLatLon(cityName);
    sleep(2002);
    location.reload();
    cityNameEl.value = '';
  } else {
    cityNameEl.value = "City name not found. Try City,State,Country"+
                      " Use 2 chars for State and Country";
  }
};

// Processing starts here
cityName = localStorage.getItem(storageKey);
console.log("start, cityName:"+cityName);
if (cityName) {
  getLatLon();
} else {
  console.log("Using default lon and lat");
}
  
cityFormEl.addEventListener('submit', formSubmitHandler);

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
    zoom: 15,
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

  view.ui.add("info", {
    position: "top-left",
    index: 1
  });
});