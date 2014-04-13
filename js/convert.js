$(document).ready(function()
{
	var jStr = '{ "Events" : [';
	var r = 0;
	$('#xtable tr').each(function()
	{
		if (r > 0)
		{
			jStr += ',';
		}
		jStr += '{';

		var d = 0;
		$('td', this).each(function()
		{
			if (d > 0)
			{
				jStr += ',';
			}

			switch (d)
			{
			case 0:
				jStr += '"performance" : "' + $(this).html() + '"';
				break;

			case 1:
				var name = $(this).html();
				var names = name.split(" ");
				jStr += '"first" : "' + names[0] + '"';
				jStr += '"last" : "' + names[1] + '"';
				break;

			case 2:
				jStr += '"year" : "' + $(this).html() + '"';
				break;

			}

			d++;
		});
		jStr += '}';
		r++;
	});
	jStr += ']}';
	console.log(jStr);
	alert(jStr);
});
