import "./config/env.js";
import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 8000;
// Create HTTP server from express app
const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("BACKEND RUNNING ON PORT", PORT);
    });
  })
  .catch((error) => {
    console.log("MONGO_DB CONNECTION ERROR:- ", error?.message);
  });