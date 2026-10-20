# ChatGPT Clone

An AI-powered conversational web application inspired by ChatGPT, built with a full-stack architecture and Google's Gemini API.

## Features

- **AI Conversations:** Chat with an AI assistant powered by Google Gemini.
- **Conversation Management:** Create and maintain conversations.
- **Persistent Storage:** Store conversation data in a MySQL database.
- **Full-Stack Architecture:** React frontend and Node.js/Express backend.
- **Responsive Interface:** Interact with the assistant through a chat-based interface.

## Tech Stack

**Frontend**
- React
- JavaScript
- HTML and CSS

**Backend**
- Node.js
- Express.js
- Google GenAI SDK

**Database**
- MySQL

## Getting Started

### Prerequisites

- Node.js and npm
- MySQL
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/Hawi-net/ChatGPT-Clone.git
cd ChatGPT-Clone
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file using the environment variable names required by your backend configuration. Add your Gemini API key and database settings.

**Never commit your `.env` file or expose your API key.**

### 3. Start the backend

```bash
npm run dev
```

### 4. Start the frontend

Open another terminal, navigate to the frontend directory, install dependencies, and run the development command defined in its `package.json`.

## Project Structure

```text
ChatGPT-Clone/
├── backend/
│   └── src/
│       └── api/
│           └── chat/
├── frontend/
└── README.md
```

## What I Learned

- Building full-stack applications
- Connecting a React frontend to a Node.js backend
- Integrating a generative AI API
- Managing conversation data with MySQL
- Debugging API and server errors

## Future Improvements

- Improve conversation history and management
- Add streaming AI responses
- Improve error handling and loading states
- Enhance the user interface and accessibility

## Author

**Hawinet Zewde**

- GitHub: [@Hawi-net](https://github.com/Hawi-net)

## Disclaimer

This is an independent project inspired by ChatGPT. It is not an official OpenAI product.
