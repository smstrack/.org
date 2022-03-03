/*globals MSDAY eventsFound firstEventDate singletext:true link:true gapi displayUpcomingEvents returnStr:true*/
/*eslint-env jquery, qunit, browser*/
var modes = ["COUNTDOWN","SCHEDULE","NEWS","CUSTOM", "AUTO"];

var COUNTDOWN = modes[0];
var SCHEDULE = modes[1];
var NEWS = modes[2];
var CUSTOM = modes[3];
var AUTO = modes[4];

var displayMode = AUTO;

var today = new Date();
var scheduleYear = today.getFullYear();

var COUNTDOWN_TITLE = "The " + scheduleYear + " Season Begins";   
var COUNTDOWN_YEAR = scheduleYear;   
var COUNTDOWN_MONTH = 1;   // 0-jan - 11-dec
var COUNTDOWN_DAY = 28;     // 1 - 31
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

var news;
var fpNewsItem;
var startItem;

$.get("https://openapi.band.us/v2/band/posts",
	{
		access_token: BAND_ACCESS_TOKEN,
		band_key: SMSTF_KEY,
		locale: "en_US"
	}, handleResponse);

$(function () 
{
	$("#newsDisplay").hide();
	$("#countdownDisplay").hide();
	$("#scheduleDisplay").hide();
	
});


function setFrontPage()
{
	var newsItemDate;
	
	if (fpNewsItem)
	{
		newsItemDate = new Date(fpNewsItem.created_at);
	}	
	
	if (displayMode === AUTO || displayMode === null)
	{
		if (newsItemDate && ((today.getTime() - newsItemDate.getTime()) < Number(MSDAY)))
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
				if (eventsFound > 0 && newsItemDate !== undefined && (today.getTime() - newsItemDate.getTime() > firstEventDate.getTime() - today.getTime()))
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
	}
}


function updateScroller(startItem)
{
	// update scroller
	var title;
	var subTitle;

	if (news != undefined) {
		var iNum = startItem; //news item start 
		singletext = new Array();
		for (var sNum = 0; sNum < NEWS_ITEMS_TO_SCROLL; sNum++) {
			var item = news[iNum];
			var author = item.author;
			var content = item.content;

			if (content != EVENT_UPLOAD && (author.role == "leader" || author.role == "coleader")) {
				content = getHeadline(content);
				singletext[sNum] = '<p align="center"><span style="font-size:85%;color:green;text-decoration:none;"><strong>' + content + '</strong><br><a style="font-size:85%;color:green;text-decoration:none;" href="news.htm">[Read More...]</a></span></p>';
			}

			iNum++;
		}
	}
	
	start();
}

// response from Band
function handleResponse(response) {
	var data = "";

	var resultCode = response.result_code;

	if (resultCode == 1) {
		news = response.result_data.items;

		
		for (var count = 0; count < news.length; count++) {
			
			var item = news[count];
			var author = item.author;
			var content = item.content;
			
			
			if (content != EVENT_UPLOAD && (author.role == "leader" || author.role == "coleader") ) {
				date = new Date(item.created_at);
				
				fpNewsItem = item;
				
				var headline = getHeadline(content);
				
				body = linkify(content);
				
				data += "<h2 class='headline'>" + headline + "</h2>";
				data += "<div class='byline'><small>" + author.name + "</small> - " + date.toLocaleString() + "</div>";
				data += "<p class='bandbody'>" + body + "</p>";

				// update front page
				startItem = count + 1;
				break;
			}
		}

		$("#newsDisplay").html(data);

		updateScroller(startItem);

		if (today.getMonth() > 6) {
			scheduleYear += 1;
		}

	}
}

function loadGoogleData()
{
	var date = new Date();

	var gdataScheduleYear = date.getFullYear();

	var timeStart = new Date(gdataScheduleYear, 0, 1, 8);
	var timeEnd = new Date(gdataScheduleYear, 11, 31, 8);
	gapi.client.setApiKey('AIzaSyDPyjKbAMmWr1pexjS4iUPoq4W2EJUsFyE');
	gapi.client.load('calendar', 'v3', function()
	{
		var request = gapi.client.calendar.events.list({
			'calendarId' : 'smsraidertrack@gmail.com',
			'orderBy' : 'startTime',
			'sortOrder' : 'a',
				'timeMin' : ISODateString(timeStart),
				'timeMax' : ISODateString(timeEnd),
			'maxResults' : 50,
			'singleEvents' : true
		});

		request.execute(function(resp)
		{
			displayUpcomingEvents(resp.items);
			setFrontPage();
		});

	});
}

function ISODateString(d)
{
	function pad(n)
	{
		return n < 10 ? '0' + n : n
	}
	
	returnStr = d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T'
   + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z'; 
	
	return returnStr;
}

function handleError(e)
{
    alert("There was an error!");
    alert(e.cause ? e.cause.statusText : e.message);
}

