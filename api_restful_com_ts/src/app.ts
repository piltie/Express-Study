import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
import config from "config"
import db from "../config/db"

const app = express();
// JSON middleware
app.use(express.json());

// Routes
import router from "./router"
app.use("/api/", router)

// App port
const port = config.get<number>("port");
app.listen(port, async () => {
  await db();
  console.log(`Listening on port ${port}.`);
});