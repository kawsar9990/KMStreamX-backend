import type { FastifyInstance } from "fastify";
import "@fastify/websocket";

let onlineCount = 0;
const clients = new Set<any>();

function broadcastCount() {
  const payload = JSON.stringify({ event: "ONLINE_COUNT", count: onlineCount });
  for (const client of clients) {
    if (client.readyState === 1) { 
      client.send(payload);
    }
  }
}

export async function registerVisitorSocket(fastify: FastifyInstance) {
  fastify.get("/ws/live-visitors", { websocket: true }, (connection) => {
    const socket = connection;

    onlineCount++;
    clients.add(socket);
    broadcastCount(); 

    socket.on("close", () => {
      onlineCount = Math.max(0, onlineCount - 1);
      clients.delete(socket);
      broadcastCount(); 
    });
  });
}