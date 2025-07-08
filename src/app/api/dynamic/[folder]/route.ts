import { getData } from "@/lib/database";

export const GET = async (req: Request, { params }: { params: Promise<{folder: string}> }) => {
    const { folder } = await params;
    const { data, message } = getData(folder);
    if( message === "success" ) {
        if(!data.length) return new Response(JSON.stringify({ message: "Data Kosong!", data: [] }), { status: 200 });
        return new Response(JSON.stringify({ message: "success", data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Unauthorized", data: []}), { status: 404 });
    }
}