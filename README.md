# BusInfo Application

A bus management system for companies to manage drivers, vehicles, and trips.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd mini-project-b
```

### 2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend/busInfo_frontend
npm install
```

### 3. Set up MongoDB

1. Make sure MongoDB is installed and running on your system
2. Create a database named `businfo`

### 4. Configure environment variables

1. Navigate to the backend directory
2. Create a `.env` file with the following variables:

```
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/businfo

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Email Configuration
EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# AWS S3 Configuration
ACCESS_KEY_ID=your_aws_access_key
SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
BUCKET_NAME=your_bucket_name
```

### 5. Start the application

```bash
# Start the backend server
cd backend
npm start

# Start the frontend development server
cd ../frontend/busInfo_frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Features

- Company registration and authentication
- Driver registration and management
- Vehicle registration and tracking
- Trip assignment and completion
- License expiry notifications
- Weekly driver status reports

## Database Schema

The application uses MongoDB with the following collections:

1. **Company**: Stores company information
2. **Driver**: Stores driver information
3. **Vehicle**: Stores vehicle information
4. **Trip**: Stores trip information

## License

This project is licensed under the ISC License.
