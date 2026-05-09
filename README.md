# 🎌 Anime Watchlist

A web application where users can browse anime titles, search for their favorites, and save them to a personal watchlist — all powered by the Jikan API and Firebase.

---

## ✨ Features

- **Google Sign-In** — Secure authentication via Firebase Authentication
- **Browse Top Anime** — View top-rated anime titles on the home page, fetched from the Jikan API
- **Search** — Search for any anime title by name
- **Personal Watchlist** — Save and remove anime titles to your own watchlist (stored in Firebase Firestore per user)
- **Dark / Light Mode Toggle** — Switch between dark and light themes
- **Notifications** — Toast notifications when adding or removing a title from the watchlist

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework & build tool |
| Firebase Authentication | Google Sign-In |
| Firebase Firestore | Cloud database for watchlists |
| Jikan API | Public anime data (`https://api.jikan.moe/v4`) |
| react-hot-toast | Toast notifications |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A [Firebase](https://firebase.google.com/) account

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Google Sign-In**:
   - Go to **Authentication → Sign-in method → Google** and enable it.
3. Create a **Firestore Database**:
   - Go to **Firestore Database → Create database** and start in test mode.
4. Register a **Web App** in your Firebase project to get your config keys.

### 4. Configure Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> All values can be found in your Firebase project settings under **General → Your apps → SDK setup and configuration**.

### 5. Run the Development Server

```bash
npm run dev
```

Then open your browser at `http://localhost:5173`.

---

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── App.jsx          # Main app layout, routing, and anime fetch logic
├── Login.jsx        # Google Sign-In page
├── Bookmark.jsx     # Watchlist page + Firestore CRUD operations
├── DarkMode.jsx     # Dark/Light mode toggle component
├── firebase.js      # Firebase app initialization
├── App.css          # App-level styles
└── index.css        # Global styles
```

---

## 🌐 Deployment (Firebase Hosting)

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Log in to Firebase

```bash
firebase login
```

### 3. Build the Project

```bash
npm run build
```

### 4. Initialize Firebase Hosting

```bash
firebase init hosting
```

When prompted:
- **Which Firebase project?** → Select your existing Firebase project
- **Public directory?** → Enter `dist`
- **Configure as single-page app?** → `Yes`
- **Overwrite `dist/index.html`?** → `No`

### 5. Deploy

```bash
firebase deploy
```

After deployment, Firebase will provide a live URL in the format:
```
https://<your-project-id>.web.app
```

---

## 🎯 Optional Tiers Implemented

| Tier | Feature |
|---|---|
| Tier B | Saved / Favorites (Watchlist with Firestore) |
| Tier C | Dark Mode / Theme Toggle |
| Tier C | Notifications / Toast Alerts |
