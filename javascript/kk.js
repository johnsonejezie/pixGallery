var instagram = {
	base: 'https://api.instagram.com/v1/',
	data:{client_id: 'baa5c63f64e844fc9a854b18bbb8d301'},
	userName:null,

// https://api.instagram.com/v1/users/1574083/?access_token=ACCESS-TOKEN


	init:function() {
		$("#target").submit( function (e) {
			e.preventDefault();
			instagram.userName=$( '#userName').val();
			instagram.getUsers();
		});
	},

	getUsers: function() {
		//the initial json request to flickr to get the latest recent photos
		$.getJSON(instagram.base + 'users/search?q=' + instagram.userName + '&callback=?', instagram.data, function(response) {
				instagram.loadUser(response);
		}); 
	
	},

	loadUser:function(response) {
		console.log(response);
		var userDetails="";
		$.each(response.data, function(i, item){
 				
			//Assign current photo to a variable 
 			var obj=this;

 			// console.log(item.profile_picture);
 			//Get the user full name
			var fullName = item.full_name;
 			
 			//Get the user picture url
			var photoURL = item.profile_picture;


			userDetails += '<div class="post">'+  '<ul>' +   '<li>' + '<img src="'+photoURL+'"/>'+'<p>'+ 'Full Name:' +' ' + fullName + '</p>' + '</li>' + '</ul>' +
						'</div>';
		});

	$('#container').html(userDetails);
}
};

$(document).ready(instagram.init);
