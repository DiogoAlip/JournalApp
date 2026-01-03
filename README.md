# Journal App

A modern web application for creating and managing a personal journal, built with React and Redux.

## 📝 Description

Journal App allows you to keep a record of your daily thoughts and ideas. You can create notes, edit them, save changes in real-time, and attach images to your entries. The application features a robust authentication system and a clean, responsive user interface.

## 🚀 Technologies

This project uses the following key technologies and libraries:

- **[React](https://react.dev/)**: Library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: A superset of JavaScript that adds static types for more robust development.
- **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling.
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: The official opinionated, batteries-included toolset for efficient Redux development.
- **[Material UI (MUI)](https://mui.com/)**: React component library that implements Material Design for a beautiful and consistent UI.
- **[Firebase](https://firebase.google.com/)**: Google's development platform used for:
  - **Authentication**: User management (Login/Register with Email and Google).
  - **Firestore Database**: Cloud NoSQL database to store notes.
- **[SweetAlert2](https://sweetalert2.github.io/)**: A beautiful, responsive, highly customizable replacement for JavaScript's popup boxes.
- **[Vitest](https://vitest.dev/)** & **[Testing Library](https://testing-library.com/)**: For unit and integration testing.

## ✨ Key Features

- **User Authentication**:
  - New account registration using email and password.
  - Quick login with Google.
  - Form validation.

- **Journal Management**:
  - **Create**: Easily add new entries to your journal.
  - **Edit**: Modify the title and content of your existing notes.
  - **List**: View all your notes in an organized sidebar.
  - **Images**: Upload and view image galleries for each note (integration with storage services like Cloudinary).
  - **Delete**: Remove notes that you no longer need.

- **User Experience**:
  - Visual feedback (loading alerts, success/error messages).
  - Fully responsive design (adapted for mobile and desktop).

## 📦 Installation and Setup

To run this project locally:

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd journal-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development**:
   ```bash
   npm run dev
   ```

## 🧪 Tests

The project includes configured tests. To run them:

```bash
npm run test
```

## 📄 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Runs the linter to find coding issues.
