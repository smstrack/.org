$.get("https://openapi.band.us/v2/band/posts",
	{
		access_token: BAND_ACCESS_TOKEN,
		band_key: SMSTF_KEY,
		locale: "en_US"
	}, bandResponse);

function bandResponse(response) {
	var data = "";

	var resultCode = response.result_code;
	if (resultCode == 1) {
		var items = response.result_data.items;

		for (var count = 0; count < items.length; count++) {

			var item = items[count];
			var author = item.author;
			var content = item.content;


			if (checkContent(content, author.role)) {
				date = new Date(item.created_at);

				var headline = getHeadline(content);
				content = content.slice(headline.length + 1);

				body = linkify(content);

				data += "<h2 class='headline'>" + headline + "</h2>";
				data += "<div class='byline'><b>" + author.name + " </b><small>" + author.description + "</small> - " + date.toLocaleString() + "</div>";
				data += "<p>" + body + "</p>"+ BAND_LINK +"<hr>";
			}
		}
	}
	document.getElementById("newsList").innerHTML = data;
}
