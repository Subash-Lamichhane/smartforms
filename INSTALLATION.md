# Installation Guide for SmartForms

This document provides detailed instructions on how to install and set up SmartForms on your local machine. Follow these steps to get started.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.x or higher)
- Yarn package manager
- MongoDB (Local installation or cloud instance)

## Clone the Repository

Start by cloning the SmartForms repository to your local machine:

```bash
git clone https://github.com/Subash-Lamichhane/smartforms.git
cd smartforms
```

## Backend Setup

### Environment Setup

Navigate to the backend directory and create a `.env` file to store all your configurations:

```bash
cd backend
touch .env
```

Add the following lines to your `.env` file:

```
GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
MONGO_URI=mongodb://localhost:27017/quizApp
```

Replace `<YOUR_GOOGLE_API_KEY>` with the actual API key you have obtained.

### Install Dependencies

While in the backend directory, install the required packages:

```bash
yarn install
```

### Start the Backend Server

Launch the backend server using Yarn:

```bash
yarn run start
```

Ensure the backend server is running properly. By default, it will run on `http://localhost:8000`.

## Frontend Setup

### Navigate to the Frontend

Open a new terminal window and switch to the frontend directory from the root of the project:

```bash
cd frontend
```

### Install Dependencies

Install the necessary frontend packages:

```bash
yarn install
```

### Start the Frontend Server

Start the frontend development server:

```bash
yarn run dev
```

The frontend should now be running on `http://localhost:5173`.

## Access SmartForms

Open your web browser and navigate to `http://localhost:5173` to start using SmartForms.

## Troubleshooting

If you encounter any issues during the installation, please check the following:

- Ensure all environment variables are set correctly.
- Make sure MongoDB is running and accessible.
- Check that your Node.js and Yarn versions meet the prerequisites.

## Further Help

For further help, you can reach out via [GitHub Issues](https://github.com/Subash-Lamichhane/smartforms/issues).

Thank you for using SmartForms!
