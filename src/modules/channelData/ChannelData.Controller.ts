import type { FastifyRequest, FastifyReply } from "fastify";
import { getChannelDataFromDB } from "./ChannelData.service.js";


export const getChannelData = async (req: FastifyRequest, res: FastifyReply) => {
try{
const data = await getChannelDataFromDB();

return res.code(200).send({
  success: true,
  message: "Channel data fetched successfully",
  data,  
})
}
catch(error){
req.log.error(error);

return res.code(500).send({
  success: false,
  message: "Internal Server Error",
  error: error instanceof Error ? error.message : "Unknown error",
});
}
}