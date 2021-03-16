firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    //user is signed in
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_para").innerHTML =
        "Welcome User : " + email_id;
    }
  } else {
    //no user is signed in
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPassword = document.getElementById("password_field").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then(function () {
      document.getElementById("email_field").value = "";
      document.getElementById("password_field").value = "";
    })
    .catch(function (error) {
      //handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error: " + errorMessage);
    });
}

function register() {
  var userEmail = document.getElementById("email_field").value;
  var userPassword = document.getElementById("password_field").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then(function () {
      document.getElementById("email_field").value = "";
      document.getElementById("password_field").value = "";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
}

function logout() {
  firebase.auth().signOut();
  document.getElementById("email_field").value = "";
  document.getElementById("password_field").value = "";
}
