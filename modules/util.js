var http = require("follow-redirects").http;
var https = require("follow-redirects").https;
var url = require("url");

var get = function(endpoint, headers, success, fail) {
  var urlInfo = url.parse(endpoint);

  var options = {
    hostname: urlInfo.hostname,
    path: urlInfo.path,
    method: "GET",
    port: urlInfo.port,
    headers: headers || {}
  };

  var prot = urlInfo.protocol === 'https:' ? https : http;
  var req = prot.request(options, function(res) {
    var output = "";
    res.setEncoding("utf8");

    res.on("data", function (chunk) {
      output += chunk;
    });

    res.on("end", function() {
      success.call(null, res.statusCode, output);
    });
  });

  req.on("error", function(err) {
    fail.call(null, err.message);
  });

  req.end();
};

module.exports = {
  getJSON: function(endpoint, success, fail, headers) {
    headers = headers || {};
    headers["Content-Type"] = "application/json";
    get(endpoint, headers, function(statusCode, data) {
      if (statusCode === 200) {
        success.call(null, JSON.parse(data));
      } else {
        fail.call(null, statusCode);
      }
    }, function(errorMessage) {
      fail.call(null, errorMessage);
    });
  }
};
