

$.get("https://openapi.band.us/v2/band/posts",
	{
		access_token: "ZQAAAX427aneVq70QpIz2bnepEX_pgwI0mioOJck9Pdola4-IPqEQkSkNx-TTmoRw_NSFmLuU6t-Lb0s8dd5eLHTp2dWUrWSPOtnhoB38mJuZ2Jx",
		band_key: "83079051",
		locale: "en_US"
	}, bandResponse);

function bandResponse(response) {
	var data = "";

	var resultCode = response.result_code;
	if (resultCode == 200) {
		var items = response.result_data.items;

		for (var count = 0; count < items.length; count++) {
			var stringStrArray = items[count].published.split(/[- T:]/);

			date = new Date(stringStrArray[0], stringStrArray[1] - 1, stringStrArray[2], stringStrArray[3], stringStrArray[4], stringStrArray[5]);

			data += "<h2 class='headline'>" + items[count].title + "</h2>";
			data += "<div class='byline'>" + date.toLocaleString() + "</div>";
			data += "<p>" + items[count].content + "</p><hr>";
		}
	}
	document.getElementById("bandlist").innerHTML = data;
}
