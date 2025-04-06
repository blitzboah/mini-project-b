import userRoutes from "./routes/user.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import defaultRoutes from "./routes/default.routes.js";
import express from "express";
import session from "express-session";
import connectToDb from "./database/db.js";
import bodyParser from "body-parser";
import cron from "node-cron";
import { resetDrivingHours, sendDriverStatus } from "./controller/driver.controller.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Connect to MongoDB
connectToDb();

const port = 3000;
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

cron.schedule('06 21 * * 5', sendDriverStatus);
cron.schedule('42 1 * * 0', resetDrivingHours);
app.use("/", defaultRoutes);
app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
