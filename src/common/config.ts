process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || "5000";

export default {
    NODE_ENV: process.env.NODE_ENV as string,

    PORT: parseInt(process.env.PORT, 10),

    DB_URL: process.env.DB_URL as string,
}
