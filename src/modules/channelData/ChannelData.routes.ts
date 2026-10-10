import type { FastifyInstance } from "fastify";
import { getChannelData } from "./ChannelData.Controller.js";


export const channelDataRoutes = (fastify: FastifyInstance) => {
    const router = fastify;
  
    router.get("/", getChannelData);
};
