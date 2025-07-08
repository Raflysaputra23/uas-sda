/* eslint-disable @typescript-eslint/no-unused-vars */
import { getData } from "@/lib/database";


export const GET = async (req: Request) => {
    const { message, data } = await getData("Repechange");
    if(message === "success") {
        return new Response(JSON.stringify({ message: "success", data }), { 
            status: 200
        })
    } else {
        return new Response(JSON.stringify({ message: "Unauthorized", data: [] }), {
            status: 404
        })
    }
}