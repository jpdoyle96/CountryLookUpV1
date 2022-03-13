// Put in Rest API calls here

// Defers all calls by country name to Alpha 3 standard
// Returns a valid ISO_3166 token if successful, 0 on failure

// Retrieves data
async function getData(url) {
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status >= 400 && response.status < 600) {
            throw new Error("Input not valid for this endpoint");
        };
        let data = response.json();
        return data;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}

// Gets the data by a generic entry (can be name or code)
async function getByGeneric(entry) {
    // Gets both name and code responses
    let codeRes = await getByCode(entry);
    let nameRes = await getByName(entry);
    // Returns the valid one, if there is one
    if (codeRes) {
        return codeRes;
    }
    else if (nameRes) {
        return nameRes;
    }
    else {
        return false;
    }
}

// Gets by name
async function getByName(entry) {
    let url = 'https://restcountries.com/v3.1/name/';
    let urlEnd = '?fullText=true';
    url += encodeURIComponent(entry) + urlEnd;
    let res = await getData(url);
    if (res) {
        console.log(res[0].status);
        return res[0];
    }
    else {
        return false;
    }
}

// Gets by code
async function getByCode(entry) {
    let url = 'https://restcountries.com/v3.1/alpha/';
    url += entry;
    let res = await getData(url);
    if (res) {
        console.log(res[0].status);
        return res[0];
    }
    else {
        return false;
    }
}

// Helper function to track things in console
function printRecent() {
    let obj = JSON.parse(localStorage.getItem("Recent"));
    console.log(obj);
}