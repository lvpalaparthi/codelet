firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    //user is signed in
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    var user = firebase.auth().currentUser;
    if (user != null) {
      docRef
        .get()
        .then(function (doc) {
          if (doc && doc.exists) {
            const myData = doc.data();
            document.getElementById("user_para").innerHTML =
              "Welcome " +
              myData.firstname.substring(0, 1).toUpperCase() +
              myData.firstname.substring(1).toLowerCase() +
              "!";
          }
        })
        .catch(function (error) {
          console.log("Got an error: ", error);
        });
    }
  } else {
    //no user is signed in
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});
var firestore = firebase.firestore();
const docRef = firestore.doc("users/userData");

function login() {
  var userEmail = document.getElementById("email_field2").value;
  var userPassword = document.getElementById("password_field2").value;
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
  var userFirstName = document.getElementById("firstname_field").value;
  var userLastName = document.getElementById("lastname_field").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then(function () {
      docRef
        .set({
          firstname: userFirstName,
          lastname: userLastName,
          email: userEmail,
        })
        .then(function () {
          console.log("Status saved!");
        })
        .catch(function (error) {
          console.log("got an error: ", error);
        });
      document.getElementById("email_field").value = "";
      document.getElementById("password_field").value = "";
      document.getElementById("firstname_field").value = "";
      document.getElementById("lastname_field").value = "";
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

function loginMessage() {
  document.getElementsByClassName("login-div")[0].style.display = "block";
  document.getElementsByClassName("register-div")[0].style.display = "none";
}
function registerMessage() {
  document.getElementsByClassName("register-div")[0].style.display = "block";
  document.getElementsByClassName("login-div")[0].style.display = "none";
}
