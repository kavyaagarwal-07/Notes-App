import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import notesRoutes from "./Routes/notesRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", notesRoutes);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log("Server is running at port 3000");
        })
    }
    catch(error) {
        console.log("Server StartUp failed", error.message);
        process.exit(1)
    }
};
startServer();