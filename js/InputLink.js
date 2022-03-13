// Post body JavaScript file for linking the elements and inputs together

// Link all the inputs and their functions

document.querySelector("#capital").addEventListener('click', capitalAdjust);
document.querySelector("#country").addEventListener('click', countryAdjust);
document.querySelector("#search").addEventListener('click', updateCurrent);
document.querySelector("#pitch").onchange = function () {
    pitchAdjust(this.value);
}
document.querySelector("#bearing").onchange = function () {
    bearingAdjust(this.value);
}
document.querySelector("#style").onchange = function () {
    if (document.querySelector("#switchBox").checked) {
        styleChange(this.options[this.selectedIndex].getAttribute('data-value'));
    }
    else {
        styleChange(this.value);
    }
}
document.querySelector("#switchBox").onchange = function () {
    if (this.checked) {
        styleChange(document.querySelector("#style").options[document.querySelector("#style").selectedIndex].getAttribute('data-value'));
    }
    else {
        styleChange(document.querySelector("#style").value);
    }
}

// Initializes the site to the current country
async function initializeToCurrent() {
    let currentObj = JSON.parse(localStorage.getItem("Current"));
    let header = document.querySelector("#CurrentCountry h1");
    let searchField = document.querySelector("#searchterm");
    header.innerHTML = currentObj.name.official;
    header.setAttribute('data-value', currentObj.name.common);
    searchField.value = currentObj.name.common;
    // Construct info paragraph
    let info = document.querySelector("#Info > p");
    let input = `${currentObj.name.common} is a`;
    input += (currentObj.independent == true) ? "n independent, " : " non-independent, ";
    input += currentObj.status;
    input += ` state in the ${currentObj.subregion} region of ${currentObj.region}.`;
    input += (currentObj.landlocked == true) ? " It is landlocked and " : " It is not landlocked and ";
    input += `has a population of ${currentObj.population}`;
    info.innerHTML = input;
    
    // Make flag
    let flag = document.querySelector("#flagIMG");
    flag.src = currentObj.flags.svg;
    flag.alt = `Flag of ${currentObj.name.common}`;
    await countryAdjust();
}

// Updates the site to the current country
async function updateCurrent() {
    let term = document.querySelector("#searchterm").value;
    let value = await getByGeneric(term);
    // If input is invalid
    if (!value) {
        console.log("Invalid input. Not a country or readable country code");
        return;
    }
    else {
        localStorage.setItem("Current", JSON.stringify(value));
    }
    await initializeToCurrent();
}

// Helper function to clear storage in the console
async function clearStorage() {
    localStorage.clear();
}
