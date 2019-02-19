// needs events.js and records.css
//var hideListChar = '&#x25be;';
//var hideListChar = '&#9662;';
/*eslint-env jquery */
/*globals tableStr:true EVENT_GROUPS*/
var hideListChar = '-';
//var showListChar = '&#x25b9';
//var showListChar = '&#9656;';
var showListChar = '+';
// var hideListChar = '';
// var showListChar = '';
var hideAllListsText = 'Collapse All';
var showAllListsText = 'Expand All';
var data;

const expandIcon = "chevron_right";
const collapseIcon = "expand_more";

function hideEventPerformances(event)
{
	var performanceClass = '.nonrecord' + event;
	var recordClass = '.record' + event;
	var eventRowHeaderClass = '.eventRowHeader' + event;
	var headerId = '#headerevent' + event;

	$(performanceClass).each(function()
	{
		$(this).removeClass('performanceHighlight');

		$(this).hide();
	});

	$(recordClass).each(function()
	{
		$(this).removeClass('recordHighlight');
	});

	$(eventRowHeaderClass).each(function()
	{
		$(this).removeClass('recordHeader');
	});

	$(headerId).html(expandIcon);

	$(headerId).addClass('collapsed');
}

function showEventPerformances(event)
{
	var performanceClass = '.nonrecord' + event;
	var recordClass = '.record' + event;
	var eventRowHeaderClass = '.eventRowHeader' + event;
	var headerId = '#headerevent' + event;

	$(performanceClass).each(function()
	{
		$(this).addClass('performanceHighlight');
		$(this).show();
	});

	$(recordClass).each(function()
	{
		$(this).addClass('recordHighlight');
	});

	$(eventRowHeaderClass).each(function()
	{
		$(this).addClass('recordHeader');
	});

	$(headerId).html(collapseIcon);
	$(headerId).removeClass('collapsed');
}

function togglePerformances(event)
{
	var headerId = '#headerevent' + event;
	if ($(headerId).hasClass('collapsed'))
	{
		showEventPerformances(event);
	} else
	{
		hideEventPerformances(event);
	}
}

function toggleAll()
{
	// loop through the events
	for (var x = 0; x < data.Events.length; x++)
	{
		if ($('#toggleAll').html() == hideAllListsText)
		{
			hideEventPerformances(x);
		} else
		{
			showEventPerformances(x);
		}
	}

	if ($('#toggleAll').html() == hideAllListsText)
	{
		$('#toggleAll').html(showAllListsText);
	} else
	{
		$('#toggleAll').html(hideAllListsText);
	}
}

function formatJSON(jsonData)
{
	data = jsonData;
	var date = new Date();
	var currentYear = date.getFullYear();

	tableStr = '<div class="toptentableheader">Click Event To Expand<div class="expandall">[<a href="javascript:toggleAll();"><span id="toggleAll"></span></a>]</div></div>';
	tableStr += '<table class="recordTable" width="100%">';
	data.Events.sort(function(a, b)
	{
		// sorts on event group then by event name
		var aStr = EVENT_GROUPS[a.eventGroup]['sortPrefix'] + a.event;
		var bStr = EVENT_GROUPS[b.eventGroup]['sortPrefix'] + b.event;
		var ret = aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
		return ret;
	});

	var currentGroup = null;
	var currentEvent = null;
	var numCols = 4; /* event, performance, first, last, year */

	// loop through the events
	for (var x = 0; x < data.Events.length; x++)
	{
		var row = data.Events[x];
		// add a header for each event group
		if (currentGroup != EVENT_GROUPS[row.eventGroup]['name'])
		{
			currentGroup = EVENT_GROUPS[row.eventGroup]['name'];
			tableStr += '<tbody><tr class="header">';
			tableStr += '<td colspan="' + numCols + '">';
			tableStr += currentGroup;
			tableStr += '</td></tr></tbody>';
		}
		var performanceList = row.list;

		tableStr += '<tbody>';

		// loop through performances
		for (var y = 0; y < performanceList.length; y++)
		{
			var performance = performanceList[y];
			var rowClass = ' performance ';

			if (performance.performance == undefined)
				continue;
			
			tableStr += '<tr ';

			// mark performances for current year
			if (performance.year == currentYear)
			{
				rowClass += ' currentYear ';
			}

			// mark records, always includes first performance
			if (performance.record == undefined && y != 0)
			{
				rowClass += ' nonrecord' + x + ' ';
			} else
			{
				rowClass += ' record' + x + ' ';
				if (y == 0)
				{
					rowClass += ' eventRowHeader' + x + ' ';
				}
			}
			tableStr += 'class="' + rowClass + '">';

			// add expansion anchor for first performance
			if (y == 0)
			{
				if (performanceList.length > 1)
				{
					tableStr += '<td class="eventClick" event="' + x + '">';
					tableStr += '<i id="headerevent' + x + '" class="eventHeader toptenicon material-icons" class="collapsed"></i>';
					tableStr += '<span class="eventName">' + row.event + '</span>';
				} else
				{
					tableStr += '<td><span class="eventName">' + row.event + '</span>';
				}
			} else
			{
				tableStr += '<td>';
			}
			tableStr += '</td>';
			tableStr += '<td>';
			tableStr += performance.performance;

            var allTimeKansas = performance.allTimeKansas;
			
	        if (allTimeKansas != null)
	        {
	        	tableStr += '<sup><span class="atkrank" title="All Time Kansas Ranking">[' + allTimeKansas + ']</span></sup>';
	        }

			// add video link if present
			if (performance.video != null && performance.video.length > 0)
			{
				var target = "";
				if (performance.target != null){
					target = 'target="' + performance.target + '"';
				}

				tableStr += ' <a href="' + performance.video + '"'+target+'><img border=0 height="16px" src="' + performance.videoIcon + '"/></a>';
			}
			tableStr += '</td>';
			tableStr += '<td>';
			tableStr += (performance.first != undefined) ? performance.first : "";
			tableStr += " ";
			tableStr += (performance.last != undefined) ? performance.last : "";
			tableStr += '</td>';
			tableStr += '<td class="toptenyear">';
			tableStr += (performance.year != undefined ? performance.year : "");
			tableStr += '</td>';
			tableStr += '</tr>';
		}

		// tableStr += '<tr class="nonrecord' + x + '"><td colspan="' + numCols +
		// '"></td></tr>';

		tableStr += "</tbody>";
	}
	tableStr += '</table>';
	tableStr += '<p class="style23">\
	Note: Only FAT times are listed to the 100th of a second.&nbsp; All\
	other times are considered hand timed.\
  </p>\
  <p class="style23">\
	*FAT times may appear out of order relative to hand times because of\
	the following:<br>\
	<em>100 and 200 meters:</em> FAT times are considered .24 seconds\
	faster than the equivalent hand time<br>\
	<em>300 and 400 meters:</em> FAT times are considered .14 seconds\
	faster than the equivalent hand time<br>\
	<sup>[n]</sup>All-Time Kansas ranking as of August 2015 \
	(<a href="https://drive.google.com/file/d/0B4e6HoJZumBwSm5jR0NTVWlLMzg/view?usp=sharing" target="_blank">\
	see all-time bests</a>).<br>\
	**Performance converted from yards<br>\
	&#134;IAAF javelin adopted in 2002\
  </p>'
	return tableStr;
}

function toptencallback(data) {
	tableStr = formatJSON(data);
	$("#topTenTable").html(tableStr);

	$(".eventClick").click(function () {
		togglePerformances($(this).attr("event"));
	});

	$("#toggleAll").html(hideAllListsText);
	$(".eventHeader").html(hideListChar);
	toggleAll();
}