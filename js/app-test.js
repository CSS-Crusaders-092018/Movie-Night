

function getMovieData(movie) {
    var queryURL = "https://api-public.guidebox.com/v2/search?api_key=784a0a8429f1789c7473e19007cce274f76df272&type=movie&field=title&query=" + movie;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i=0; i < response.results.length; i++) {
            var newMovie = $("<p>").addClass("search-result").attr("data-id", response.results[i].id).attr("data-title", response.results[i].title).text(response.results[i].title);
            $("#movie-display").append(newMovie);
        }   
        
    })
} //end Get Movie Data

$("#form-submit").on("click", function (event) {
    event.preventDefault();
    var title = $("#search-input").val().trim();
    // $("#movie-display").append(title);
    console.log(title);
    getMovieData(title);
})

$(document).on("click", ".search-result", function (){
    var newMovie = $(this).attr("data-title");
    var newId = $(this).attr("data-id");
    var newItem = $("<p>").text(newMovie + ", " + newId);
    $("#saved-movies").append(newItem);
    $("#movie-display").empty();
})