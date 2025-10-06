## Project Structure and Context for VS Code Gemini (Updated)

This document outlines the structure and key files of the Next.js project for your tutoring website. This updated information provides the necessary context for a large language model like Gemini in VS Code to understand the codebase and assist you effectively.

### Project Overview

The project is a simple, responsive website for a tutoring service, built with Next.js and styled with Tailwind CSS. The primary feature of the page is a chatbot that interacts with the user and can send emails.

### Folder Structure

```
/home/hejustino/tutor
├── .next/                     # Next.js build output
├── node_modules/              # Project dependencies
├── public/                    # Static assets (images, etc.)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── send-email/    # API route for sending emails
│   │   │       └── route.ts
│   │   ├── components/        # Chatbot components
│   │   │   ├── About.tsx      # About section component  
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── DeskAnimation.tsx  # Animated desk SVG component
│   │   │   ├── Footer.tsx     # Footer component
│   │   │   ├── Navbar.tsx     # Navigation bar component
│   │   │   ├── OptionBubble.tsx
│   │   │   ├── Services.tsx   # Services section component
│   │   │   └── TypingIndicator.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css        # Global styles and Tailwind CSS import
│   │   ├── layout.tsx         # Root layout for the application
│   │   └── page.tsx           # The main page component
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

### File Descriptions and Connections

#### `tutor/src/app/globals.css`

*   **Purpose:** This file contains global styles and a non-standard import for Tailwind CSS (`@import "tailwindcss";`). This means the project uses Tailwind's default configuration.
*   **Connection:** It's imported into the `layout.tsx` file, making the Tailwind styles available globally throughout the application.

#### `tutor/src/app/page.tsx`

*   **Purpose:** This is the main entry point for the page. It sets up the main container for the page and renders the `ChatWindow` component.
*   **Connection:** This is the file that will be rendered when a user visits the root URL of your website. It is the starting point of the application's UI.

### Chatbot Feature

The core feature of this application is the chatbot. It is composed of several components that work together to create a conversational experience.

#### `tutor/src/app/components/ChatWindow.tsx`

*   **Purpose:** This is the main component for the chatbot. It manages the state of the conversation, including the messages, user input, and the chatbot's responses. It is fixed to the bottom right of the screen. It also contains the logic to call the `/api/send-email` API route.
*   **Connection:** It is imported and rendered in `page.tsx`. It orchestrates the other chatbot components and interacts with the backend to send emails.

#### `tutor/src/app/components/ChatBubble.tsx`

*   **Purpose:** This component displays a single message in the chat window. It can be styled differently for user messages and chatbot messages.
*   **Connection:** It is used within the `ChatWindow` component to render each message in the conversation history.

#### `tutor/src/app/components/OptionBubble.tsx`

*   **Purpose:** This component displays a set of options for the user to choose from as a response. This is used to guide the conversation.
*   **Connection:** It is used within the `ChatWindow` to present the user with predefined choices.

#### `tutor/src/app/components/TypingIndicator.tsx`

*   **Purpose:** This component displays a typing animation to indicate that the chatbot is preparing a response.
*   **Connection:** It is used within the `ChatWindow` to provide visual feedback to the user.

#### `tutor/src/app/components/Navbar.tsx`

*   **Purpose:** This component provides navigation for the website with a responsive design. It displays a logo on the left and navigation links on the right for desktop, and collapses to a hamburger menu on mobile devices.
*   **Connection:** It is imported and rendered in `page.tsx` as a fixed header component.

#### `tutor/src/app/components/Footer.tsx`

*   **Purpose:** This component provides a simple footer with a grey separator line and copyright information for HJ Data Consulting. It automatically displays the current year.
*   **Connection:** It is imported and rendered in `page.tsx` at the bottom of the page layout.

#### `tutor/src/app/components/DeskAnimation.tsx`

*   **Purpose:** This component displays an animated desk scene with a laptop showing typing code animation and animated coffee steam. It's converted from a CodePen animation and uses SVG with CSS animations and React hooks for the typing effect.
*   **Connection:** It is imported and rendered in the hero section of `page.tsx` above the main heading.

### API Routes and Server-side Logic

#### `tutor/src/app/api/send-email/route.ts`

*   **Purpose:** This is an API route that handles sending emails. It receives a POST request with the service and email address, and then uses Nodemailer to send an email.
*   **Connection:** This route is called by the `ChatWindow.tsx` component when a user requests to be contacted. It represents the server-side logic of the application.

### How It All Connects

1.  A user navigates to your website.
2.  Next.js serves the `src/app/page.tsx` component.
3.  The `page.tsx` component renders the `ChatWindow` component, which is fixed to the bottom right of the screen.
4.  The `ChatWindow` component manages the conversation flow.
5.  When the user provides their email address to be contacted, the `ChatWindow` component sends a POST request to the `/api/send-email` API route.
6.  The API route on the server then uses Nodemailer to send an email with the user's information.
7.  The styles from Tailwind CSS are imported in `globals.css` and applied in the components using utility classes.
