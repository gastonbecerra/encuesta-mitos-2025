// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseError } from "firebase/app";
import { getFirestore, getDoc, doc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

// Function to check Firebase connection
async function checkFirebaseConnection() {
  if (process.env.NODE_ENV === 'development') {
    try {
      // We try to get a non-existent document. This is a light-weight operation.
      // If it fails, it's likely a config or rules issue.
      const testDocRef = doc(collection(db, "_internal-test"), "connection-check");
      await getDoc(testDocRef);
      console.log("✅ Firebase connection successful.");
    } catch (e) {
      console.error("❌ Firebase connection failed. Please check your configuration and security rules.");
      if (e instanceof FirebaseError) {
        console.error("Firebase Error Code:", e.code);
        console.error("Firebase Error Message:", e.message);
        console.error("💡 Common issues:");
        console.error("   1. Make sure your `.env.local` file has the correct Firebase credentials.");
        console.error("   2. Check your Firestore security rules. For development, you can allow reads/writes.");
        console.error("      Example rule for development (use with caution):");
        console.error("      rules_version = '2';");
        console.error("      service cloud.firestore {");
        console.error("        match /databases/{database}/documents {");
        console.error("          match /{document=**} {");
        console.error("            allow read, write: if true;");
        console.error("          }");
        console.error("        }");
        console.error("      }");
      } else {
         console.error("An unexpected error occurred during Firebase connection check:", e);
      }
    }
  }
}

// Run the check when the server starts
if (typeof window === 'undefined') { // Ensures this only runs on the server
    checkFirebaseConnection();
}


export { db };
