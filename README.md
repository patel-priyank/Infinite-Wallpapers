# Infinite Wallpapers

Infinite Wallpapers is a simple web app that loads wallpapers from Unsplash with infinite scroll. It uses the Unsplash API to fetch and display images seamlessly.

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- An API key from [Unsplash Developers](https://unsplash.com/developers)

### Backend Setup

1. Navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file by copying the provided example, then configure your environment variables (like the Unsplash API key):

   ```bash
   cp .env.example .env
   ```

4. Start the backend server:
   ```bash
   npx nodemon
   ```

### Frontend Setup

1. Open a new terminal window and navigate to the `webapp` directory:
   ```bash
   cd webapp
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The application should now be running. The frontend will be accessible at `http://localhost:5173` (or the port specified by Vite), and it will automatically proxy API requests to the backend server running on `http://localhost:4000`.
