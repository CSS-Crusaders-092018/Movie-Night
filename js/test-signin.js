

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
       
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage);
            // ...
        });
        console.log("success");
       

        //Handle Account Status
        function initApp() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                // User is signed in.
                //   var displayName = user.displayName;
                //   var email = user.email;
                //   var emailVerified = user.emailVerified;
                //   var photoURL = user.photoURL;
                //   var isAnonymous = user.isAnonymous;
                //   var uid = user.uid;
                //   var providerData = user.providerData;
                window.location = 'success.html'; //After successful login, user will be redirected to success.html
                } else {
                // User is signed out.
                console.log("signed out")
                // ...
                }
            })    
        };

        window.onload = function() {
            initApp();
        };

    });
        // firebase.auth().onAuthStateChanged(user => {
        //     if(user) {
        //         window.location = 'success.html'; //After successful login, user will be redirected to home.html
        //     }
        // });  
        
    






});