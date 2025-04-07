# BusInfo Application

A comprehensive bus management system for companies to manage drivers, vehicles, and trips. This application allows companies to register, manage drivers, assign vehicles, and track trips while providing drivers with a mobile interface to update their status and complete trips.

## Features

- **Company Management**:

  - Company registration and authentication
  - Driver management and assignment
  - Vehicle registration and tracking
  - Trip assignment and monitoring

- **Driver Management**:

  - Driver registration with license photo upload
  - Real-time location updates
  - Trip status updates
  - Driving hours tracking
  - License expiry notifications

- **Vehicle Management**:

  - Vehicle registration
  - Vehicle assignment to drivers
  - Vehicle status tracking

- **Trip Management**:

  - Trip creation and assignment
  - Trip status updates
  - Trip completion tracking

- **Notifications**:
  - Email verification for new accounts
  - License expiry notifications
  - Weekly driver status reports

## Tech Stack

- **Backend**:

  - Node.js with Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - AWS S3 for file storage
  - Nodemailer for email notifications

- **Frontend**:
  - React.js
  - Material UI
  - Axios for API requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- AWS S3 account (for file storage)
- Gmail account (for email notifications)

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
2. Create a database named `businfo` or use MongoDB Atlas

### 4. Configure environment variables

1. Navigate to the backend directory
2. Create a `.env` file with the following variables:

```
# MongoDB Connection
MONGODB_URI="your_mongodb_connection_string"

# JWT Secret
JWT_SECRET="your_jwt_secret_key"

# Email Configuration
EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# AWS S3 Configuration
ACCESS_KEY_ID=your_aws_access_key
SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
BUCKET_NAME=your_bucket_name

# Server Configuration
PORT=3000

# Session Secret
SESSION_SECRET="your_session_secret_key"

# Frontend URL
FRONTEND_URL=http://localhost:5173
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

## API Endpoints

### Company Endpoints

- `POST /api/users/register` - Register a new company
- `POST /api/users/login` - Company login
- `POST /api/users/logout` - Company logout
- `POST /api/users/registerVehicle` - Register a new vehicle
- `GET /api/users/viewDrivers` - View all drivers
- `GET /api/users/viewVehicles` - View all vehicles
- `POST /api/users/trips` - Assign trips to drivers
- `GET /api/users/verify-email` - Verify company email

### Driver Endpoints

- `POST /api/drivers/register` - Register a new driver (with license photo)
- `POST /api/drivers/login` - Driver login
- `POST /api/drivers/logout` - Driver logout
- `GET /api/drivers/trips` - View assigned trips
- `POST /api/drivers/updateTripEndTime` - Update trip end time
- `PATCH /api/drivers/updateDriverLicExp` - Update driver license expiry

## Database Schema

The application uses MongoDB with the following collections:

1. **Company**: Stores company information

   - company_name
   - company_address
   - company_email
   - company_phno
   - paswd (hashed)
   - verification_token
   - email_verified

2. **Driver**: Stores driver information

   - driver_name
   - driver_phno
   - driver_licno
   - driver_address
   - driver_licesp
   - c_id (reference to Company)
   - paswd (hashed)
   - driver_photo (S3 URL)
   - driving_hrs

3. **Vehicle**: Stores vehicle information

   - vehicle_name
   - vehicle_number
   - vehicle_type
   - c_id (reference to Company)
   - d_id (reference to Driver)

4. **Trip**: Stores trip information
   - trip_name
   - trip_starttime
   - trip_endtime
   - trip_startloc
   - trip_endloc
   - c_id (reference to Company)
   - d_id (reference to Driver)
   - v_id (reference to Vehicle)
   - completed

## License

This project is licensed under the ISC License.
