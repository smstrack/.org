  
		// response from Google blogger
		function handleResponse(response) 
      {
      	var data = "";
      	
      	var items = response.items;
      	    
   		data += "<p class='style37'>"+items[0].title+"</p>";
   		data +="<p>"+items[0].content+"</p>";
      	
        document.getElementById("frontpage").innerHTML = data;
      }
