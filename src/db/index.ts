import mongoose from "mongoose"
import config from "../common/config";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("Database connected");
    } catch (error) {
        console.error(error);
    }
}
