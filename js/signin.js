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
  
  //Handle Account Status
  (function initApp() {
      firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        if (user) {
          //User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          window.location = "event-page-test.html"; //After successful login, user will be redirected to success.html
        } else {
          // User is signed out.
          console.log("signed out");
          // ...
        }
      });
    })();
  
    $('#signin').on('click', function(){
        console.log("clicked signin")
      var email = $('#email').val();
      var password = $('#password').val();
  
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
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
          alert("Sorry, invalid login");
          // ...
        });
      });
  
    $("#signup").on("click", function() {
        console.log("clicked sign up");
      var email = $("#newEmail").val();
      var password = $("#newPassword").val();
  
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage);
          alert(error.message);
          // ...
      });
  });
  
  });
  