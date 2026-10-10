import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;


const start = async () => {
    try{
        await app.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    }
    catch(err){
       app.log.error(err);
       process.exit(1);
    }
}

start();