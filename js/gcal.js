
var date = new Date();

var scheduleYear = date.getFullYear();

if (date.getMonth() > 6)
{
    scheduleYear += 1;
}

var myService;
var feedUrl = "https://www.google.com/calendar/feeds/smsraidertrack@gmail.com/public/full";

google.load("gdata", "1");
google.setOnLoadCallback(getMyFeed);

var query;


function setupMyService()
{
    
    myService = new google.gdata.calendar.CalendarService(
	    'exampleCo-exampleApp-1');
    query = new google.gdata.calendar.CalendarEventQuery(feedUrl);

    var startMin = google.gdata.DateTime
	    .fromIso8601(scheduleYear+'-01-01T00:00:00.000-08:00');
    var startMax = google.gdata.DateTime
	    .fromIso8601(scheduleYear + '-07-31T00:00:00.000-08:00');
    query.setMinimumStartTime(startMin);
    query.setMaximumStartTime(startMax);
    query.setOrderBy('starttime');
    query.setSortOrder('a');
    query.setMaxResults(50);

}

function getMyFeed()
{
    setupMyService();

    // myService.getEventsFeed(feedUrl, handleMyFeed, handleError);
    myService.getEventsFeed(query, handleMyFeed, handleError);
}



function handleError(e)
{
    alert("There was an error!");
    alert(e.cause ? e.cause.statusText : e.message);
}

function handleMyFeed(myResultsFeedRoot)
{
    displaySchedule(myResultsFeedRoot.feed.getEntries());
}
