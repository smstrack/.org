import { initialize } from "/js/topten.js";

$(document).ready(function() {
  $.getJSON("/json/toptengirls.json", function callback(data) {
    initialize(data);
  });
});

