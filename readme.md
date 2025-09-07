# 🌐 Streamify

<p align="center">
  <img src="https://github.com/user-attachments/assets/af939687-0fec-431d-85cf-1e62cc94f645" alt="Streamify_logo" width="400" height="400">
</p>


A modern **language exchange platform** enabling real-time communication, video calls, and global collaboration — built with scalable technologies for a seamless user experience.

---

## 🚀 **Highlights**

- 🌐 **Real-time Messaging**  
  With typing indicators and reaction emojis for interactive conversations.

- 📹 **1-on-1 & Group Video Calls**  
  Including screen sharing and video recording for effective collaboration.

- 🔐 **JWT Authentication & Protected Routes**  
  Secure and private interactions across the platform.

- 🌍 **Language Exchange Platform**  
  Connect with users worldwide with **32 unique UI themes** tailored for personalization.

- ⚡ **Tech Stack**  
  Built with **React, Express, MongoDB, TailwindCSS, and TanStack Query** for robust, scalable performance.

- 🧠 **Global State Management**  
  Managed with **Zustand** for smooth and efficient state handling.

- 🚨 **Error Handling**  
  Comprehensive error management on both frontend and backend.

- 🚀 **Free Deployment**  
  Ready to deploy with zero-cost hosting options.

- 🎯 **Scalable Architecture**  
  Powered by **Stream** API for seamless communication and connectivity.

- ⏳ **And much more!**

---

## ⚙ **Setup Instructions**

### ✅ Backend (`/backend`)

1. Create a `.env` file by copying the example file:

    ```bash
    cd backend
    ```

2. Edit the `.env` file and add the following environment variables:

    ```env
    MONGO_URL=your_mongodb_connection_string
    STREAM_API_KEY=your_stream_api_key
    STREAM_API_SECRET=your_stream_api_secret
    JWT_SECRET=your_jwt_secret
    ```

**Descriptions:**

- `MONGO_URL`: The connection string for your MongoDB database.
- `STREAM_API_KEY`: Stream API key for messaging and video functionalities.
- `STREAM_API_SECRET`: Stream API secret key used for authentication.
- `JWT_SECRET`: Secret key for signing and verifying JWT tokens.

---

### ✅ Frontend (`/frontend`)

1. Create a `.env` file by copying the example file:

    ```bash
    cd frontend
    ```

2. Edit the `.env` file and add the following environment variable:

    ```env
    VITE_STREAM_API_KEY=your_stream_api_key
    ```

**Description:**

- `VITE_STREAM_API_KEY`: Public Stream API key for frontend integration.

---

### ⚠ Important Notes

- Keep all `.env` files private and do not commit them to public repositories.
- For production deployments, configure environment variables in your hosting provider’s dashboard.
- The frontend environment variable must start with `VITE_` to be recognized by Vite.

## ▶ How to Run

### ✅ Install Dependencies

Run the following commands to install dependencies for both backend and frontend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## ✅ Running the Application Locally

Start both servers using the commands below:

```bash
# Start the backend server
cd backend
npm run dev

# Start the frontend server
cd ../frontend
npm run dev
```
