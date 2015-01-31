// Config
module.exports = function(app, express){
  var env = process.env.NODE_ENV || "development";
  
  app.set("port", process.env.PORT || 3000);
  app.set("views", "server/templates");
  app.set("view engine", "handlebars");
  app.use(express.static("public"));
  
  if (env === "development") {
    app.use("/javascripts", express.static("./app/javascripts"));
    app.use("/stylesheets", express.static("./tmp/stylesheets"));
  }
};
