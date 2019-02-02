// needs events.js and records.css
var colSorted = -1;
function formatJSON(data) {
   var date = new Date(),
   currentYear = date.getFullYear(),
   x;
   tableStr = '<table id="scTable" class="tablesorter recordTable">';
   tableStr += '<thead><th>Year</th><th>Last</th><th class="firstname">First</th><th>Event</th><th>Performance</th></thead><tbody>';
   for (x = 0; x < data.champs.length; x++) {
      var row = data.champs[x];
      var rowClass = ((row.gender == 'm') ? "male" : "female") + " " + 
      	((row.eventGroup == 'TRS'  || row.eventGroup == 'TRD') ? "relay" : "") + " " + ((row.season == 'i') ? "indoor" : "outdoor");
      tableStr += '<tr ';
      if (row.year == currentYear) {
         rowClass += ' currentYear';
      }
      tableStr += 'class="'+rowClass+'"';
      tableStr += '>';
      tableStr += '<td>';
      tableStr += row.year;
      tableStr += '</td>';
      tableStr += '<td>';
      tableStr += row.last;
      tableStr += '</td>';
      tableStr += '<td class="firstname">';
      tableStr += row.first;
      tableStr += '</td>';
      // add a hidden prefix to the event name (or eventCom) for tablesorter
      // this will allow proper sorting of equivalent events i.e. mile/1600
      tableStr += '<td><span style="display:none">' + EVENT_GROUPS[row.eventGroup].sortPrefix
       + ((row.eventCom == undefined) ? row.event : row.eventCom) + '-</span>';
      tableStr += row.event;
      tableStr += '</td>';
      tableStr += '<td>';
      tableStr += row.performance;
      if (row.video != null && row.video.length > 0) {
         tableStr += ' <a href="' + row.video + '" target="_blank" ><img border="0" height="16px" src="' + row.videoIcon + '"/></a>';
      }
      tableStr += '</td>';
      tableStr += '</tr>';
   }
   tableStr += '</tbody></table>';
   return tableStr;
}
function getCustomZebraWidget() {
   return {
      id : "scZebra",
      format : function (table) {
         if (table.config.debug) {
            var time = new Date();
         }
         var $tr,
         row = -1,
         odd = true;
         var h = headers = [];
         $("thead th").each(function () {
            h.push(this);
         });
         var yearSorted = false;
         var nameSorted = false;
         var eventSorted = false;
         var currentCol = -1;
         if ($(headers[0]).hasClass('headerSortDown') || $(headers[0]).hasClass('headerSortUp')) {
            currentCol = 0;
            yearSorted = true;
         }
         if ($(headers[1]).hasClass('headerSortDown') || $(headers[1]).hasClass('headerSortUp')) {
            currentCol = 1;
            nameSorted = true;
         }
         if ($(headers[3]).hasClass('headerSortDown') || $(headers[3]).hasClass('headerSortUp')) {
            currentCol = 3;
            eventSorted = true;
         }
         switch (currentCol) {
         case 0: {
               if ((nameSorted == false && eventSorted == false) || colSorted == -1) {
                  colSorted = 0;
               }
            }
         case 1: {
               if ((yearSorted == false && eventSorted == false) || colSorted == -1) {
                  colSorted = 1;
               }
            }
         case 3: {
               if ((yearSorted == false && nameSorted == false) || colSorted == -1) {
                  colSorted = 3;
               }
            }
         }
         //    alert('colSorted = ' + colSorted);
         var zYear = "";
         var zName = "";
         var zEvent = "";
         // loop through the visible rows
         $("tr:visible", table.tBodies[0]).each(
            function (i) {
            $tr = $(this);
            var year = $(" td:nth-child(1)", $tr).text();
            var name = $(" td:nth-child(2)", $tr).text() + $(" td:nth-child(3)", $tr).text();
            var event = $(" td:nth-child(4)", $tr).text();
            event = event.substring(0, event.indexOf("-"));
            // style children rows the same way the parent
            // row was styled
            if (!$tr.hasClass(table.config.cssChildRow))
               row++;
            if (colSorted == 0) // year
            {
               if (zYear != year) {
                  zYear = year;
                  odd = (odd == true) ? false : true;
               }
            }
            if (colSorted == 1) //name
            {
               if (zName != name) {
                  zName = name;
                  odd = (odd == true) ? false : true;
               }
            }
            if (colSorted == 3) //event
            {
               if (zEvent != event) {
                  zEvent = event;
                  odd = (odd == true) ? false : true;
               }
            }
            //			odd = (row % 2 == 0);
            $tr.removeClass(table.config.widgetZebra.css[odd ? 0 : 1]).addClass(
               table.config.widgetZebra.css[odd ? 1 : 0])
         });
         if (table.config.debug) {
            $.tablesorter.benchmark("Applying Zebra widget", time);
         }
      }
   }
}
function test() {
   // loop through the visible rows
   $("tr:visible", table.tBodies[0]).each(function (i) {
      // cache and collect all TH headers
      if (!this.headers) {
         var h = this.headers = [];
         $("thead th", table).each(function () {
            h.push("" + $(this).text() + "");
         });
      }
   });
   var yearSorted = false;
   var nameSorted = false;
   var eventSorted = false;
   var currentCol = -1;
   if ($(this.header[0]).hasClass('headerSortDown') || $(this.header[0]).hasClass('headerSortUp')) {
      currentCol = 0;
      yearSorted = true;
   }
   // *
   if ($(this.header[1]).hasClass('headerSortDown') || $(this.header[1]).hasClass('headerSortUp')) {
      currentCol = 1;
      nameSorted = true;
   }
   if ($(this.header[3]).hasClass('headerSortDown') || $(this.header[3]).hasClass('headerSortUp')) {
      currentCol = 3;
      eventSorted = true;
   }
   switch (currentCol) {
   case 0: {
         if (nameSorted == false && eventSorted == false) {
            colSorted = 0;
         }
      }
   case 1: {
         if (yearSorted == false && eventSorted == false) {
            colSorted = 1;
         }
      }
   case 3: {
         if (yearSorted == false && nameSorted == false) {
            colSorted = 3;
         }
      }
   }
   alert('colSorted = ' + colSorted);
}

var genderFilter = '.male, .female';
var seasonFilter = '.outdoor, .indoor';
$(document).ready(function()
{
   $.getJSON('/json/statechampions.json', function callback(data)
   {
      tableStr = formatJSON(data);
      $.tablesorter.addWidget(getCustomZebraWidget());
      $.tablesorter.addParser(
      {
         // set a unique id
         id: "events",
         is: function(s)
         {
            // return false so this parser is not auto detected
            return false;
         },
         format: function(s)
         {
            // format your data for normalization
            var sortStr = s.substring(0, s.indexOf("-"));
            return sortStr;
         },
         // set type, either numeric or text
         type: "text"
      });
      $('#champs').html(tableStr);
      $("#scTable").tablesorter(
      {
         widgets: ['scZebra'],
         sortList: [
            [0, 1]
         ],
         headers:
         {
            2:
            {
               sorter: false
            },
            3:
            {
               sorter: 'events'
            },
            4:
            {
               sorter: false
            }
         }
      });
   });
});
function applyFilters()
{
   $('.indoor, .outdoor, .female, .male').hide();
   var s1 = $(genderFilter);
   $(seasonFilter).filter(genderFilter).show();
   $("#scTable").trigger('update');
   $("#scTable").trigger("applyWidgets");
}
function changeGender(gender)
{
   if (gender == 'both')
   {
      genderFilter = '.female, .male';
   }
   if (gender == 'male')
   {
      genderFilter = '.male';
   }
   if (gender == 'female')
   {
      genderFilter = '.female';
   }
   applyFilters();
}
function changeSeason(season)
{
   if (season == 'both')
   {
      seasonFilter = '.indoor, .outdoor';
   }
   if (season == 'outdoor')
   {
      seasonFilter = '.outdoor';
   }
   if (season == 'indoor')
   {
      seasonFilter = '.indoor';
   }
   applyFilters();
}
/*
 *
 * function getEventParser(){ return{ // set a unique id id: "events", is:
 * function(s) { // return false so this parser is not auto detected return
 * false; }, format: function(s) { // format your data for normalization var
 * sortStr = s.substring(0, s.indexOf("-")); return sortStr; }, // set type,
 * either numeric or text type: "text" }; } //
*/
