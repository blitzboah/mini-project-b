import userRoutes from "./routes/user.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import express from "express";
import session from "express-session";
import db from "./database/db.js";
import bodyParser from "body-parser";

db.connect();

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
