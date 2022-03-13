// Data requests for the GeoJSON file

// Template for locally stored Geo Country Bounds
function createGenericLocal() {
    return {
        SouthWest: [0.0000, 0.0000],
        NorthEast: [0.0000, 0.0000]
    }
}

// Function to construct locally stored Geo Country Bounds
function createStandardLocal(SouthWest, NorthEast) {
    // Create instance and set values
    let base = createGenericLocal();
    base.SouthWest = SouthWest;
    base.NorthEast = NorthEast;
    // Seal and return instance
    Object.seal(base);
    return base;
}

// Gets map bounds of the current country from a massive dataset stored on the server
async function getMapBounds(ISO_3166) {
    // Checks local storage before making calls
    if (localStorage.getItem(ISO_3166) === null) {
        let data = await getGeoData();
        let entry = null;
        let res = null;
        if (!data.features) {
            return false;
        }
        for (let element of data.features) {
            if (element.properties.ISO_A3 == ISO_3166) {
                entry = element;
                break;
            }
        }
        if (entry === null) {
            console.log(`${ISO_3166} not found in core GeoData, using default bounds (zoom 9)`);
            return false;
        }
        // Calls appropriate parsing function
        if (entry.geometry.type == "Polygon") {
            res = PolyParse(entry);
        }
        else if (entry.geometry.type == "MultiPolygon") {
            res = MultiPolyParse(entry);
        }
        else {
            // Fails if the type is not polygon or multipolygon
            console.log(`Unrecognized geometry "${entry.geometry.type}" type, using default bounds (zoom 9)`);
            return false;
        }
        // Packages a local storage object of the bounds of the country so that it doesn't have to re-search every time
        let localEntry = createStandardLocal(res.SouthWest, res.NorthEast);
        localStorage.setItem(entry.properties.ISO_A3, JSON.stringify(localEntry));
        return true;
    }
    return true;
}

// Parses the bounds of a polygon (no islands or seperate objects)
function PolyParse(obj) {
    // Sets up base variables
    let minLon = obj.geometry.coordinates[0][0][0];
    let minLat = obj.geometry.coordinates[0][0][1];
    let maxLon = obj.geometry.coordinates[0][0][0];
    let maxLat = obj.geometry.coordinates[0][0][1];
    // Compares the base variables to all other points
    for (let i = 0; i < obj.geometry.coordinates[0].length; i++) {
        if (obj.geometry.coordinates[0][i][0] < minLon &&
            Math.abs(obj.geometry.coordinates[0][i][0] - minLon) < 100) {
            minLon = obj.geometry.coordinates[0][i][0];
        }
        if (obj.geometry.coordinates[0][i][0] > maxLon &&
            Math.abs(obj.geometry.coordinates[0][i][0] - minLon) < 100) {
            maxLon = obj.geometry.coordinates[0][i][0];
        }
        if (obj.geometry.coordinates[0][i][1] < minLat) {
            minLat = obj.geometry.coordinates[0][i][1];
        }
        if (obj.geometry.coordinates[0][i][1] > maxLat) {
            maxLat = obj.geometry.coordinates[0][i][1];
        }
    }
    // Returns the max and min points as an object in Long Lat order
    return {
        SouthWest: [minLon, minLat],
        NorthEast: [maxLon, maxLat]
    };
}

// Parses the bounds of a multi-polygon (islands and/or seperate objects)
function MultiPolyParse(obj) {
    // Sets up base variables
    let minLon = obj.geometry.coordinates[0][0][0][0];
    let minLat = obj.geometry.coordinates[0][0][0][1];
    let maxLon = obj.geometry.coordinates[0][0][0][0];
    let maxLat = obj.geometry.coordinates[0][0][0][1];
    // Compares the base variables to all other points
    for (let i = 0; i < obj.geometry.coordinates.length; i++) {
        for (let j = 0; j < obj.geometry.coordinates[i][0].length; j++) {
            if (obj.geometry.coordinates[i][0][j][0] < minLon &&
                Math.abs(obj.geometry.coordinates[i][0][j][0] - minLon) < 100) {
                minLon = obj.geometry.coordinates[i][0][j][0];
            }
            if (obj.geometry.coordinates[i][0][j][0] > maxLon &&
                Math.abs(obj.geometry.coordinates[i][0][j][0] - minLon) < 100) {
                maxLon = obj.geometry.coordinates[i][0][j][0];
            }
            if (obj.geometry.coordinates[i][0][j][1] < minLat) {
                minLat = obj.geometry.coordinates[i][0][j][1];
            }
            if (obj.geometry.coordinates[i][0][j][1] > maxLat) {
                maxLat = obj.geometry.coordinates[i][0][j][1];
            }
        }
    }
    // Returns the max and min points as an object in Long Lat order
    return {
        SouthWest: [minLon, minLat],
        NorthEast: [maxLon, maxLat]
    };
}
