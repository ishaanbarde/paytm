import express from "express";
import { connectDB } from "./database/data-source.js";
import routes from "./routes.js";
import cors from "cors";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port: ${process.env.SERVER_PORT}`);
});
