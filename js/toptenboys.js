import { initialize } from "/js/topten.js";

$(document).ready(function() {
  $.getJSON("/json/toptenboys.json", function callback(data) {
    initialize(data);
  });
});

