import type { FastifyInstance } from "fastify";
import { channelDataRoutes } from "../modules/channelData/ChannelData.routes.js";

export async function router(fastify: FastifyInstance){

fastify.register(channelDataRoutes, { prefix: "/channel-data" });
}