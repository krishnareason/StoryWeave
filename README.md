# StoryWeave: An AI-Powered Blogging Platform

StoryWeave is a full-stack web application that redefines the blogging experience by integrating powerful AI writing assistants. Built with a modern tech stack, this platform allows users to seamlessly create, manage, and publish blog posts while leveraging AI to enhance creativity and productivity.

### ✨ Live Demo
* **Frontend (Vercel):** [Link to your deployed frontend]
* **Backend (Render):** [Link to your deployed backend API]

---

## Key Features

-   **🔐 Full Authentication:** Secure user registration and login/logout functionality using JWT.
-   **✍️ Rich Text Editor:** A modern, intuitive TipTap editor for creating beautifully formatted blog posts.
-   **📝 Full CRUD for Blogs:** Users can create, read, update, and delete their own posts.
-   **🤖 AI Writing Assistant:**
    -   **Title Suggestions:** Generate catchy, SEO-friendly titles from your blog content.
    -   **Summary Generation:** Instantly create concise summaries for post previews or meta descriptions.
    -   **SEO Tag Suggestions:** Automatically extract relevant keywords and tags to improve discoverability.
-   **🎨 Medium-Inspired UI:** A clean, minimalist, and content-focused design built with Tailwind CSS.
-   **🌐 Dynamic Routing:** Clean, user-friendly URLs for viewing and editing individual blog posts.

---

## 🛠️ Tech Stack

This project is a monorepo with a separate frontend and backend.

#### Frontend
-   **Framework:** Next.js (React)
-   **Styling:** Tailwind CSS
-   **State Management:** React Context API
-   **Rich Text Editor:** TipTap
-   **API Communication:** Axios

#### Backend
-   **Framework:** Node.js + Express.js
-   **Database:** PostgreSQL
-   **ORM:** Sequelize
-   **Authentication:** JWT (JSON Web Tokens) + bcrypt.js
-   **AI Integration:** OpenRouter API

#### Database & Deployment
-   **Database:** Hosted on any cloud PostgreSQL provider (e.g., Supabase, Railway, Neon).
-   **Backend Hosting:** Render
-   **Frontend Hosting:** Vercel

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or newer)
* npm
* A PostgreSQL database connection string
* An OpenRouter API key

#### API Endpoints

**Authentication (/api/auth)**
* POST /register: Register a new user.
* POST /login: Log in a user.

**Blogs (/api/blogs)**
* POST /: Create a new blog post (Protected).
* GET /: Get all blog posts.
* GET /:id: Get a single blog post by ID.
* PUT /:id: Update a blog post (Protected, Author only).
* DELETE /:id: Delete a blog post (Protected, Author only).

**AI Helpers (/api/ai)**
* POST /suggest-title: Generate title suggestions (Protected).
* POST /summarize: Generate a summary (Protected).
* POST /seo-tags: Generate SEO tags (Protected).


### Clone the repository
```bash
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name

## 🛠️ Backend Setup

1. Navigate to the server directory and install dependencies:

```bash
cd server
npm install

2. Create a .env file in the server directory and add your environment variables:

DATABASE_URL="your_postgresql_connection_string"
PORT=5001
JWT_SECRET="your_jwt_super_secret"
OPENAI_API_KEY="your_openrouter_api_key"

3. Start the backend server:

npm run dev
The backend will be running on http://localhost:5001 .

## Frontend Setup

1. Open a new terminal, navigate into the client directory, and install the dependencies.

cd client
npm install

2. Start the frontend development server:

npm run dev
The frontend will be running on http://localhost:3000.
```bash




