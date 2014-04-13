      function handleResponse(response) 
      {
      	var data = "";
      	
      	var items = response.items;
      	
      	for (var count = 0; count < items.length; count++)
      	{
      		 var stringStrArray = items[count].published.split(/[- T:]/);

      	    date = new Date(stringStrArray[0], stringStrArray[1]-1, stringStrArray[2], stringStrArray[3], stringStrArray[4], stringStrArray[5]);
      	    
      		data += "<h2 class='headline'>"+items[count].title+"</h2>";
      		data += "<div class='byline'>"+date.toLocaleString()+"</div>";
      		data +="<p>"+items[count].content+"</p><hr>";
      	}
      	
        document.getElementById("newsList").innerHTML = data;
      }
