import dotenv from "dotenv";

dotenv.config();

const myenv = {
 API_KEY: process.env.API_KEY || "",
 API_SECRET_KEY: process.env.API_SECRET_KEY || "",
};

export default myenv;
