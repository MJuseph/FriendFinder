// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4444;

// For serving of static CSS
app.use(express.static("app/public"));
// app.use(express.static("imgs"));
// app.use(express.static(__dirname + '/public'));
// app.use("/public", express.static(__dirname + '/public'));
// app.use(express.static(__dirname + "/app/public/assets/imgs"));
// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
