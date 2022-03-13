# CountryLookUpV1
API interfacing website that allows users to search for a specific country and get data and an interactable map as output.

[Link to Site](https://people.rit.edu/jpd2690/235/project2/)

---

## How to navigate
When you load into the site, you are met with a search box that is automatically populated with Austria, simply because I like "The Sound of Music." You can enter any country into the search bar, press the search button, and the entire site will be updated to display your choice, making the required API calls on the backend. You can navigate the map using the provided buttons, as well as the scroll wheel on your mouse or pinch to zoom on a touch screen.

---

## Inputs 

### Search Box
Allows the user to put in any country by name or code. The input is cross referenced with the CountriesREST API to get a country data packet. Inputs can be the name of the country (i.e. Australia), the extended name of the country (i.e. Commonwealth of Australia), or even the triple and double letter country codes, though some are less intuitive (i.e. AUS for Australia, AU for Australia, AS for American Samoa)

### Transport
Updates the map to do a "Fly To" call to the Mapbox API the ends by highlighting either the capital city or the entire area of the selected country, depending on your choice. Note that the total area includes territories, so Norway and France look disproportionately large because of their distant island territories.

### 3D Mode
Toggles between 3D and flat render modes for the map. In 3D mode, the mountains and buildings are rendered with depth, which can be seen by pitching the map and zooming up close to the features.

### Map Style
Switches the render style of the map. All of the options are hand made by me using the MapBox Map Maker, and they can be seen in the html file for the project. They are public so feel free to use them.

### Pitch
Adjusts the pitch of the map. This determines at what vertical angle the map is being viewed from. The default is a bird's eye view, but moving it in conjunction with 3D mode can have cool effects.

### Bearing
Adjusts the bearing of the map. This determines the rotation of the map on the screen. If you want to view the map upside down with Antartica as the North Pole, simple adjust the bearing slide.

---

## Outputs

### Country Info
The data of each country is automated and collected from the CountiresREST API. Each country will display the same data, including its soverign status, location, and population. The countires flag will also be included. 

### MapBox Map Render
The map at the bottom of the screen is rendered using MapBox services. It affords all kinds of manipulations that can be achieved with gestures and the scroll wheel of your mouse, or by interfacing with the console above the map.

---

## Future Plans

### Opaque Backend
I want to at some point hide all these featuures on a backend server so that the code can't be manipulated using the inspect tool of browsers.

### Addressing Failed API Calls
Failed API calls are not obvious on this site. If the user puts in bad input the site doesn't tell them about it, and instead fails quietly. I want to change that in the future.

---

## Resources

### MapBox API
[Link to MapBox API](https://www.mapbox.com)

### Countries REST API
[Link to CountriesREST API](https://restcountries.com)
