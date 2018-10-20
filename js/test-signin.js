// Initialize Firebase - movie crusaders account
$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyB3ognBnBLe-vgaHhsZV7ksufHgzg21VFs",
        authDomain: "movie-night-464be.firebaseapp.com",
        databaseURL: "https://movie-night-464be.firebaseio.com",
        projectId: "movie-night-464be",
        storageBucket: "movie-night-464be.appspot.com",
        messagingSenderId: "123201978661"
    };
    firebase.initializeApp(config);

    $('#submit').on('click', function(){
        var email = $('#email').val();
        var password = $('#password').val();
       
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage);
            // ...
          });
    });






});
