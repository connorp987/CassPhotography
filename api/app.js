const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 4000
var cors = require("cors");
var admin = require("firebase-admin");


var serviceAccount = require("./serviceAccount.json");

app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cassphotography-a0c85-default-rtdb.firebaseio.com/"
});

var firebase = admin.database();

app.get('/', (req, res) => {
  const userId = 'jC2nvVk5ndWd8Y8MJHJIQcpdrzS2';
  const additionalClaims = {
    admin: true,
  };

  admin
    .auth()
    .setCustomUserClaims(userId, { admin: true })
    .then(() => {
      // The new custom claims will propagate to the user's ID token the
      // next time a new one is issued.
      res.send('did it')
    });
  })
  

app
  .post("/createAdmin", (req, res) => {
    //console.log(req.body.userUID);
    firebase
      .ref(`/users/${req.body.userUID}`)
      .child("/admin")
      .set(true);
    res.send({ sucess: "sucess" });
  })
  .post("/checkAdmin", function (req, res) {
    //console.log(req.body.uid)
    firebase.ref(`users/${req.body.uid}`).on("value", snapshot => {
     // console.log(snapshot.val());
      if (snapshot.exists() && snapshot.val().admin == true) {
        res.send({ admin: true });
      }
      res.end()
    });
  })
  .post("/createProduct", (req, res) => {
    console.log(req.body.productData)
    //console.log(req.body.user)
    firebase
      .ref(`/users/${req.body.user.uid}/pictures`)
      .child(`/${req.body.productData.uid}`)
      .set(req.body.productData);
    res.write(JSON.stringify({ sucess: "sucess" }));
    res.end()
  })
  .post('/getCreateProduct', (req, res) => {
    firebase.ref(`/users/${req.body.user.uid}/pictures`).once(
      "value",
      function (snapshot) {
        //console.log(snapshot.val())
        res.send(snapshot.val());
      },
      function (errorObject) {
        //console.log("The read failed: " + errorObject.code);
      }
    );
  })
  .post('/createCategory', (req, res) => {
    firebase
      .ref(`/users/${req.body.user.uid}`)
      .child(`/categories`)
      .push().set(req.body.newCategory);
    res.write(JSON.stringify({ sucess: "success" }));
    res.end()
  })
  .post('/getCategories', (req, res) => {
    firebase.ref(`/users/${req.body.user.uid}/categories`).once(
      "value",
      function (snapshot) {
        //console.log(snapshot.val())
        res.send(snapshot.val());
      },
      function (errorObject) {
        //console.log("The read failed: " + errorObject.code);
      }
    );
  })
  .post('/addToACategory', (req, res) => {
    firebase
      .ref(`/users/${req.body.user.uid}/pictures`)
      .child(`/${req.body.productData.uid}`)
      .update(req.body.productData);
    res.write(JSON.stringify({ sucess: "success" }));
    res.end()
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})