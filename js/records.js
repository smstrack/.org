// needs events.js and records.css
/*globals tableStr:true EVENT_GROUPS*/
function formatJSON(data)
{
    var date = new Date();
    var currentYear = date.getFullYear();

    tableStr = '<table class="recordTable" width="100%">';

    data.Events.sort(function(a, b)
    {
		// sorts on event group then by event name, then by year of performance (older ranks higher)
   	var aStr = EVENT_GROUPS[a.eventGroup]['sortPrefix'] + a.event;
		var bStr = EVENT_GROUPS[b.eventGroup]['sortPrefix'] + b.event;
		var aYear = EVENT_GROUPS[a.eventGroup]['sortPrefix'] + a.year;
		var bYear = EVENT_GROUPS[b.eventGroup]['sortPrefix'] + b.year;
		
		var ret = aStr < bStr ? -1 : aStr > bStr ? 1 : aYear > bYear ? 1 : aYear < bYear ? -1 : 0;
		
		return ret;
    });

    var currentGroup = null;
    var currentEvent = null;

    // add column for school if present
    var numCols = (data.Events[0].school == undefined) ? 4 : 5;

    for ( var x = 0; x < data.Events.length; x++)
    {
        var row = data.Events[x];

        // add a header for each group
        if (currentGroup != EVENT_GROUPS[row.eventGroup]['name'])
        {
            currentGroup = EVENT_GROUPS[row.eventGroup]['name'];
            tableStr += '<tr class="header">';
            tableStr += '<td colspan="' + numCols + '">';
            tableStr += currentGroup;
            tableStr += '</td></tr>';
        }

        // bold performances for current year
        if (row.year == currentYear)
        {
            tableStr += '<tr class="currentYear">';
        } else
        {
            tableStr += '<tr>';
        }
        
        var eventName = "";
        // don't list event more than once for co-record holders
        if (currentEvent !== row.event)
        {
            currentEvent = row.event;
            eventName = currentEvent;
            
        } else
        {
            eventName = "";
        }
        tableStr += '<td>';
        tableStr += eventName;
        tableStr += '</td>';
        tableStr += '<td>';
        tableStr += row.performance;
        
        var allTimeKansas = row.allTimeKansas;
        
        if (allTimeKansas != null)
        {
        	tableStr += '[' + allTimeKansas + ']';
        }
        
        // add video link if present
        if (row.video != null && row.video.length > 0)
        {
			var target = "";
			if (row.target != null){
				target = 'target="' + row.target + '"';
			}
            tableStr += ' <a href="' + row.video + '"' + target +'><img border=0 height="16px" src="' + row.videoIcon + '"/></a>';
        }
        
        tableStr += '</td>';
        tableStr += '<td>';
        tableStr += (row.first != undefined) ? row.first + " ": "";
        tableStr += (row.last != undefined) ? row.last : (row.school != undefined)  ? row.school:"";
        tableStr += '</td>';
        
        // add school if present (used for relays records)
        if (numCols == 5)
        {
            tableStr += '<td class="recordsyear">';
            tableStr += row.school;
            tableStr += '</td>';
        }
        tableStr += '<td class="recordsyear">';
        tableStr += row.year;
        tableStr += '</td>';
        tableStr += '</tr>';
    }
    tableStr += '</table>';
    return tableStr;
}

function recordscallback(data) {
    tableStr = formatJSON(data);
    $("#recordTable").html(tableStr);
}