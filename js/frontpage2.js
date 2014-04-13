  
		// response from Google blogger
		function handleResponse(response) 
      {
      	var data = "";
      	
      	var items = response.items;

      	// update main page
   		data += "<p class='style37'>"+items[0].title+"</p>";
   		data +="<p>"+items[0].content+"</p>";
   		document.getElementById("frontpage").innerHTML = data;
      	
   		
   		// update scroller
   		var MAX_ITEMS = 3;
   		var START_ITEM = 0;  // 0 is first item
   		
   		var title;
   		var subTitle;
   		
   		var iNum = START_ITEM; //blog item start 
   		for (var sNum = 0; sNum < MAX_ITEMS + START_ITEM; sNum++)
   		{
   			title = items[iNum].title;
   			subTitle = items[iNum].content;
   			
   			singletext[sNum]='<p align="center"><span style="font-size:125%; color:green"><strong>'+title+'</strong></span><br><span style="font-size:90%;">'+subTitle+'</span></p>';
   			iNum++;
   		}	
      }
