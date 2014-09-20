$('.post a').click(function(e) {

	$('#container').append('<div id="overlay"></div>')
	event.preventDefault();
	var href = $(this).attr('href');
})