require("./root-require.js");
var express = require("express");
var app = module.exports = express();
var http = require("http");

// Setup
var setupEnvironment = require("./config/environment");
setupEnvironment(app, express);

var setupRoutes = require("./config/routes");
setupRoutes(app);

http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
