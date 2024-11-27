import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import config from "./common/config";
import { connectDB } from "./db";
import router from "./routes";
import { routeNotFound } from "./middlewares/route-not-found";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// connecting to MongoDB
connectDB();

// base url
app.use("/api", router);
// fallback route
app.use("*", routeNotFound);

app.listen(config.PORT, () => {
    console.log('Running server on port:', config.PORT);
});
