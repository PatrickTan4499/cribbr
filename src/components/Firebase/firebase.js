import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBLqnQqZmPRKk-DCUuvemIUVZySRXYptpA",
    authDomain: "cribbr-c97a4.firebaseapp.com",
    databaseURL: "https://cribbr-c97a4.firebaseio.com",
    projectId: "cribbr-c97a4",
    storageBucket: "cribbr-c97a4.appspot.com",
    messagingSenderId: "265506001926",
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.database();
    }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}
  export default Firebase;
/*
  <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBLqnQqZmPRKk-DCUuvemIUVZySRXYptpA",
    authDomain: "cribbr-c97a4.firebaseapp.com",
    databaseURL: "https://cribbr-c97a4.firebaseio.com",
    projectId: "cribbr-c97a4",
    storageBucket: "cribbr-c97a4.appspot.com",
    messagingSenderId: "265506001926",
    appId: "1:265506001926:web:cce198822900634f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>*/
