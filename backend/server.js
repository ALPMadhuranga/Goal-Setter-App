import path from "path";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 8000;

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
}else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));