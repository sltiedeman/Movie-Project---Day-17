$(document).ready(function(){

	var apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
	var basePath = '';
	var sizeOptions = '';
	var logo_sizes = '';	
	var poster_sizes = '';
	var profile_sizes = '';

	var siteConfig = 'https://api.themoviedb.org/3/configuration?api_key='+apiKey;

	$.getJSON(siteConfig, function(data){
		basePath = data.images.base_url;
		console.log(basePath);
		sizeOptions = data.images.poster_sizes;
		//0: "w300" 1: "w780" 2: "w1280" 3: "original"
		posterSize = 'w300';
		logo_sizes = logo_sizes['original'];
		profileSizes = profile_sizes['original'];
	});

	var nowPlaying = 'http://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey;


	$.getJSON(nowPlaying, function(data){
		console.log(data);
		var html = "";
		var html2 = "";
		var x = 0;
		movieArray = data.results;
		// movieArray = objectArray;
		// for(i=0; i<data.results.length; i++){
		for(i=0; i<movieArray.length; i++){
			x++;
			var backdrop_path = movieArray[i].backdrop_path;
			var genre_ids = movieArray[i].genre_ids;
			var movieId = movieArray[i].id;
			var title = movieArray[i].title;
			var overview = movieArray[i].overview;
			var popularity = movieArray[i].popularity;
			var posterPath = movieArray[i].poster_path;
			var releaseDate = movieArray[i].release_date;
			var voteAverage = movieArray[i].vote_average;
			var voteCount = movieArray[i].vote_count;	

			if(i==0){
				html += '<div class="movie-row">';
			}

			if(x==5){
				html += '</div>';
				html += '<div class="movie-row">';
				x=1;
			}

			html += '<div class="now-playing-movie">';
			html += '<div id="movie">'


			html += '<img data-toggle="modal" data-target="#myModal' + i +'" title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+posterPath+'">';
			html += '</div></div>';
			html2+='<div class="modal fade" id=myModal' + i + ' tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
			html2+='<div class="modal-dialog" role="document">';
			// html2+='<div class="modal-content">';
			// html2+='<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			// html2+='<h4 class="modal-title" id="myModalLabel">Additional Information</h4>';
			// html2+='</div>';
			html2+='<div class="modal-body">';
			if(backdrop_path == null){
				html2+='<img src = images/blank2.jpg>'
			}else{
				html2+='<img src="' + basePath + 'w300' + backdrop_path + '">';
			}
			html2+='<div class="modal-text"><h3>' + title +'</h3>' + overview + '</div>';			
			html2+='</div>';
			html2+='<div class="modal-footer">';
			html2+='<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
			html2+='</div>';
			html2+='</div>';
			html2+='</div>';
			html2+='</div>';
			
			if(i == (movieArray.length-1)){
				html += '</div>';
				$(html).appendTo('#now-playing-wrapper');
				$(html2).appendTo('#now-playing-wrapper');
			}

		}
	});	

	$('#movie-search-form').submit(function(){
		var x =0;
		event.preventDefault();
		var movieName = $('#movieInput').val();
		// var searchUrl = 'http://api.themoviedb.org/3/search/movie?query='+movieName+'&api_key='+apiKey;
		var searchUrl = "";
		var searchOption = $('#search-option').val();
		switch(searchOption){
			case "Movie":
				searchUrl = 'http://api.themoviedb.org/3/search/movie?query='+movieName+'&api_key='+apiKey;
				break;
			case "Actor/Actress":
				searchUrl = 'http://api.themoviedb.org/3/search/person?query='+movieName+'&api_key='+apiKey;
				break;
			case "TV":
				searchUrl = 'http://api.themoviedb.org/3/search/tv?query='+movieName+'&api_key='+apiKey;
				break;
			case "All":
				searchUrl = 'http://api.themoviedb.org/3/search/multi?query='+movieName+'&api_key='+apiKey;
				break;

		}
		console.log(searchUrl);

		$.getJSON(searchUrl, function(data){
			var html="";
			var html2="";
			movieArray = data.results;
			console.log(movieArray);
			$('#search-results').text("Search Results");
			$('#now-playing-wrapper').html("");
			for(i=0; i<movieArray.length; i++){
				x++;
				var backdrop_path = movieArray[i].backdrop_path;
				var genre_ids = movieArray[i].genre_ids;
				var movieId = movieArray[i].id;
				var title = movieArray[i].title;
				var overview = movieArray[i].overview;
				var posterPath = movieArray[i].poster_path;
				var profilePath = movieArray[i].profile_path;
				console.log("posterPath is" + posterPath);

				if(i==0){
					html += '<div class="movie-row">';
				}

				if(x==5){
					html += '</div>';
					html += '<div class="movie-row">';
					x=1;
				}
				html += '<div class="now-playing-movie">';
				html+='<div id="movie">';
				if(searchOption == "Movie"){
					if(posterPath!=null){
						html += '<img data-toggle="modal" data-target="#myModal' + i +'" title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+posterPath+'">';
					}else{
						html += '<img data-toggle="modal" data-target="#myModal' + i + '" src="images/blank.jpg">';
					}
				}else if(searchOption =="Actor/Actress"){
					if(profilePath!=null){
						html += '<img data-toggle="modal" data-target="#myModal' + i +'" title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+profilePath+'">';
					}else{
						html += '<img data-toggle="modal" data-target="#myModal' + i + '" src="images/blank.jpg">';
					}
				}else if(searchOption =="TV"){
					if(posterPath!=null){
						html += '<img data-toggle="modal" data-target="#myModal' + i +'" title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+posterPath+'">';
					}else{
						html += '<img data-toggle="modal" data-target="#myModal' + i + '" src="images/blank.jpg">';
					}
				}else if(searchOption =="All"){
					if((posterPath == null)&&(profilePath == null)){
						html += '<img data-toggle="modal" data-target="#myModal' + i + '" src="images/blank.jpg">';
					}else if(posterPath == null){
						html += '<img data-toggle="modal" data-target="#myModal' + i +'" title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+profilePath+'">';
					}else{
						html += '<img data-toggle="modal" data-target="#myModal' + i +'" title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+posterPath+'">';
					}
				}

				html += '</div></div>';
				html2+='<div class="modal fade" id=myModal' + i + ' tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
				html2+='<div class="modal-dialog" role="document">';
				// html2+='<div class="modal-content">';
				// html2+='<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
				// html2+='<h4 class="modal-title" id="myModalLabel">Additional Information</h4>';
				// html2+='</div>';
				html2+='<div class="modal-body">';
				if(searchOption == "Actor/Actress"){
					html2+='<div class="modal-text"><h3>' + movieArray[i].name + "</h3>";
					html2+="<p>Popularity: " + movieArray[i].popularity + "</p>";
					html2+="<p>Known For: " + movieArray[i].known_for[0].original_title + "</p>";
					html2+='</div>';
				}else{
					if(backdrop_path == null){
						html2+='<img src = images/blank2.jpg>'
					}else{
						html2+='<img src="' + basePath + 'w300' + backdrop_path + '">';
					}
					html2+='<div class="modal-text"><h3>' + title +'</h3>' + overview + '</div>';
				}
				html2+='</div>';
				html2+='<div class="modal-footer">';
				html2+='<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
				html2+='</div>';
				html2+='</div>';
				html2+='</div>';
				html2+='</div>';
				
				if(i == (movieArray.length-1)){
					html += '</div>';
					$(html).appendTo('#now-playing-wrapper');
					$(html2).appendTo('#now-playing-wrapper');
				}
			}
			if(movieArray.length==0){
				$('#search-results').html("0 Search Results");
			}

		});

			// $('.now-playing-movie').click(function(){

			// alert("hello");

			// });


	}); // End get json - popular movies
	

	
});
