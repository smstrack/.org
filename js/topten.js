// needs events.js and records.css
function hideEventPerformances(event)
	$(performanceClass).each(function()
		$(this).hide();
	$(eventRowHeaderClass).each(function()
	$(headerId).html(showListChar);
	$(headerId).addClass('collapsed');
function showEventPerformances(event)
	$(performanceClass).each(function()
	$(eventRowHeaderClass).each(function()
	$(headerId).html(hideListChar);
function togglePerformances(event)
function toggleAll()
   if ($('#toggleAll').html() == hideAllListsText)
function formatJSON(jsonData)
    tableStr = '<table class="recordTable">';
    // loop through the events
        tableStr += '<tbody>';
        // loop through performances 
         	tableStr += '<tr ';
            // mark performances for current year
            // mark records, always includes first performance
            // add expansion anchor for first performance 
            // add video link if present
  //       tableStr += '<tr class="nonrecord' + x + '"><td colspan="' + numCols + '"></td></tr>';
         tableStr += "</tbody>";