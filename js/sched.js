/*eslint-env jquery */
var EVENT_SPLIT = "|";
var SUMMARY_SPLIT = "-";

function dateFromISO8601(isostr)
{
	var parts = isostr.match(/\d+/g);
	return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
}

function displaySchedule(entries)
{
	var htmlStr = '<table border="1" class="style19" align="center" width="850px">';
	var rowClass;

	for (var i = 0; i < entries.length; i++)
	{
		rowClass = i % 2;
		var eventEntry = entries[i];
		// var eventTitle = eventEntry.getTitle().getText();
		var eventTitle = eventEntry.summary;
		// var eventDate = (eventEntry.getTimes())[0].getStartTime().getDate();
		var eventDate = eventEntry.start.dateTime;
		if (eventDate === null){
			eventDate = eventEntry.start.date;
		}
		eventDate = dateFromISO8601(eventDate);
		// var eventLocation = (eventEntry.getLocations())[0];
		var eventLocation = eventEntry.location;
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
		// var eventSummary =
		// eventEntry.getContent().getText().split(EVENT_SPLIT);
		
		var eventDesc = eventEntry.description;
		if (eventDesc === null)
		{
			eventDesc = "SMS";
		}
		
		var eventSummary = eventDesc.split(EVENT_SPLIT);
		var shortLocation = eventSummary[0];
		var infoLinks = "";

		for (var summarySplitIndex = 1; summarySplitIndex < eventSummary.length; summarySplitIndex++)
		{
			var summary = eventSummary[summarySplitIndex];
			var anchor = summary.split(SUMMARY_SPLIT);
			var aText = anchor[0];
			var aHref;

			if (anchor.length === 1)
			{
				aHref = aText;
			} else if (anchor.length === 2)
			{
				aHref = anchor[1];
			} else
			{
				aHref = summary.substring(summary.indexOf(SUMMARY_SPLIT) + 1);
			}

			infoLinks += "<a target='_blank' href='" + aHref + "'>" + aText + "</a>";

			if (summarySplitIndex + 1 < eventSummary.length)
			{
				infoLinks += "  ";
			}
		}

		var mapLink = "";

		var locationString = $.trim(eventLocation);

		if (locationString !== null && locationString.length !== 0)
		{
			mapLink = "<a target='_blank' href=" + encodeURI("https://maps.google.com/maps?hl=en&q=" + locationString)
					+ ">"+shortLocation+"</a>";
		} 
		else 
		{
			mapLink = shortLocation;
		}

		eventTime = eventHours + ":" + (eventMinutes < 10 ? "0" + eventMinutes : eventMinutes) + timeMod;
		htmlStr += "<tr class='row" + rowClass + "'><td>" + eventDateStr + "</td><td>" + eventTitle + "</td><td>"
				+ eventTime + "</td><td>" + mapLink + "</td><td>" + infoLinks + "</td>";
	}
	htmlStr += "</table>";
	$('#sched').html(htmlStr);

}
