# PML RIA — shared job system

Login → Jobs list → RIA form per job. Each door has a Pre-installation survey, an Installation record (locked until the survey is complete), and photos. Doors can also be dropped as pins on uploaded floor plans, colour-coded by status. Everything syncs live between devices through Firebase (Firestore) and keeps working offline; changes made with no signal upload automatically when the device reconnects.

## Setting this up as a new site

This bundle is a complete, working copy of the app as it stands today — every file, nothing missing. It is currently wired to point at your **existing** Firebase project (`pml-ria`), so a new site built from these files shares the same login accounts, jobs and photos as your current live site. If that's what you want, skip to "Publish on GitHub Pages" below. If you want a fully separate, disconnected copy instead — its own users, its own jobs, starting empty — follow "One-time Firebase setup" first and paste the new project's values into `firebase-config.js` before publishing.

## One-time Firebase setup (only needed for a brand-new, disconnected copy — about 10 minutes, free plan)

1. Go to https://console.firebase.google.com and sign in with a Google account. **Add project**, name it, turn Google Analytics off, **Create**.
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.**
3. **Authentication → Users tab → Add user.** Add an email + password for each person who should have access. To change someone's login later, use the same tab (reset password / delete user).
4. **Build → Firestore Database → Create database.** Choose a UK/EU region (e.g. `eur3` or `europe-west2`), start in **production mode**, **Enable**. **Note the Database ID shown at the top of the page** (usually `(default)`) — you'll need it in step 9.
5. In Firestore, open the **Rules** tab, replace everything with the contents of `firestore.rules` from this folder, click **Publish**.
6. **Project settings** (gear icon, top left) **→ General → Your apps → click the `</>` (Web) icon.** Give it a nickname, skip Firebase Hosting, **Register app**.
7. Copy the values from the `firebaseConfig` block it shows into `firebase-config.js`, replacing each value.
8. **Authentication → Settings → Authorized domains → Add domain:** your new site's domain (e.g. `yourname.github.io`) — login won't work without this.
9. Open `firebase-init.js` and check the last line: `}, 'default');`. If your Database ID from step 4 was exactly `(default)`, change that line to remove the extra argument entirely (`});`). If it was some other custom name, put that name there instead. Getting this wrong is the single most common reason jobs fail to load with a "can't reach the server" message.

## Publish on GitHub Pages

1. On github.com, click **New repository**, give it a name, and create it (public is fine — the app is protected by login and the Firestore rules, not by hiding the code).
2. Open the new repo, click **Add file → Upload files**, and drag in every file listed below, then **Commit changes**.
3. In the repo, go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`, **Save**.
4. Wait a minute, then open `https://<your-github-username>.github.io/<repo-name>/`.
5. If you didn't do the "brand-new, disconnected copy" setup above, add this new domain to **Authentication → Settings → Authorized domains** in the Firebase console, or login will fail.

**Files to upload** (everything except the two `SAMPLE-*` files, which are just previews and not needed):
`index.html`, `jobs.html`, `ria.html`, `style.css`, `ria.css`, `firebase-init.js`, `firebase-config.js`, `firestore.rules`, and the whole `assets` folder (logos and icons).

## Drawings & Pins

Upload one PDF per floor under **Drawings & Pins** on a job. Tapping the drawing drops a numbered pin, which creates a new door and opens its pre-installation survey — pins are amber while the survey is in progress, blue once it's ready to install, and green once installed. The **View Pins** tab lists every pin across every floor and jumps you straight to it. Drawings are stored the same compressed way as photos (capped around 800KB each), so they're fine for dropping pins on, but won't hold up as a sharp, fully zoomable drawing if you zoom in a long way.

## Using it offline

Open the site once while online and sign in — the app and job data are cached on the device. After that it opens and edits with no signal, and syncs when signal returns. Add it to the home screen (Safari → Share → Add to Home Screen; Chrome → ⋮ → Add to Home screen) for one-tap access.

The firebaseConfig values are not secrets — they only identify your project. Access is controlled by the login and the rules in `firestore.rules`.
