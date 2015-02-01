var api = rootRequire("handlers/api");

// Routes
var routes = {
  "/": "index",
  "/api/user/(*)/top-artists/": "API_userTopArtists",
  "/api/user/(*)/recent-tracks/": "API_UserRecentTracks",
  "/api/group/(*)/playlist/": "API_groupPlaylist",
  "/api/group/(*)/": "API_groupUsers"
};

// Controllers
var controllers = {
  "index": function(request, response) {
    response.render("index");
  },
  "API_userTopArtists": function(request, response) {
    api.userTopArtists(request, response);
  },
  "API_UserRecentTracks": function(request, response) {
    api.userRecentTracks(request, response);
  },
  "API_groupPlaylist": function(request, response) {
    api.groupPlaylist(request, response);
  },
  "API_groupUsers": function(request, response) {
    api.groupUsers(request, response);
  }
};

// Export the routes and controllers
module.exports = function(app) {
  for (var route in routes) {
    app.get(route, controllers[routes[route]]);
  };
};
