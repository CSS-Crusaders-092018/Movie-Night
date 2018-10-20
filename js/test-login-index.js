

  // Initialize Firebase
  
$(document).ready(function(){


    var config = {
        apiKey: "AIzaSyClExq7ONUngMdBtQYse12PzsDAnx_mmyA",
        authDomain: "clickbuttoncounter-f4ab6.firebaseapp.com",
        databaseURL: "https://clickbuttoncounter-f4ab6.firebaseio.com",
        projectId: "clickbuttoncounter-f4ab6",
        storageBucket: "clickbuttoncounter-f4ab6.appspot.com",
        messagingSenderId: "280433229419"
      };
      firebase.initializeApp(config);


    $('#submit').on('click', function(){
        var email = $('#newEmail').val();
        var password = $('#newPassword').val();
       
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