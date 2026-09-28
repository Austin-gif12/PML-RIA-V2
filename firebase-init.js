import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// persistentLocalCache is what makes the app work offline: reads/writes hit a local
// IndexedDB copy first and sync to the server in the background whenever there's a connection.
// Auto-detect long polling: some phone networks, VPNs and content blockers break Firestore's default
// streaming connection, which shows up as jobs hanging on "Loading…". This falls back automatically.
// The third argument is the Firestore database ID. This project's database is named "default"
// (no brackets), not the standard "(default)", so it has to be named explicitly.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  experimentalAutoDetectLongPolling: true
}, 'default');
