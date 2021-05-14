const ACCESS_TOKEN = "ZQAAAX427aneVq70QpIz2bnepEX_pgwI0mioOJck9Pdola4-IPqEQkSkNx-TTmoRw_NSFmLuU6t-Lb0s8dd5eLHTp2dWUrWSPOtnhoB38mJuZ2Jx";
const SMSTF_KEY = "AABoOkqd1PNn4cndslgrrYNt";
const JJW = "AACfd-hwMHw1gZPtvazp6GxA";
const HEADLINE_MAX = 25;

$.get("https://openapi.band.us/v2/band/posts",
	{
		access_token: ACCESS_TOKEN,
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
	document.getElementById("bandlist").innerHTML = data;

	function linkify(text) {
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
	}
}
