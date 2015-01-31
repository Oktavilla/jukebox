var util = require("./util");
var Spotify = require("./spotify");
var Promise = require("promised-io/promise");
var _ = require('underscore-node');

var API_KEY = process.env.LASTFM_API_KEY;
var SECRET = process.env.LASTFM_API_SECRET;
var API_ROOT_URL = "http://ws.audioscrobbler.com/2.0/?format=json&api_key=" + API_KEY + "&method=";

module.exports = {
  getUserTopArtists: function(userName) {
    var deferred = new Promise.Deferred();
    var url = API_ROOT_URL + "user.gettopartists&user="  + userName;
    var artists = [];

    util.getJSON(url, function(data) {
      if (data && data.topartists && data.topartists.artist) {
        _.each(data.topartists.artist, function(artist) {
          var object = {
            "name": artist.name,
            "spotifyUrl": Spotify.getUrl(artist.name, "artist")
          }
          artists.push(object);
        });
        deferred.resolve(artists);
      } else {
        deferred.reject();
      }
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  },

  getUserRecentTracks: function(userName, userRealName) {
    var deferred = new Promise.Deferred();
    var url = API_ROOT_URL + "user.getrecenttracks&user="  + userName;
    var tracks = [];

    util.getJSON(url, function(data) {
      if (data && data.recenttracks && data.recenttracks.track) {
        _.each(data.recenttracks.track, function(track) {
          var object = {
            "title": track.artist["#text"] + " - " + track.name,
            "spotifyUrl": Spotify.getUrl(track.artist["#text"] + " " + track.name, "search"),
            "nowPlaying": track["@attr"] && track["@attr"].nowplaying,
            "playTime": !track.date ? new Date().getTime() : track.date.uts
          };

          if (userRealName) {
            object.userListening = userRealName;
          }
          tracks.push(object);
        });
        deferred.resolve(tracks);
      } else {
        deferred.reject();
      }
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  },

  getGroupUsers: function(groupName) {
    var deferred = new Promise.Deferred();
    var url = API_ROOT_URL + "group.getmembers&group="  + groupName;
    var users = [];

    util.getJSON(url, function(data) {
      if (data && data.members && data.members.user) {
        _.each(data.members.user, function(user) {
          users.push({
            "userName": user.name,
            "realName": user.realname != "" ? user.realname : user.name
          });
        });
        deferred.resolve(users);
      } else {
        deferred.reject();
      }
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  },

  getGroupPlaylist: function(groupName, limit) {
    var deferred = new Promise.Deferred();
    var getUsers = this.getGroupUsers(groupName);
    var getAllPlaylists = [];
    var playlist;

    Promise.when(getUsers, _.bind(function(users) {

      getAllPlaylists = _.map(users, function(user) {
        return this.getUserRecentTracks(user.userName, user.realName);
      }, this);

      Promise.all(getAllPlaylists).then(function(lists) {
        playlist = _.flatten(lists, true);
        playlist = _.sortBy(playlist, "playTime").reverse();
        deferred.resolve(_.first(playlist, limit ? limit : 20));
      }, function() {
        deferred.reject();
      });
    }, this), function() {
      deferred.reject();
    });

    return deferred.promise;
  }
};
