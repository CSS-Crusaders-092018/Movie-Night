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

//Establish first event page on load
database.ref("/users").once("value").then(function (snap) {
    snap.forEach(function (child) {
        if (child.key === currentUser) {
            var eventList = child.val().events;
            setThisEvent(eventList[1])
            eventTabLoad(eventList);
        } //end If
    }) //end forEach()
})


$(document).on("click", "#event-submit", function (event) {
    event.preventDefault();
    var eventDate = $("#newEventDate").val().trim();
    var eventName = $("#hostName").val().trim();
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
            name: newGuests[i],
            suggestions: ["empty"],
            upVotesRemaining: 3,
            downVotesRemaining: 3
        })
    }
} //end getData()





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