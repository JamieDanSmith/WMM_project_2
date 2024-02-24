// Mapbox access token.
mapboxgl.accessToken =
  "pk.eyJ1IjoiamFtaWUtZC1zbWl0aCIsImEiOiJjbHI2ZHM1a3gxdWR4MnBwOGRlb2N3aXgxIn0.mAsYU3YISvUNVypTbMs4Jg";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamFtaWUtZC1zbWl0aCIsImEiOiJjbHI2ZHM1a3gxdWR4MnBwOGRlb2N3aXgxIn0.mAsYU3YISvUNVypTbMs4Jg";
const map = new mapboxgl.Map({
  container: "map", // container element id
  style: "mapbox://styles/jamie-d-smith/clsdgk7q701ob01pe5ghcbldq",
  center: [132.449997, 34.383331],
  pitch: 30,
  zoom: 5
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(
  new mapboxgl.FullscreenControl({ container: document.querySelector("body") })
);
const data_url =
  "https://api.mapbox.com/datasets/v1/jamie-d-smith/clsjkyvrf0uao1np7gkhblotl/features?access_token=pk.eyJ1IjoiamFtaWUtZC1zbWl0aCIsImEiOiJjbHI2ZHM1a3gxdWR4MnBwOGRlb2N3aXgxIn0.mAsYU3YISvUNVypTbMs4Jg";

// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
  closeButton: false
});

// Change the cursor to a pointer when the mouse is over the detonations layer.
map.on("mouseenter", "detonations", () => {
  map.getCanvas().style.cursor = "pointer";
});

// Change it back to a pointer when it leaves.
map.on("mouseleave", "detonations", () => {
  map.getCanvas().style.cursor = "";
});

// Set the default atmosphere style.
map.on("style.load", () => {
  map.setFog({
    range: [-1, 10],
    "horizon-blend": 0.2,
    color: "#969696",
    //'high-color': '#add8e6',
    //'space-color': '#d8f2ff',
    "star-intensity": 0.8
  });
});

map.on("load", () => {
  map.addLayer({
    id: "detonations",
    type: "circle",
    source: {
      type: "geojson",
      data: data_url
    },
    paint: {
      "circle-radius": {
        base: 8,
        stops: [
          [5, 12],
          [7, 30]
        ]
      },
      "circle-stroke-width": 2,
      // Color circles by country, using a "match" expression.
      "circle-color": [
        "match",
        ["get", "Country"],
        "USA",
        "#b10026",
        "USSR",
        "#fc4e2a",
        "France",
        "#fd8d3c",
        "UK",
        "#feb24c",
        "PRC",
        "#fed976",
        "DPRK",
        "#ffeda0",
        "Pak",
        "#ffffcc",
        "India",
        "#ffffff",
        /* other */ "#ccc"
      ],
      "circle-stroke-color": "black",
      "circle-opacity": 0.75
    }
  });

  // Configure pop-up with hyperlink to relevant wikipedia/online article (URL in original data-table).
  map.on("click", "detonations", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["detonations"]
    });
    if (!features.length) {
      return;
    }
    var feature = features[0];
    var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML(
        "<h3><a href=" +
          feature.properties.URL +
          ">" +
          feature.properties.Name +
          "</a></h3><p>" +
          feature.properties.Size +
          "</p>" +
          "</h3><p>" +
          feature.properties.Delivery +
          "</p>" +
          "</h3><p>" +
          feature.properties.Purpose +
          "</p>"
      )
      .addTo(map);
  });

  // Configure slider feature to filter nuclear tests by year of detonation.
  filterType = ["!=", ["get", "Name"], "placeholder"];
  document.getElementById("slider").addEventListener("input", (event) => {
    // Get the year value from the slider
    const year = parseInt(event.target.value);
    // Update text in the UI
    document.getElementById("active-year").innerText = year;
    // Create a filter
    filterYear = ["<=", ["get", "Date (year)"], year];
    // Set the map filter
    map.setFilter("detonations", ["all", filterYear, filterType]);
  });

  // Configure radio buttons to switch between  countries.
  document.getElementById("filters").addEventListener("change", (event) => {
    const type = event.target.value;
    console.log(type);
    // Update the map filter to zoom to relevant area of globe.
    if (type == "all") {
      filterType = ["!=", ["get", "Country"], "placeholder"];
    } else if (type == "USA") {
      filterType = ["==", ["get", "Country"], "USA"];
      end = {
        center: [-130, 30],
        zoom: 2,
        bearing: 0,
        pitch: 0
      };
      let isAtStart = true;
      target = isAtStart ? end : start;
      isAtStart = !isAtStart;
      map.flyTo({
        ...target, // Fly to the selected target.
        duration: 6000, // Animate over 6 seconds.
        essential: true
      });
    } else if (type == "USSR") {
      filterType = ["==", ["get", "Country"], "USSR"];
      end = {
        center: [73, 54],
        zoom: 2,
        bearing: 0,
        pitch: 0
      };
      let isAtStart = true;
      target = isAtStart ? end : start;
      isAtStart = !isAtStart;
      map.flyTo({
        ...target, // Fly to the selected target.
        duration: 6000, // Animate over 6 seconds.
        essential: true
      });
    } else if (type == "France") {
      filterType = ["==", ["get", "Country"], "France"];
      end = {
        center: [15, 12],
        zoom: 2,
        bearing: 0,
        pitch: 0
      };
      let isAtStart = true;
      target = isAtStart ? end : start;
      isAtStart = !isAtStart;
      map.flyTo({
        ...target, // Fly to the selected target.
        duration: 6000, // Animate over 6 seconds.
        essential: true
      });
    } else if (type == "UK") {
      filterType = ["==", ["get", "Country"], "UK"];
      end = {
        center: [160, -10],
        zoom: 2,
        bearing: 0,
        pitch: 0
      };
      let isAtStart = true;
      target = isAtStart ? end : start;
      isAtStart = !isAtStart;
      map.flyTo({
        ...target, // Fly to the selected target.
        duration: 6000, // Animate over 6 seconds.
        essential: true
      });
    } else if (type == "PRC") {
      filterType = ["==", ["get", "Country"], "PRC"];
      end = {
        center: [91, 38],
        zoom: 4,
        bearing: 0,
        pitch: 0
      };
      let isAtStart = true;
      target = isAtStart ? end : start;
      isAtStart = !isAtStart;
      map.flyTo({
        ...target, // Fly to the selected target.
        duration: 6000, // Animate over 6 seconds.
        essential: true
      });
    } else if (type == "DPRK") {
      filterType = ["==", ["get", "Country"], "DPRK"];
      end = {
        center: [126, 40],
        zoom: 5,
        bearing: 0,
        pitch: 0
      };
      let isAtStart = true;
      target = isAtStart ? end : start;
      isAtStart = !isAtStart;
      map.flyTo({
        ...target, // Fly to the selected target.
        duration: 6000, // Animate over 6 seconds.
        essential: true
      });
    } else if (type == "Pak") {
      filterType = ["==", ["get", "Country"], "Pak"];
      end = {
        center: [63, 27],
        zoom: 5,
        bearing: 0,
        pitch: 0
      };
      let isAtStart = true;
      target = isAtStart ? end : start;
      isAtStart = !isAtStart;
      map.flyTo({
        ...target, // Fly to the selected target.
        duration: 6000, // Animate over 6 seconds.
        essential: true
      });
    } else if (type == "India") {
      filterType = ["==", ["get", "Country"], "India"];
      end = {
        center: [72, 27],
        zoom: 5,
        bearing: 0,
        pitch: 0
      };
      let isAtStart = true;
      target = isAtStart ? end : start;
      isAtStart = !isAtStart;
      map.flyTo({
        ...target, // Fly to the selected target.
        duration: 6000, // Animate over 6 seconds.
        essential: true
      });
    } else {
      console.log("error");
    }
    map.setFilter("detonations", ["all", filterYear, filterType]);
  });
});
