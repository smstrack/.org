var modes = ["COUNTDOWN","SCHEDULE","NEWS","CUSTOM", "AUTO"];

var COUNTDOWN = modes[0];
var SCHEDULE = modes[1];
var NEWS = modes[2];
var CUSTOM = modes[3];
var AUTO = modes[4];

var displayMode = AUTO;

var today = new Date();
var scheduleYear = today.getFullYear();

var COUNTDOWN_TITLE = "The 2014 Season Begins";   
var COUNTDOWN_YEAR = today.getFullYear();   
var COUNTDOWN_MONTH = 2;   // 0-jan - 11-dec
var COUNTDOWN_DAY = 3;     // 1 - 31
var COUNTDOWN_HOUR = 15;   // 0 - 23
var COUNTDOWN_MINUTES = 0; // 0 - 59

var countdownEndDate = new Date(COUNTDOWN_YEAR, COUNTDOWN_MONTH, COUNTDOWN_DAY, COUNTDOWN_HOUR, COUNTDOWN_MINUTES, 0, 0); 

var NEWS_EXPIRE_DAYS = 3;  // days
var newsExpireTime = NEWS_EXPIRE_DAYS * MSDAY;  
var NEWS_ITEMS_TO_SCROLL = 5;  

var CUSTOM_TITLE = "Welcome to SMS Raider Track";
var CUSTOM_SUB_TITLE = "";
var CUSTOM_TEXT = "";

var myService;
var feedUrl = "https://www.google.com/calendar/feeds/smsraidertrack@gmail.com/public/full";
var query;

var newsItems;
var fpNewsItem;

$(function () 
{
	$("#newsDisplay").hide();
	$("#countdownDisplay").hide();
	$("#scheduleDisplay").hide();
	
});


function setFrontPage()
{
	var newsItemDate;
	
	if (fpNewsItem != null)
	{
		var stringStrArray = fpNewsItem.published.split(/[- T:]/);
		newsItemDate = new Date(stringStrArray[0], stringStrArray[1]-1, stringStrArray[2], stringStrArray[3], stringStrArray[4], stringStrArray[5]);
	}	
	
	if (displayMode == AUTO || displayMode == null)
	{
		if (newsItemDate != null && ((today.getTime() - newsItemDate.getTime()) < 1*MSDAY))
		{	
				displayMode = NEWS;
		}
		else
		{
			if (countdownEndDate.getTime() > today.getTime())
			{	
				displayMode = COUNTDOWN;
			}
			else
			{
				if (eventsFound > 0 && newsItemDate != null && (today.getTime() - newsItemDate.getTime() > firstEventDate.getTime() - today.getTime()))
				{
					displayMode = SCHEDULE;
				}	
				else
				{
					displayMode = NEWS;
				}	
			}	
		}	
	}	
	
	
	switch(displayMode)
	{
	case COUNTDOWN:
		$("#countdownDisplayTitle").text(COUNTDOWN_TITLE);
		$('#defaultCountdown').countdown({until: countdownEndDate});
		$("#countdownDisplay").show();
		updateScroller(0);
		break;
		
	case SCHEDULE:
		$("#scheduleDisplay").show();
		updateScroller(0);
		break;
		
	case NEWS:
		$("#newsDisplay").show();
		updateScroller(1);
		break;
		
	case CUSTOM:
		updateScroller(0);
		break;
		
	default:
		;
	}
	
}


function updateScroller(startItem)
{
	// update scroller
	var title;
	var subTitle;
	
	var iNum = startItem; //blog item start 
	singletext = new Array();
	for (var sNum = 0; sNum < NEWS_ITEMS_TO_SCROLL; sNum++)
	{
		title = newsItems[iNum].title;
		subTitle = newsItems[iNum].content;
		link = newsItems[iNum].url;
		if (subTitle.trim().search('<a') == 0)
		{
			singletext[sNum]='<p align="center"><span style="font-size:125%; color:green"><strong>'+title+'</strong></span><br><span style="font-size:90%;">'+subTitle+'</span></p>';
		}
		else
		{
			singletext[sNum]='<p align="center"><span style="font-size:125%; color:green"><strong>'+title+'</strong></span><br><span style="font-size:90%;">[<a target="_blank" href="'+link+'">Read More</a>]</span></p>';
		}
		iNum++;
	}	
	
	start();
}

// response from Google blogger
function handleResponse(response) 
{
	var data = "";
	
	newsItems = response.items;
	
	var startItem = 0;  // 0 is first item
	
	if (newsItems != null)
	{
		fpNewsItem = newsItems[0];
		// update front page
		startItem = 1;
		
		var content = fpNewsItem.content;
		var url = fpNewsItem.url;
		
		// update main page with latest blog entry
		data += "<p class='style37'>"+fpNewsItem.title+"</p>";
		if (content.trim().search('<a') != 0)
		{
			content = "[<a target='_blank' href='"+url+"'>Read More</a>]";
		}

		data +="<p>"+content+"</p>";
		$("#newsDisplay").html(data);
	}
	
//	updateScroller(startItem);
	
	if (today.getMonth() > 6)
	{
	    scheduleYear += 1;
	}

	google.load("gdata", "1");
	google.setOnLoadCallback(getMyFeed);

}


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

}

// calendar setup call back
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


// data response from google calendar
function handleMyFeed(myResultsFeedRoot)
{
	displayUpcomingEvents(myResultsFeedRoot.feed.getEntries());
	setFrontPage();
}

