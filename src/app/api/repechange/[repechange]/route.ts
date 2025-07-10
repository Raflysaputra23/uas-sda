import { getData } from "@/lib/database";


export const GET = async (req: Request, {
    params
}: {params: Promise<{repechange: string}>}) => {
    const { repechange } = await params;
    const { message, data } = await getData(`Repechange:${repechange}`);
    if(message === "success") {
        if(data.length !== 0) {
            return new Response(JSON.stringify({ message: "success", data }), { 
                status: 200
            });
        } else {
            return new Response(JSON.stringify({ message: "Data not found", data: [] }), { 
                status: 404
            });
        }
    } else {
        return new Response(JSON.stringify({ message: "Unauthorized", data: [] }), {
            status: 404
        })
    }
}