var hbs  = require("express-handlebars");

// Config
module.exports = function(app, express){
  var env = process.env.NODE_ENV || "development";
  
  app.set("port", process.env.PORT || 3000);
  app.engine("hbs", hbs({
    layoutsDir: "templates/layouts/",
    defaultLayout: "main",
    extname: ".hbs"
  }));
  app.set("views", "templates");
  app.set("view engine", "hbs");
  app.use(express.static("public"));
  
  if (env === "development") {
    app.use("/javascripts", express.static("./app/javascripts"));
    app.use("/stylesheets", express.static("./tmp/stylesheets"));
  }
};
