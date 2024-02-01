import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler)

app.use('/api/goals', goalRoutes)

app.listen(port, () => console.log(`Server started on port ${port}`));
