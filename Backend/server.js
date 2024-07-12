import express from 'express';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRoutes from "./routes/userRoutes.js";
// import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import connectDB from "./Database connection/mongoConnect.js";
dotenv.config();

const PORT = process.env.PORT || 8000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());



app.use("/api/auth", userRoutes);
app.use('/api/posts', postRoutes);

app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`listening on port ${PORT}`);
});
