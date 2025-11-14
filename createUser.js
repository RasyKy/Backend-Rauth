const admin = require('firebase-admin');

const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Attempting to create a new user...');

const username = 'mrbackend';
const email = 'backend@example.com';
const password = 'qwertyy12345';

admin.auth().createUser({
  username: username,
  email: email,
  password: password,
  displayName: 'Backend Test User',
})
  .then((userRecord) => {
    console.log(' Success! New user created with UID:', userRecord.uid);
  })
  .catch((error) => {
    console.error(' Error creating new user:', error.message);
  });