import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyWebsocket from "@fastify/websocket";
import { registerVisitorSocket } from "./Websocket/visitor.socket.js";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";

dotenv.config();

const app = Fastify({
    logger: false,
});

await app.register(fastifyCors, {
    origin: true,
    credentials: true,
});

await app.register(fastifyWebsocket);
await app.register(registerVisitorSocket);

await app.register(router, { prefix: "/api" });

app.get("/", async()=> {
    return{
        success: true,
        message: "API Running.."
    }
});

export default app;