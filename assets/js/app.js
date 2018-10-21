$(document).ready(function () {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB3ognBnBLe-vgaHhsZV7ksufHgzg21VFs",
    authDomain: "movie-night-464be.firebaseapp.com",
    databaseURL: "https://movie-night-464be.firebaseio.com",
    projectId: "movie-night-464be",
    storageBucket: "movie-night-464be.appspot.com",
    messagingSenderId: "123201978661"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var eventList = database.ref("/events").push();
// var user = firebase.auth().currentUser;
// console.log(user);

var thisEvent = undefined;
var eventKey = undefined;

database.ref("/events").on("child_added", function (snapshot) {
    thisEvent = snapshot.val();
    eventKey = snapshot.key;
    pageLoad();
})

database.ref("/events").on("child_changed", function (snapshot) {
    thisEvent = snapshot.val();
    eventKey = snapshot.key;
    console.log(eventKey);
    console.log(thisEvent);
    pageLoad();
})

//On Page Load
function pageLoad() {
    $("#event-name").text(thisEvent.eventName);
    $("#event-date").text(thisEvent.eventDate);
    $("#saved-movies").empty();

    for (var i = 1; i < thisEvent.suggestionList.length; i++) {
        var newTitle = thisEvent.suggestionList[i].title;
        var newItem = $("<div>").addClass("suggestion-container");

        var newTitleCard = $("<div>").addClass("list-item");
        var titleTitle = $("<h3>").addClass("list-title").attr("data-item", i).attr("data-hidden", "true").text(newTitle);
        newTitleCard.append(titleTitle);
        var upVoteButton = $("<button>").addClass("upvote").attr("data-item", i).text("+");
        var downVoteButton = $("<button>").addClass("downvote").attr("data-item", i).text("-");
        newTitleCard.append(upVoteButton, downVoteButton);

        var newDropDown = $("<div>").addClass("suggestion-info movie-" + i).attr("data-title", newTitle).attr("data-item", i);
        var newPoster = $("<img>").attr("src", thisEvent.suggestionList[i].poster).addClass("poster-img");
        newDropDown.append(newPoster);
        newDropDown.append("<p>" + thisEvent.suggestionList[i].year);
        newDropDown.append("<p>" + thisEvent.suggestionList[i].plot);

        newItem.append(newTitleCard, newDropDown);
        newDropDown.hide();
        $("#saved-movies").append(newItem);
    }
}

//Get Movie Data
function getMovieData(movie) {
    var queryURL = "https://api-public.guidebox.com/v2/search?api_key=784a0a8429f1789c7473e19007cce274f76df272&type=movie&field=title&query=" + movie;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.results.length; i++) {
            var newMovie = $("<p>").addClass("search-result").attr("data-id", response.results[i].imdb).attr("data-title", response.results[i].title).text(response.results[i].title + ", " + response.results[i].release_year);
            $("#movie-display").append(newMovie);
        }
    }) //end AJAX 
} //end Get Movie Data

$("#suggestion-submit").on("click", function (event) {
    event.preventDefault();
    var title = $("#suggestion-input").val().trim();
    $("#suggestion-input").val("");
    getMovieData(title);
})

//Adding a movie to the list
$(document).on("click", ".search-result", function () {
    var newMovie = $(this).attr("data-title");
    var newId = $(this).attr("data-id");

    var newQuery = "https://www.omdbapi.com/?apikey=168f295&i=" + newId + "&type&y=&plot=short"
    $.ajax({
        url: newQuery,
        method: "GET"
    }).then(function (response) {
        if (thisEvent.guests[0].suggestions.length < thisEvent.suggestionCap) {
        var newSuggestion = {
            title: response.Title,
            poster: response.Poster,
            year: response.Year,
            plot: response.Plot,
            metascore: response.Metascore,
            votes: 0
        }
        thisEvent.guests[0].suggestions.push(newMovie);
        thisEvent.suggestionList.push(newSuggestion);
        database.ref("/events/"+ eventKey).set(thisEvent);
        
    } else {
        alert("You've entered enough, haven't you?"); 
        //TODO Delete Alert Prompts
    }

    }) //end AJAX 
    $("#movie-display").empty();
})

//Display Movie Info on.Click
$(document).on("click", ".list-title", function () {
    var whichMovie = $(this).attr("data-item");
    if ($(this).attr("data-hidden") === "true") {
        $(".movie-" + whichMovie).show();
        $(this).attr("data-hidden", "false");
    } else {
        $(".movie-" + whichMovie).hide();
        $(this).attr("data-hidden", "true");
    }
})

//Vote Buttons
$(document).on("click", ".upvote", function () {
    if (thisEvent.guests[0].upVotesRemaining > 0) {
    
    var whichMovie = $(this).attr("data-item");
    thisEvent.suggestionList[whichMovie].votes++;
    thisEvent.guests[0].upVotesRemaining--;
    database.ref("/events/"+ eventKey).set(thisEvent);
    } else {
        alert("You're out of UpVotes"); 
        //TODO Delete Alert Prompts
    }
}) //end UpVoteButton

$(document).on("click", ".downvote", function () {
    if (thisEvent.guests[0].downVotesRemaining > 0) {
    
    var whichMovie = $(this).attr("data-item");
    thisEvent.suggestionList[whichMovie].votes--;
    thisEvent.guests[0].downVotesRemaining--;
    database.ref("/events/"+ eventKey).set(thisEvent);
    } else {
        alert("You're out of Down Votes"); 
        //TODO Delete Alert Prompts
    }
}) //end DownVoteButton

});
//-------------------- Test Info
// var testEvent = {
//     guests: [{
//         name: "Jason",
//         suggestions: ["empty"],
//         upVotesRemaining: 3,
//         downVotesRemaining: 3
//     }, {
//         name: "Joyce",
//         suggestions: ["empty", "Avatar", "Titanic", "Terminator 2"],
//         upVotesRemaining: 3,
//         downVotesRemaining: 3
//     }, {
//         name: "Isaac",
//         suggestions: ["empty", "ET", "Hook", "Jurassic Park"],
//         upVotesRemaining: 3,
//         downVotesRemaining: 3
//     }, {
//         name: "Elizabeth",
//         suggestions: ["empty", "The Shining", "Spartacus", "Full Metal Jacket"],
//         upVotesRemaining: 3,
//         downVotesRemaining: 3
//     }
//     ],
//     suggestionCap: 4,
//     eventDate: "Same time, same place",
//     eventName: "Demo Event",
//     suggestionList: [
//         "empty",
//         {
//             title: "The Shining",
//             poster: "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
//             year: 1980,
//             plot: "Jack Nicholson goes hard on his fam.",
//             votes: 0
//         }, {
//             title: "Jurassic Park",
//             poster: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg",
//             year: 1993,
//             plot: "DINO DNA!",
//             votes: 0
//         }, {
//             title: "Avatar",
//             poster: "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_.jpg",
//             year: 2009,
//             plot: "Only the highest grossing movie of all time!",
//             votes: 0
//         }
//     ]
// }

// database.ref("/events").push(testEvent);