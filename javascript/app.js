


var pixGallery = {
	

	//assign the constant base part of the url to variable
	base: 'https://api.flickr.com/services/rest/?&method=',
	
	//assign api key to a variable
	apiKey:'9da9cb35fd91c0b5d95b991635bb820b',
	
	//assign userid to a variable
	userId:  '127919138@N08',

	userName:null,


	init:function() {


		$("#target").submit( function (e) {
			e.preventDefault();
			pixGallery.userName=$( '#userName').val();
			pixGallery.searchPhoto();
		});

		//Get recently uploaded public photos when DOM loads
		pixGallery.getRecent();


		//On click, Get most Interesting photos runs
		$('#interesting').click(pixGallery.getInterestingness);
	},


	//Method to get the most recent photos in flickr
	getRecent: function() {
		
		//the initial json request to flickr to get the latest recent photos
		$.getJSON(pixGallery.base + 'flickr.photos.getRecent&api_key=' + pixGallery.apiKey + '&user_id=' + pixGallery.userId + '&per_page=15&extras=geo,url_o&format=json&jsoncallback=?',
			function(data) {
				// console.log(data);
				pixGallery.getLink(data);
			}); 
	
	},


	//Method to search photos in flickr
	searchPhoto: function() {
		$.getJSON(pixGallery.base + 'flickr.photos.search&api_key=' + pixGallery.apiKey + '&tags=' + pixGallery.userName + '&safe_search=1&per_page=15&extras=geo,url_o&format=json&jsoncallback=?', 
			function(response) {
			console.log(response)
				pixGallery.getLink(response);
			}); 
	},







	//Method to get the most Interesting photos in flickr
	getInterestingness:function() {
		
		//the initial json request to flickr to get the most interesting photos
		$.getJSON(pixGallery.base + 'flickr.interestingness.getList&api_key=' + pixGallery.apiKey + '&user_id=' + pixGallery.userId + '&per_page=15&extras=geo,url_o&format=json&jsoncallback=?', 
			function(data) {
				// console.log(data);
				pixGallery.getLink(data);
			});

		},


// has_geo=1&extras=geo

	
	//Function to capture the url of each photo and load it into the div with id container in the html
	getLink:function(data) {
		 // console.log(data);
		 var imgCont="";
		var pLocation;
		// console.log(data);

		$("#container").empty();
		//iterate through each photo
		$.each(data.photos.photo, function(i, item){
 				
			//Assign current photo to a variable 
 			var obj=this;
 			
 			// //build the url of the photo in order to link to it
			var photoURL = 'https://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';

			//turn the photo id and title into a variable so we can use it always
			// var fullName = 
			var photoID = item.id;
			var photoTitle = item.title;
			var plat = item.latitude;
			var plon = item.longitude;
			// console.log(item.longitude);
			// console.log(item.latitude);


			// $("#container").empty();

		
	    					 
	  //       			if(plat !== 0) {

	      				 pLocation = item.url_o;
   //      				}
        				// else {
        				// 	pLocation = '#';
        				// }
        							

        							// console.log(pLocation);
            		 createImgCont(pLocation, photoURL, photoTitle);
        							


			 // console.log(pLocation);

			//Create a div to house the image and the title of the image. Assign this div to a variable
			

 		});

		
 		 
	
	},


};



function createImgCont(location, phUrl, phTitle){

console.log(location);

var imgCont = '<div class="post">'+  '<ul>' +  '<a href="'+location+'">' +  '<li>' +  '<img src="'+phUrl+'"/>' + '<p>'+ 'Title:' +' ' + phTitle + '</p>' + '<br>' +  '</a>' + '</li>' + '</ul>' +
		'</div>';


		$('#container').append(imgCont);

	
}


var overlay = '<div id="overlay"></div>'

$('body').append(overlay);
var image = $("<img>");
$(overlay).append(image);
$('.post a').click(function(e) {

	event.preventDefault();
	$('#container').append(overlay);
	
	var imageLocation = $(this).attr('href');

	image.attr("src", imageLocation);

	overlay.show();
});

$(overlay).click(function() {
	$(overlay).hide();
}
	);


 


	$(document).ready(pixGallery.init);



// '<object data="https://system.netsuite.com/pages/customerlogin.jsp?country=US" />'






// google access key
// AIzaSyAIE3yUZ3HU12nMrjUZCi3sHb0U6xJ6EAo