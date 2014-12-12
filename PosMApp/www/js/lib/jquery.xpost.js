$.extend({
  xpost: function(options) {
    var data, flush, form, iframe, key, name, url, val;
    name = "dummyxpostframe";
    url = options.url;
    data = options.data;
    flush = function() {
      $("form[target=" + name + "]").remove();
      return $("iframe[name=" + name + "]").remove();
    };
    iframe = $("<iframe></iframe>").attr("name", name).hide().appendTo("body");
    if (typeof options.callback === "function") {
      iframe.load(options.callback);
    }
    form = $("<form method=\"POST\" />").attr("action", url).attr("target", name);
    for (key in data) {
      val = data[key];
      if (key === 'urls') {
        form.append("<textarea name=\"" + key + "\">" + (val.join('\n')) + "</textarea>");
      } else {
        form.append("<input type=\"hidden\" name=\"" + key + "\" value=\"" + val + "\">");
      }
    }
    return form.hide().appendTo("body").submit();
  }
});