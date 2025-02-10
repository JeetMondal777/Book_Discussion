#  My Library - A Book Discussion Platform

## Overview
The **Book Discussion** project is a real-time platform for book lovers to discuss, share opinions, and engage in meaningful conversations about books. This application uses the MERN stack along with Socket.io to enable live chats, profile management, and book uploads. Users can create profiles, upload books, and participate in real-time discussions within a dynamic and interactive environment.

## Technologies Used
- **Frontend:**
  - React
  - Tailwind CSS
  - Socket.io
  - Cloudinary for profile image uploads

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT for authentication
  - Socket.io for real-time messaging

## Features
### User Features:
- **Sign up/Login/Logout:** Secure authentication using JWT and bcrypt.
- **Dashboard:** A personalized dashboard to manage user details and book discussions.
- **Book Upload:** Users can upload books and share them with the community.
- **Real-Time Book Discussions:** Chat with other users in real-time through the book discussion room.
- **Profile Management:** Create and update user profiles, including uploading profile images.

### Real-Time Features:
- **Real-Time Chat:** Engage in live discussions about books using Socket.io.
- **Notifications:** Get real-time notifications on new messages, book uploads, and replies.

## Project Structure

### Frontend
- **App.jsx:** Main component that holds all routes for the application.
- **LoginUser.jsx:** Handles user login and authentication.
- **SignUpUser.jsx:** Handles user registration and account creation.
- **LogOutUser.jsx:** Logs out the user and ends the session.
- **Dashboard.jsx:** Displays the user's personal dashboard, book uploads, and discussions.
- **UploadBook.jsx:** Allows users to upload books with relevant details.
- **Nav.jsx:** Navigation bar for easy navigation between pages.
- **BookCard.jsx:** Displays individual books available for discussion.
- **FullBookPage.jsx:** Detailed view of an individual book with an option to discuss.
- **NotProfileCard.jsx:** Displays non-profile related cards for user interaction.
- **ProfileCard.jsx:** Displays user profile details and allows editing.
- **BookDiscussion.jsx:** A real-time discussion room for users to chat about the book.
- **ProfilePanel.jsx:** Manages user profile settings and details.

### Backend
- **server.js:** Main entry point for the backend server, sets up Express and connects to MongoDB.
- **app.js:** Defines the backend routes and middleware configuration.
- **cloudinary.js:** Handles image uploads to Cloudinary.
- **db.js:** Connects to MongoDB using Mongoose.
- **models/user.model.js:** Defines the user schema and related methods.
- **models/book.model.js:** Defines the book schema and related methods.
- **models/message.model.js:** Manages message schema and interactions.
- **models/chat.model.js:** Manages chat schema and real-time communication.
- **routes/user.routes.js:** Contains user-related routes like sign-up, login, and profile management.
- **routes/book.routes.js:** Contains routes for book uploading and fetching.
- **controllers/user.controller.js:** Handles user-related logic for authentication and profile management.
- **controllers/book.controller.js:** Manages book uploading and retrieval logic.
- **controllers/message.controller.js:** Manages message interactions.
- **controllers/chat.controller.js:** Manages chat and real-time message broadcasting using Socket.io.

## Installation

### Prerequisites
- Node.js (v16 or above)
- MongoDB (running locally or a cloud-based MongoDB service)
- Cloudinary account (for profile image uploads)

### Steps to Set Up the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/book-discussion.git
