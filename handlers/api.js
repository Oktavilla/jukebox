var lastFm = require("../modules/lastfm");
var Promise = require("promised-io/promise");

var apiCall = function(call, response) {
  Promise.when(call, function(json) {
    response.json(json);
  }, function() {
    apiFail(response);
  });
};

var apiFail = function(response) {
  response.status(500).json({ error: "Failed because reasons." });
};

module.exports = {

  userTopArtists: function(request, response) {
    var user = request.params[0];
    if (user) {
      apiCall(lastFm.getUserTopArtists(user), response);
    } else {
      apiFail(response);
    }
  },

  userRecentTracks: function(request, response) {
    var user = request.params[0];
    if (user) {
      apiCall(lastFm.getUserRecentTracks(user), response);
    } else {
      apiFail(response);
    }
  },

  groupPlaylist: function(request, response) {
    var group = request.params[0];
    if (group) {
      apiCall(lastFm.getGroupPlaylist(group), response);
    } else {
      apiFail(response);
    }
  },

  groupUsers: function(request, response) {
    var group = request.params[0];
    if (group) {
      apiCall(lastFm.getGroupUsers(group), response);
    } else {
      apiFail(response);
    }
  }

};
