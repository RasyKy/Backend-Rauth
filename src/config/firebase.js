const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Load .env variables if running locally
dotenv.config();

// Helper to handle Vercel's newline escaping in private keys
const formatPrivateKey = (key) => {
  return key.replace(/\\n/g, "\n");
};

if (!admin.apps.length) {
  // Option 1: Use Individual Env Variables (Best for Vercel)
  if (process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
      }),
    });
  }
  // Option 2: Fallback to local file (Only for local dev if .env is missing)
  else {
    try {
      const serviceAccount = require("../../service-account-key.json");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      console.error(
        "Firebase initialization failed: Missing env vars or service-account-key.json"
      );
    }
  }
}

const auth = admin.auth();
const db = admin.firestore();

module.exports = { admin, auth, db };
