StoreReview

A full-stack store rating and review platform with role-based
authentication and authorization for Administrators, Normal Users, and
Store Owners.

🌐 Live Demo

Frontend:
https://store-review-git-main-abhishek-kumars-projects-be24d7f0.vercel.app/

Backend API: https://storereview-ok91.onrender.com/

📌 Overview

StoreReview is a role-based web application for managing stores, users,
store owners, and customer ratings from a centralized platform.

Roles

ADMIN --- manages users, administrators, store owners, and
stores.

USER --- browses stores, searches stores, submits ratings, and
updates ratings.

STORE_OWNER --- monitors store ratings, customer rating records,
and average rating.

✨ Features

🔐 Authentication & Authorization

JWT-based authentication

Role-based authorization

Protected routes

Backend authorization middleware

Login and registration

Logout

Change password

Unauthorized access handling

👤 Normal User

View all stores

Search by store name and address

View overall store rating

Submit a 1--5 rating

Update an existing rating

View personal submitted rating

Sort store data

Change password

Logout

👨‍💼 Administrator

Dashboard statistics

Total users, stores, and ratings

Create users

Create administrators

Create store owners

Create stores

Assign stores to store owners

Search users by name, email, and address

Filter users by role

View individual user details

Search and sort stores

Sort user data

Change password

Logout

🏪 Store Owner

View assigned store information

View average rating

View total ratings

View customers who rated the store

View customer name, email, address, rating, and submission date

Sort customer ratings

Change password

Logout

🎨 UI / UX

Responsive design

Mobile-friendly layouts

Clean dashboard interfaces

Table-based data presentation

Loading states

Empty states

Error handling

Rating modal

Password management modal

Search and filter controls

🛠️ Tech Stack

Frontend

React.js

React Router DOM

Tailwind CSS

Vite

Axios

JavaScript (ES6+)

Backend

Node.js

Express.js

Sequelize ORM

JWT

bcrypt

dotenv

CORS

Database

MySQL

Deployment

Vercel --- Frontend

Render --- Backend

Aiven --- Cloud MySQL Database

🏗️ Project Structure

StoreReview/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── services/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── App.jsx
│   └── vite.config.js
├── docs/
├── .gitignore
└── README.md

🔄 Application Flow

Register
   ↓
Normal USER
   ↓
Login
   ├── ADMIN → Admin Dashboard
   ├── USER → User Dashboard
   └── STORE_OWNER → Owner Dashboard

Admin can create:

ADMIN
 ├── User
 ├── Admin
 ├── Store Owner
 └── Store

User rating flow:

USER
 ↓
View Store
 ↓
Submit Rating (1–5)
 ↓
Store Owner sees Rating
 ↓
Average Rating Updated

🔒 Security

Passwords are securely hashed on the backend.

JWT tokens authenticate API requests.

Frontend routes are protected by role.

Backend routes enforce authentication and authorization.

Public registration creates a normal user account and does not allow
self-assignment of privileged roles.

Environment files and database backups are excluded from version
control.

✅ Validation

The application follows the assignment validation requirements:

Field      Requirement

Name       20--60 characters
Address    Maximum 400 characters
Password   8--16 characters
Password   Must include uppercase letter and special character
Email      Standard email validation
Rating     1--5

🚀 Getting Started

Prerequisites

Node.js

npm

MySQL

Clone

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd StoreReview

Backend

cd backend
npm install

Create backend/.env:

PORT=5000
DB_NAME=your_database
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your_jwt_secret

Run:

npm start

Development:

npm run dev

Frontend

cd frontend
npm install

Create frontend/.env:

VITE_API_URL=http://localhost:5000/api/v1

Run:

npm run dev

🌍 Production

Production frontend configuration:

VITE_API_URL=https://storereview-ok91.onrender.com/api/v1

Architecture:

Vercel Frontend
      ↓
Render Backend
      ↓
Aiven MySQL

📡 API Overview

Authentication

POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout

User

GET  /api/v1/user/stores
POST /api/v1/user/ratings
PUT  /api/v1/user/ratings/:id
PUT  /api/v1/user/password

Admin

GET  /api/v1/admin/dashboard
POST /api/v1/admin/users
POST /api/v1/admin/admins
POST /api/v1/admin/store-owners
POST /api/v1/admin/stores
GET  /api/v1/admin/users
GET  /api/v1/admin/users/:id
GET  /api/v1/admin/stores

🧪 Testing

The deployed application has been tested across all three roles:

Admin login and dashboard access

Normal user login and dashboard access

Store owner login and dashboard access

Role-based route protection

Store creation

Rating submission and update

Search and filtering

Table sorting

Password update

Logout

Production frontend-to-backend communication

📱 Responsive Design

The UI is designed for desktop, laptop, tablet, and mobile screens. Data
tables use horizontal scrolling where required on smaller screens.

🔮 Future Improvements

Pagination

Advanced analytics and charts

Email notifications

Store categories

Review comments

Profile management

Audit logs

Automated tests

CI/CD pipeline

Swagger/OpenAPI documentation

👨‍💻 Author

Abhishek Kumar

B.Tech Computer Science --- Artificial Intelligence & Machine Learning

🔗 Links

Live Application:
https://store-review-git-main-abhishek-kumars-projects-be24d7f0.vercel.app/

Backend API: https://storereview-ok91.onrender.com/

📄 License

Developed for portfolio and full-stack coding-assignment purposes.