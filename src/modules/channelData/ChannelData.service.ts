import { redis } from "../../config/redis.js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const CACHE_KEY = "channel_Data";
const CACHE_TTL = 25200;


export const getChannelDataFromDB = async () => {
   const cachedData = await redis.get(CACHE_KEY);


   if (typeof cachedData === "string") {
    try {
      return JSON.parse(cachedData);
    } catch {
      await redis.del(CACHE_KEY);
    }
  }

    const channelData = await prisma.channel.findMany({
     orderBy: {
      createdAt: "desc",
    },
    });

    await redis.set(CACHE_KEY, JSON.stringify(channelData), {
      ex: CACHE_TTL,
    });

  return channelData;
}
