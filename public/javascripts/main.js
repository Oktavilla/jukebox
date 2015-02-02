var Jukebox = (function($) {
  "use strict";

  var url = "/api/group/oktavilla/playlist/";

  var fetch = function() {
    $.getJSON(url, function(data) {
      $("body").html("");
      var $list = $("<ul></ul>");
      for (var row in data) {
        var $li = $("<li></li>");
        var $a = $("<a>" +  data[row].title + "</a>");
        var $span = $("<span>" + data[row].userListening + "</span> ");
        var $time = $("<time>" + (data[row].nowPlaying ? " Now playing" : moment(data[row].playTime, "X").fromNow()) + "</time>")

        $a.attr("href", data[row].spotifyUrl);
        $span.addClass("person");

        $li.append($a);
        $li.append($span.append($time));
        $list.append($li);
      }
      $("body").append($list);
    });
  };

  fetch();
  setInterval(fetch, 10*1000);

}(jQuery));
