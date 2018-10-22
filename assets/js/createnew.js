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
///////////////////////////////////
/////   Login/Auth stuff  ////////
/////////////////////////////////

var currentUser = "";
// //Handle Account Status
(function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //User is signed in.
            // var displayName = user.displayName;
            // var email = user.email;
            // var emailVerified = user.emailVerified;
            // var photoURL = user.photoURL;
            // var isAnonymous = user.isAnonymous;
            // var uid = user.uid;
            // var providerData = user.providerData;
            currentUser = user.uid;

        } else {
            // User is signed out.
            console.log("signed out");
            // ...
        }
    });
})();

////////////////////////////////
////////////////////////////////
/////////////////////////////////
var userData = "";
//Establish first event page on load
database.ref("/users").once("value").then(function (snap) {
    userData = snap.val();
})

console.log(userData);

$(document).on("click", "#event-submit", function (event) {
    event.preventDefault();
    var eventDate = $("#newEventDate").val().trim();
    var eventName = $("#eventName").val().trim();
    var guests = $("#inviteeEmail").val().trim();

    var guestArray = guests.split(",");
    getData(eventDate, eventName, guestArray)
})


function getData(date, name, newGuests) {
    var nextEvent = {
        guests: [],
        suggestionCap: 4,
        eventDate: date,
        eventName: name,
        suggestionList: [
            "empty"
        ]
    }

    for (var i = 0; i < newGuests.length; i++) {
        nextEvent.guests.push({
            name: newGuests[i].trim(),
            suggestions: ["empty"],
            upVotesRemaining: 3,
            downVotesRemaining: 3
        })
    }
    console.log(nextEvent);
} //end getData()

//Logout 
$("#logout").on("click", function (event) {
    event.preventDefault();
    console.log("kbye")
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      window.location = "index.html";
    }, function (error) {
      // An error happened.
    });
  })

// use firebase list of actors to select from users already in database
// can we use Firebase transaction - join state usable for this event?
// use Firebase invitations?
// EA created dynamic link : https://movienight.page.link and added whitelist url


// //-------------------- Test Info
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
//     eventDate: "Event 3",
//     eventName: "Third Event",
//     suggestionList: [
//         "empty",
//         {
//             title: "Batman",
//             poster: "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
//             year: 1980,
//             plot: "Jack Nicholson goes hard on his fam.",
//             votes: 0
//         }
//     ]
// }

// database.ref("/events").push(testEvent);

// });