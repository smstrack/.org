
$.getJSON('https://docs.google.com/uc?id=0B_TDLMsY9LIUMV9JRVFNV3lMR1E&export=download', function(data) 
{
    var items = [];
   
    $.each(data, function(key, val) {
      items.push('<li id="' + key + '">' + val + '</li>');
    });
   
    $('<ul/>', {
      'class': 'my-new-list',
      html: items.join('')
    }).appendTo('body');
  });

