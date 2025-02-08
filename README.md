# TechHMD - Backend

🚀 **TechHMD Backend** is a RESTful API built with **Express.js** and **MongoDB** to power the digital agency platform. It provides endpoints for managing services, users, and inquiries.

## 🛠 Features
- ✅ **User Authentication** - Secure login & registration using JWT
- ✅ **Service Management** - CRUD operations for agency services
- ✅ **Contact Form API** - Handle client inquiries via API
- ✅ **SEO & Analytics** - Store and retrieve SEO insights
- ✅ **Scalable Architecture** - Built with Express.js & MongoDB

## 💻 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Hosting:** AWS

## 🚀 Installation & Setup

### Clone the repository:
```bash
git clone https://github.com/yourusername/techhmd-backend.git
cd techhmd-backend
```

### Install dependencies:
```bash
npm install
```

### Set up environment variables:
Create a `.env` file in the root directory and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Start the server:
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📄 API Endpoints

### Auth Routes
- `POST /api/auth/register` → User Registration
- `POST /api/auth/login` → User Login

### Services Routes
- `GET /api/services` → Get all services
- `POST /api/services` → Add a new service

### Contact Routes
- `POST /api/contact` → Submit inquiry

## 📄 License
This project is licensed under the **MIT License**.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

## 📞 Contact
For inquiries, reach out at **jamshedlinkedin@gmail.com**

⭐ **Star this repo if you find it useful!** 🚀

