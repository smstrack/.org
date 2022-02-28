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


			if (author.role == "leader" || author.role == "coleader") {
				date = new Date(item.created_at);

				var headline = content;
				if (content.length > 25) {
					var stop = content.indexOf(" ", HEADLINE_MAX);
					if (stop != -1) {
						headline = content.slice(0, stop) + "...";
					}
				}

				body = linkify(content);

				data += "<h2 class='headline'>" + headline + "</h2>";
				data += "<div class='byline'><b>" + author.name + " </b><small>" + author.description + "</small> - " + date.toLocaleString() + "</div>";
				data += "<p>" + body + "</p><hr>";
			}
		}
	}
	document.getElementById("newsList").innerHTML = data;

	function linkify(text) {
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
	}
}
