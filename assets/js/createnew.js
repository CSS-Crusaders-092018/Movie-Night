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
var currentEmail = "";
// //Handle Account Status
(function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user.uid;
            currentEmail = user.email;
        } else {
            // User is signed out.
            // ...
        }
    });
})();

//////////////////////////////////////////////////////////
//////  Event Creation and Data mangaement  /////////////
////////////////////////////////////////////////////////
var userData = "";
var eventKey = "";
//Establish first event page on load
database.ref("/users").once("value").then(function (snap) {
    userData = snap.val();
})

$(document).on("click", "#event-submit", function (event) {
    event.preventDefault();
    var eventDate = $("#newEventDate").val().trim();
    var eventName = $("#eventName").val().trim();
    var guests = $("#inviteeEmail").val().trim();

    var guestArray = guests.split(",");
    guestArray.push(currentEmail);
    getData(eventDate, eventName, guestArray);
    updateUsers(guestArray);
    window.location = "event.html";
})

function getData(date, name, newGuests) {
    var nextEvent = {
        guests: [],
        suggestionCap: 3,
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
    database.ref("/events").push(nextEvent);
    database.ref("/events/").once("child_added", function (snapshot) {
        eventKey = snapshot.key;
    })

} //end getData()

function updateUsers(array) {
    $.each(userData, function (key, value) {
        for (var i = 0; i < array.length; i++) {
            if (value.email == array[i].trim()) {
                database.ref("/users/" + key + "/events").push(eventKey);
            }
        }
    });
}

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
