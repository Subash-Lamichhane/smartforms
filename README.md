# SmartForms

<p align="center">
    <a href="https://github.com/Subash-Lamichhane/smartforms" target="blank">
        <img src="https://img.shields.io/github/watchers/Subash-Lamichhane/smartforms?style=for-the-badge&logo=appveyor" alt="Watchers"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/smartforms/fork" target="blank">
        <img src="https://img.shields.io/github/forks/Subash-Lamichhane/smartforms?style=for-the-badge&logo=appveyor" alt="Forks"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/smartforms/stargazers" target="blank">
        <img src="https://img.shields.io/github/stars/Subash-Lamichhane/smartforms?style=for-the-badge&logo=appveyor" alt="Stars"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/smartforms/issues" target="blank">
        <img src="https://img.shields.io/github/issues/Subash-Lamichhane/smartforms?style=for-the-badge&logo=appveyor" alt="Issues"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/smartforms/pulls" target="blank">
        <img src="https://img.shields.io/github/issues-pr/Subash-Lamichhane/smartforms?style=for-the-badge&logo=appveyor" alt="Open Pull Requests"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/smartforms/blob/master/LICENSE" target="blank">
        <img src="https://img.shields.io/github/license/Subash-Lamichhane/smartforms?style=for-the-badge&logo=appveyor" alt="License"/>
    </a>
</p>

## Overview

SmartForms is a modern form builder that simplifies the process of creating and managing interactive forms. Integrated with CopilotKit AI, it streamlines question generation and provides a dynamic response handling experience.

## Key Features

- **AI-Powered Question Generation:** Automatically generate multiple-choice questions using CopilotKit.
- **Interactive Response Handling:** Sort and manage responses effectively with enhanced AI tools.
- **Shareable Forms:** Easily share forms via generated links, allowing for quick and broad distribution.

## Demo

Watch a full demo of SmartForms here: [SmartForms Demo](#)

## Installation

For installation instructions, please refer to the `INSTALLATION.md` file. Click [here](./INSTALLATION.md) to navigate to it.

## Usage

Get started by following these steps to set up both the frontend and backend for SmartForms.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn run dev
   ```
   After starting the server, navigate to `http://localhost:3000` to create and manage your forms.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file in the root of the backend directory and add the following keys:
   ```
   GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
   MONGO_URI=mongodb://localhost:27017/quizApp
   ```
   Replace `<YOUR_GOOGLE_API_KEY>` with your actual Google API key.
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Start the backend server:
   ```bash
   yarn run dev
   ```

Both servers need to be running concurrently for the application to function fully.

## Screenshots

<details>
  <summary>Click to view screenshots of SmartForms Interface</summary>

![Creating Smart Form with Copilotkit](https://github.com/user-attachments/assets/1cbe8a88-a0f0-4345-8079-d62959918796)
_Creating a Smart Form using CopilotKit: A step-by-step form building interface._

![Landing Page](https://github.com/user-attachments/assets/487eeb9b-9d1a-447e-9e55-43dac3c5a3c9)
_Landing Page: The initial view of SmartForms, welcoming users._

![Smart Form Responses](https://github.com/user-attachments/assets/c5203f95-c08e-4653-b9f4-d8179c70f527)
_Smart Form Responses: Viewing responses from users who have submitted forms._

![SmartForm Created Successfully](https://github.com/user-attachments/assets/8cc8a59a-a40c-4cb3-8752-afe5ae97a531)
_SmartForm Created Successfully: Confirmation screen after successfully creating a form._

![User Taking Smart Form](https://github.com/user-attachments/assets/cc00c893-4d84-45b2-8792-f56c850cd7b5)
_User Taking Smart Form: A user interacts with a form, showcasing the user-friendly interface._

</details>

## Contributing

We welcome contributions! To contribute to SmartForms, please refer to the `CONTRIBUTING.md` file.

## License

This project is licensed under the [MIT License](LICENSE).

---

**_This project was created for Quira Quest 20: Hacktober Preptember_**

To explore Quira, visit: [https://quira.sh/](https://quira.sh/?utm_source=susheel)

### Support Me! 🌟

- **Vote for me on Quira**: [Vote here!]()
- **Star my GitHub repo** to show your support!
