	var date = new Date();

	var scheduleYear = date.getFullYear();

// 	if (date.getMonth() > 6)
// 	{
// 		scheduleYear += 1;
// 	}

	var calAdd = 'smsraidertrack@gmail.com';

	function loadGoogleData()
	{
		var timeStart = new Date(scheduleYear, 0, 1, 8);
		var timeEnd = new Date(scheduleYear, 11, 31, 8);
		gapi.client.setApiKey('AIzaSyDPyjKbAMmWr1pexjS4iUPoq4W2EJUsFyE');
		gapi.client.load('calendar', 'v3', function()
		{
			var request = gapi.client.calendar.events.list({
				'calendarId' : calAdd,
				'orderBy' : 'startTime',
				'sortOrder' : 'a',
 				'timeMin' : ISODateString(timeStart),
 				'timeMax' : ISODateString(timeEnd),
				'maxResults' : 50,
				'singleEvents' : true
			});

			request.execute(function(resp)
			{
				displaySchedule(resp.items);
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