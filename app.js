// Andre's good practice is to put elements at the top then functions later on

// create the viz variable: const, let, var
let viz;

console.log("Hello from B2S!");

// grab the vizContainer element
// NB getElementByID need to be references in the .html once, and then twice in the .js
const vizContainer = document.getElementById("vizContainer");

// the url of the tableau dashboard
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

// another URL
const url2 =
  "https://public.tableau.com/views/Freeschoolmealsandeducationalattainment/Dashboard";

// the options of tour dahsboard (desktop, width, height, etc)
// need to give it a javascript object {} within you can list options
// can hide the toolbar, BUT tableau public prevents you doing that, but you can remove it from 'normal' servers
const options = {
  device: "desktop",
  hideToolbar: true,
};

// ______________________________________
// Export to pdf button

const pdfButton = document.getElementById("pdfButton");
// event listener - wait for the action/ event then do something
// go into the tableau documentation for the API and look up export to pdf (under METHODS), e.g. refreshDataAsync() which refreshes the data, and you can set a time limit, e.g. every 3 secs
pdfButton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

// _______________Export to Image button_______________________

const imageButton = document.getElementById("imageButton");
imageButton.addEventListener("click", function () {
  viz.showExportImageDialog();
});

//______________grab the show and hide buttons_____________________

const showButton = document.getElementById("showButton");
const hideButton = document.getElementById("hideButton");

// hide the show button by default - in the function ititViz below

// sWhen someone clicks on the hide button, remove the hide button and show the show button
hideButton.addEventListener("click", function () {
  // 1. hide the tableau viz
  viz.hide();
  // 2. hide the hide button and show the show button
  showButton.style.display = "inline";
  hideButton.style.display = "none";
});

// reverse
showButton.addEventListener("click", function () {
  // 1. show the tableau viz
  viz.show();
  // 2. show the hide button and hide the show button
  showButton.style.display = "none";
  hideButton.style.display = "inline";
});

// listen for a click on the switch viz
const switchViz = document.getElementById("switchButton");
switchViz.addEventListener("click", function () {
  // remove the old viz and replace with the new viz
  if (viz.getUrl() === url) {
    initViz(url2);
  } else {
    initViz(url);
  }
});

// one = creates a variable
// two == checks if the values are the same
// three === means do the same TYPE of values are the same(e.g. both date or string) and the value

// _________________FILTERING___________________
// for filtering, you need to specifiy which worksheet (or he whole dashboard) before you do that, and then apply the filter with a command - e.g. ADD or REPLACE
// We need to loop over all the buttons within a particular class - ie CLASS = "Filter"

document.querySelectorAll(".filter").forEach((button) => {
  console.log(button);
  button.addEventListener("click", (e) => singleFilter(e.target.value));
});

// when using filters with values, these need to be case sensitive, as they are typed in the viz

// then do the function to filter the dashboard to the selected region (parameter in the first brackets)
function singleFilter(value) {
  const sheettofilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");
  console.log(sheettofilter);

  sheettofilter.applyFilterAsync(
    "Region",
    value,
    tableau.FilterUpdateType.REPLACE
  );
}

// test button for sheet to filter

// _______________initialise the viz______________
// create a function that initialises the dashboard
// in the {} this is part of the function - a piece of code that can be rerun
function initViz(vizURL) {
  if (viz) {
    viz.dispose();
  }
  viz = new tableau.Viz(vizContainer, vizURL, options);
  showButton.style.display = "none";
}
initViz(url);

// need the initViz to actually load the function, and relate the load to the script in the html
