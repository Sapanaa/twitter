# 🐦 Twitter Clone

A full-stack Twitter Clone application built with **React** for the frontend and **Node.js/Express** for the backend. This project replicates the core features of Twitter, such as user authentication, post creation, notifications, and media handling using **Cloudinary**.

## 🚀 Features

### Frontend (React):
- 🔐 **User Authentication**: Login, Register, and Logout functionality using JWT tokens.
- 📰 **Post Feed**: View, create, update, and delete posts.
- 🔔 **Notifications**: Real-time notifications for likes and follows.
- 📱 **Responsive Design**: Mobile-first design using TailwindCSS.
- 🌐 **Cloudinary Integration**: Upload and manage images for posts.

### Backend (Node.js/Express):
- 🔐 **User Authentication**: Secure authentication with JWT tokens.
- 📝 **Post Management**: Create, update, and delete posts with optional images.
- 🔔 **Notifications**: Notifications for user interactions like follows, likes, etc.
- 🖼️ **Cloudinary**: Upload and manage media files.
- 🗄️ **MongoDB Integration**: Store user data, posts, and notifications.

---

## 🧰 Tech Stack

### Frontend:
- ⚛️ **React**: JavaScript library for building the user interface.
- ⚡ **Vite**: Development server and bundler.
- 🖌️ **TailwindCSS**: Utility-first CSS framework for styling.
- 🌐 **Cloudinary**: Cloud-based media management platform for uploading images.
- 🛣️ **React Router**: Routing library for single-page applications.

### Backend:
- 🟩 **Node.js**: JavaScript runtime for the server-side application.
- 🚀 **Express.js**: Web framework for Node.js to build RESTful APIs.
- 🗄️ **MongoDB**: NoSQL database for storing user and post data.
- 🌐 **Cloudinary**: Cloud service to manage image uploads.
- 🧳 **JWT**: JSON Web Tokens for authentication.
- 🔑 **bcryptjs**: Password hashing for security.
- 🛠️ **dotenv**: Loads environment variables for secure configuration.
- 🍪 **cookie-parser**: Middleware for parsing cookies.
- 🌍 **cors**: Middleware to handle cross-origin requests.

---

## 📦 Installation

### 1. **Clone the repository:**

```bash
git clone https://github.com/Sapanaa/twitter.git
cd twitter
```


## 🚀 API Endpoints

### Authentication Routes:

- **POST** `/api/auth/register`: Register a new user
  - **Request body**: 
    ```json
    {
      "username": "example",
      "email": "example@example.com",
      "password": "yourpassword"
    }
    ```

- **POST** `/api/auth/login`: Login with email and password
  - **Request body**:
    ```json
    {
      "email": "example@example.com",
      "password": "yourpassword"
    }
    ```

- **POST** `/api/auth/logout`: Logout the current user

### User Routes:

- **GET** `/api/users/me`: Get the currently logged-in user's details

- **PUT** `/api/users/update`: Update user information (e.g., profile picture, bio)
  - **Request body**:
    ```json
    {
      "bio": "New bio",
      "profilePicture": "new-profile-pic-url"
    }
    ```

### Post Routes:

- **POST** `/api/posts/create`: Create a new post
  - **Request body**:
    ```json
    {
      "text": "This is a new post",
      "imageUrl": "optional-image-url"
    }
    ```

- **GET** `/api/posts`: Get all posts

- **GET** `/api/posts/:id`: Get a specific post by ID

- **PUT** `/api/posts/:id`: Update a specific post
  - **Request body**:
    ```json
    {
      "text": "Updated text",
      "imageUrl": "updated-image-url"
    }
    ```

- **DELETE** `/api/posts/:id`: Delete a specific post

### Notification Routes:

- **GET** `/api/notifications`: Get notifications for the logged-in user

### 📱 Responsiveness
This application is fully responsive and works seamlessly on a wide range of devices including:

**Desktop**

**Tablets**

**Smartphones (both iOS and Android)**

The app's design adapts automatically to different screen sizes, providing an optimal user experience across all device

## ✨ Screenshots

Here are some screenshots from the project:
**Login page**
![Alt text](/ss/login.png)
