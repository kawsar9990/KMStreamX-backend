import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { channels } from "./Data/ChannelListData.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main(){
 console.log("🌱 Seeding channels started...");
 
 try{

    for(const channel of channels){
       await prisma.channel.upsert({
        where: 
        { channelLink: channel.channelLink },
        update: {
            name: channel.name,
            category: channel.category,
            image: channel.image || null,
            channelLink: channel.channelLink
        },
        create: {
            name: channel.name,
            category: channel.category,
            image: channel.image || null,
            channelLink: channel.channelLink
        }
       })
    }
    console.log("✅ Seeding completed successfully!");
 }
 catch(error){
    console.error("❌ Error during channel seeding:", error);
    process.exit(1);
 }
 finally{
    await prisma.$disconnect();
 }
}

main();