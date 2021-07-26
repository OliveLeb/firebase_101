import config from '../config.js';

// Initialisation de Firebase
firebase.initializeApp(config);

// --------------------------------------------
// Initialisation des gestionnaires d'événement
// --------------------------------------------

$('#loginButtonGithub').on('click', githubLogin);
$('#loginButtonGoogle').on('click', googleLogin);
$('#loginForm').on('submit', emailPasswordLogin);
$('#registerForm').on('submit', register);
$('#logout').on('click', logout);

firebase.auth().onAuthStateChanged(user => {
    if(user?.uid) {
        $('#results').empty().append('<p>Automatically loggind in '+ user.email +'('+ user.uid +') </p>')
    }
})

// ----------------------------------------
// Définition des gestionnaires d'événement
// ----------------------------------------

function logout(e){
    e.preventDefault();

    firebase.auth().signOut();
    $('#results').empty();
}

function githubLogin() {
    // Votre code ici ...
    // Créez un provider pour Github
}

function googleLogin() {
    // Votre code ici ...
    // Créez un provider pour google
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res => {
        const user = res.user;

        $('#results').html(`<div class="alert alert-success">
        Bienvenue ${user.displayName} <br/>
        <img src="${ user.photoURL }" />
        </div>`);
    })
}

function register(event) {
    event.preventDefault();

    const email = $('#emailFieldRegister').val();
    const password = $('#passwordFieldRegister').val();
    const passwordConfirm = $('#passwordFieldConfirmRegister').val();

    console.log(password, passwordConfirm)

    if(password !== passwordConfirm) {
        $('#results').empty().append('<div class="alert alert-danger">Les mots de passe ne correspondent pas </div>')
        return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        console.log('Registration succeed!', userCredential.user)
        $('#results').empty().append('<p>Registration succeed! Welcome '+ userCredential.user.email +'('+ userCredential.user.uid +') </p>')
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.error('Error! ', errorCode, errorMessage)
        $('#results').empty().append('<div class="alert alert-danger">'+ errorMessage +'</div>')
    });

    console.log(email, password, passwordConfirm)
}

function emailPasswordLogin(event) {
    event.preventDefault();

    const email = $('#emailField').val();
    const password = $('#passwordField').val();

    // Votre code ici ...
    // Utilisez les variables 'email' et 'password' pour les transmettre à Firebase via le provider "Email/Password"

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        // var user = userCredential.user;
        // ...
        console.log('Authentication succeed!', userCredential.user)
        $('#results').empty().append('<p>Authentification succeed! Welcome '+ userCredential.user.email +'('+ userCredential.user.uid +') </p>')
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error! ', errorCode, errorMessage)
        $('#results').empty().append('<div class="alert alert-danger">'+ errorMessage +'</div>')
    });
}