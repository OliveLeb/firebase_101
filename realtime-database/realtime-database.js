import config from '../config.js';

// Initialisation de Firebase
firebase.initializeApp(config);

// Initialisation des gestionnaires d'événement
$('#addMessageForm').on('submit', onAddMessage);
$('#addUserForm').on('submit', onAddUser);

// ----------------------------------------
// 1) [À FAIRE] Complétez les gestionnaires d'événement onAddMessage() et onAddUser()
// ----------------------------------------

function onAddMessage (event) {
    event.preventDefault();

    const pseudo = $('#pseudo').val();
    const message = $('#message').val();

    // Votre code ici ...
    // Ajouter le pseudo et le message dans la database ...
}

function onAddUser (event) {
    event.preventDefault();

    const nom = $('#nom').val();
    const age = $('#age').val();

    // Votre code ici ...
    // Ajouter le nom et l'age dans la database ...
}

// ----------------------------------------
// 2) [À FAIRE] Écrivez le code qui permet de récupérer les messages ET les utilisateurs de la base
// ----------------------------------------

// Récupération des messages...

// Récupération des utilisateurs...
