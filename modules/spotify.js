module.exports = {
  getUrl: function(entity, type) {
    var url = "spotify:search:" + (type != "search" ? type + "%3a" : "");
    entity = entity.toLowerCase();
    entity = entity.replace(/\(.+\)/, "");
    entity = entity.replace(/[\.,]/, "");
    entity = entity.replace(/[\&\-\_\(\)\[\]]/, " ");
    entity = entity.replace(/^\s+/, "");
    entity = entity.replace(/$\s+/, "");
    entity = entity.replace(/\s+/, " ");
    return url + encodeURIComponent(entity);
  }
};
