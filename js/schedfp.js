var MSDAY = 86400000;
var scheduleLookAheadDays = 3;   // days to look ahead from first event found date
var lookAheadTime = MSDAY * scheduleLookAheadDays;
var eventsFound = 0;
var firstEventDate;

var EVENT_SPLIT = "|";
var SUMMARY_SPLIT = "-";

function displayUpcomingEvents(entries)
{
	// var htmlStr = '<table border="1" class="style19" align="center"
	// width="850px">';
	var today = new Date();
	var htmlStr = '<div style="margin:auto"><h4>Upcoming...</h4>';
	var rowClass;

	for (var i = 0; i < entries.length; i++)
	{
		rowClass = i % 2;
		var eventEntry = entries[i];
		var eventTitle = eventEntry.getTitle().getText();
		var eventDate = (eventEntry.getTimes())[0].getStartTime().getDate();
		
		
		// event date > todays date and 
		// 		no events found yet or 
		//			event date - first event date < look ahead days   
		if (eventDate.getTime() >= today.getTime() && 
				(eventsFound == 0	||	(eventDate.getTime() - firstEventDate.getTime() < lookAheadTime)
				)
			)
		{
			eventsFound++;
			if (eventsFound == 1)
			{
				firstEventDate = eventDate;
			}	
			var eventLocation = (eventEntry.getLocations())[0];
			var eventDateStr = eventDate.toDateString();
			eventDateStr = eventDateStr.substring(0, eventDateStr.length - 4);
			var eventTime;
			var timeMod = "AM";
			var eventHours = eventDate.getHours();
			if (eventHours > 12)
			{
				timeMod = "PM";
				eventHours -= 12;
			}

			var eventMinutes = eventDate.getMinutes();
			var eventSummary = eventEntry.getContent().getText().split("|");
			var shortLocation = eventSummary[0];
			var infoUrl = "";
			var resultsUrl = "";
			var infoLinks = "";

			for (var summarySplitIndex = 1; summarySplitIndex < eventSummary.length; summarySplitIndex++)
			{
				var summary = eventSummary[summarySplitIndex];
				var anchor = summary.split(SUMMARY_SPLIT);
				var aText = anchor[0];
				var aHref;
				
				if (anchor.length == 1)
				{
					aHref = aText;
				}
				else if (anchor.length == 2)
				{
					aHref = anchor[1];
				}
				else
				{
					aHref = summary.substring(summary.indexOf(SUMMARY_SPLIT)+1);
				}

				infoLinks += "<a target='_blank' href='" + aHref + "'>" + aText + "</a>";

				if (summarySplitIndex + 1 < eventSummary.length)
				{
					infoLinks += "  "
				}
			}

			var mapLink = "";

			var locationString = $.trim(eventLocation.getValueString());

			var content = '<div class="style1m">';
			
			if (locationString != null && locationString.length != 0)
			{
				content += '<a target="_blank" href='
						+ encodeURI('https://maps.google.com/maps?hl=en&q=' + locationString) + '>'+shortLocation+'</a>';
			}	
			else
			{
				content += shortLocation;
			}
			
			content += '</div>';

			eventTime = eventHours + ":" + ((eventMinutes < 10) ? "0" + eventMinutes : eventMinutes) + timeMod;

			var titleString = '<h3 class="style1h">' + eventTitle + '</h3>';
			var dateString = '<div class="byline">' + eventDateStr + '</div>';
			var timeStr = '<h5>' + eventTime + '</h5>';

			htmlStr += titleString + dateString + timeStr + content;
			
			if (infoLinks != null && infoLinks.length > 0)
			{
				htmlStr += infoLinks;
			}	
		}
	}
	htmlStr += "</div>"
	$('#scheduleDisplay').html(htmlStr);
}
