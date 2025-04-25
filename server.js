//

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DBPassword
);

mongoose
  .connect(DB, {})
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`connected to http://127.0.0.1:${port}`)
);
