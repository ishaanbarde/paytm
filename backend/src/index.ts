import express from "express";
import { connectDB } from "./database/data-source.js";

const app = express();

// Connect to db
await connectDB()