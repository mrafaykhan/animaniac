# Animeniac

Animeniac is a Next.js-based web app designed to compare anime watchlists between users on AniList. It helps friends see which anime series they have in common and highlights the differences, making it easier to find new shows to watch or discuss.

---

## Overview

- Started as a Python script, Animeniac evolved into a modern Next.js app with a React frontend and Material-UI (MUI) for styling.
- The app leverages AniList data to fetch and compare users' anime lists.
- Provides a clean UI with multiple pages and intuitive navigation using Next.js file-based routing and a shared MUI AppBar navigation.
- Displays detailed comparison results with easy-to-understand diff views.

---

## Features

- **User Anime List Comparison**  
  Compare two or more AniList users’ anime watch histories to identify common shows and unique ones.
  
- **Diff View**  
  See exactly which anime titles differ between users, helping you discover new series or see what your friends are watching.

- **Responsive and Accessible Navigation**  
  Uses Material-UI components for a sleek, responsive navigation bar present across all pages.

---

## How to Use

1. Navigate to the comparison page.
2. Enter the AniList usernames of the users you want to compare.
3. Submit the form to fetch and display each user’s anime lists.
4. View the diff results highlighting:
   - Anime both/all users have watched
   - Anime unique to each user
5. Explore the lists and discover new anime recommendations.

---

## Tech Stack

- **Next.js** — Framework for React-based server-side rendering and routing.
- **React** — Frontend UI library.
- **Material-UI (MUI)** — UI components for styling and layout.
- **react-markdown** — Renders markdown content like the README on the homepage.
- **Node.js fs module** — Reads README.md content server-side for display.
- **AniList API** — Data source for users’ anime lists. Uses GraphQL API's

---


## Contact

For questions or help, reach out to the project maintainer.

---

Thank you for using Animeniac — happy anime watching and comparing!