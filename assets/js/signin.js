$(document).ready(function() {
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

  //Handle Account Status
  (function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        window.location = "event.html"; //After successful login, user will be redirected to success.html
      } else {
        // User is signed out.
        console.log("signed out");
        // ...
      }
    });
  })();

  $("#signin").on("click", function(event) {
    event.preventDefault();
    console.log("clicked signin");
    var email = $("#email").val();
    var password = $("#password").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(param) {
        console.log(param);
        console.log("success");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        $("#login").prepend("<p style='color:#c3073f'> The email or password entered is invalid.</p><br>");
          setTimeout(function() {
            $("#login").empty("");
          }, 3000);
        // ...
      });
  });

  //Sign Up -- to use in version 2.0
  // $("#signup").on("click", function (event) {
  //   event.preventDefault();
  //   console.log("clicked sign up");
  //   var email = $("#newEmail").val();
  //   var password = $("#newPassword").val();

  //   // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  //   //   // Handle Errors here.
  //   //   var errorCode = error.code;
  //   //   var errorMessage = error.message;
  //   //   console.log(errorCode)
  //   //   console.log(errorMessage);
  //   //   alert(error.message);
  //   //   // ...
  //   // });
  //   // writeUserData(user);

  //   firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
  //     var user = firebase.auth().currentUser;
  //     writeUserData(user); // Optional
  //   }, function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //       console.log(errorCode)
  //       console.log(errorMessage);
  //   });
  // });

  function writeUserData(user) {
    // Get the uid and display name of the newly created user.
    var uid = user.uid;

    database.ref("users/" + uid).set({
      email: user.email,
      events: [0]
    });
  }

  $("#forgotPassword").on("click", function() {
    var auth = firebase.auth();
    var email = $("#email").val();

    auth
      .sendPasswordResetEmail(email)
      .then(function() {
        console.log("email sent");
        $("#login").prepend(
          "<p style='color:#c3073f'> Please check your email for a link to reset your password.</p><br>"
        );
        // Email sent.
      })
      .catch(function(error) {
        console.log(error);
        // An error happened.
      });
  });
});

$("#logout").on("click", function(event) {
  event.preventDefault();
  console.log("kbye");
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        // Sign-out successful.
        window.location = "index.html";
      },
      function(error) {
        // An error happened.
      }
    );
});
