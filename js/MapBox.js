// Make Maps here

mapboxgl.accessToken = 'pk.eyJ1IjoianBkb3lsZTk2IiwiYSI6ImNrdnR4dzI4eDhnNXAyd21zYThtdmdrdDgifQ.Nu280u9DzwbO9Vh2SVLe7Q';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [16.37, 48.2], // starting position [lng, lat] (Vienna)
    zoom: 11 // starting zoom
});

// Adjusts the map pitch to the value of the slider
function pitchAdjust(val) {
    map.flyTo({
        center: map.getCenter(),
        zoom: map.getZoom(),
        pitch: val,
        bearing: map.getBearing()
    });
}

// Adjusts the map bearing to the value of the slider
function bearingAdjust(val) {
    map.flyTo({
        center: map.getCenter(),
        zoom: map.getZoom(),
        pitch: map.getPitch(),
        bearing: val
    });
}

// Sets the map style to the passed in value
function styleChange(val) {
    map.setStyle(val);
}

// Adjusts the map to the bounds of the current country
async function countryAdjust() {
    // If no data is passed in
    let currentObj = JSON.parse(localStorage.getItem("Current"));
    // Bail out if there is no current country
    if (currentObj === null) {
        console.log("Error: No current country selected");
        return;
    }
    let bounds = localStorage.getItem(currentObj.cca3);
    // If not already in storage
    if (bounds === null) {
        let geoBounds = await getMapBounds(currentObj.cca3);
        console.log(`Getting bounds status: ${geoBounds}`);
        // If local entry successfully created
        if (geoBounds) {
            geoBoundsObj = JSON.parse(localStorage.getItem(currentObj.cca3));
            console.log(geoBoundsObj);
            map.fitBounds([
                geoBoundsObj.SouthWest,
                geoBoundsObj.NorthEast
            ]);
        }
        // Uses a default zoom on the center of the current country if needed
        else {
            map.flyTo({
                center: currentObj.center,
                zoom: 9,
                pitch: map.getPitch(),
                bearing: map.getBearing()
            });
        }
    }
    // If already in storage, defer to those values
    else {
        boundsObj = JSON.parse(bounds);
        map.fitBounds([
            boundsObj.SouthWest,
            boundsObj.NorthEast
        ]);
    }
}

// Adjusts the map to the capital of the current country
function capitalAdjust() {
    let currentObj = JSON.parse(localStorage.getItem("Current"));
    map.flyTo({
        center: [currentObj.capitalInfo.latlng[1], currentObj.capitalInfo.latlng[0]],
        zoom: 11,
        pitch: map.getPitch(),
        bearing: map.getBearing()
    });
}


