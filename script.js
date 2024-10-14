const firebaseConfig = {
    apiKey: "AIzaSyBazEJwCXDWQZdhWN3JWyN6JDcaxOGp4mI",
    authDomain: "quiztrivia-32d83.firebaseapp.com",
    projectId: "quiztrivia-32d83",
    storageBucket: "quiztrivia-32d83.appspot.com",
    messagingSenderId: "5093975636",
    appId: "1:5093975636:web:42c36e4af7e22e01716fc1"
  };

firebase.initializeApp(firebaseConfig);

  const formdb = firebase.firestore();
  

  const addData = (user) => {
    formdb.collection("users")
      .add(user)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
        readAll();
      })
      .catch((error) => console.error("Error adding document: ", error));
  };