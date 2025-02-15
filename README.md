# WhatsChat

A real-time chat application built with Next.js, Socket.io, and Strapi.

## Live Demo

Check out the live demo: [WhatsChat Live Demo](https://chat-app-fwfv.vercel.app/)

## Overview

WhatsChat is a modern web-based chat application that allows users to register, login, and exchange messages in real-time. The application features a clean, responsive UI inspired by popular messaging apps.

## Features

- User authentication (sign up and login)
- Real-time messaging
- Message persistence
- Responsive design
- Date grouping for messages
- Animated UI elements

## Tech Stack

- **Frontend**:
  - Next.js (React framework)
  - Socket.io-client (for real-time communication)
  - Zustand (state management)
  - Framer Motion (animations)
  - Tailwind CSS (styling)
  - Lucide React (icons)
  - Date-fns (date formatting)

- **Backend**:
  - Strapi (headless CMS for authentication)
  - Socket.io (for real-time server)

## Project Structure

The main components of the application are:

- `AuthForm.tsx`: Handles user registration and login
- `ChatContainer.tsx`: Main container for the chat interface
- `ChatInput.tsx`: Input field for sending messages
- `ChatMessage.tsx`: Individual message component
- `Header.tsx`: App header with user info and logout functionality
- `socket.ts`: Socket.io configuration
- `useStore.ts`: Zustand store for state management

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Strapi instance running (for authentication)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication Flow

1. User registers or logs in through the AuthForm
2. Credentials are sent to Strapi's authentication endpoints
3. On successful authentication, user data is stored in the Zustand store
4. Socket connection is established
5. User can start sending and receiving messages

## Messaging Flow

1. User types a message in ChatInput
2. Message is sent to the server via Socket.io
3. Server broadcasts the message to all connected clients
4. Clients receive the message and update their state
5. Message is displayed in the chat interface

## State Management

The application uses Zustand for state management with persistence to localStorage. The store manages:

- User data
- Messages
- Hydration state (to prevent UI flickering on reload)

## Styling

The application uses Tailwind CSS with a custom color scheme inspired by popular messaging apps. The UI is responsive and works well on mobile devices.

## Future Improvements

- Add message delivery status (sent, delivered, read)
- Implement typing indicators
- Add support for media messages (images, videos)
- Add group chat functionality
- Implement message search
- Add message reactions
