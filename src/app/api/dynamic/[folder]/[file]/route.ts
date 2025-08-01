import { deleteData, getData } from "@/lib/database";

export const GET = async (req: Request, { params }: { params: Promise<{folder: string, file: string}> }) => {
    const { folder, file } = await params;
    const { data, message } = getData(`${folder}:${file}`);
    if( message === "success" ) {
        return new Response(JSON.stringify({ message: "success", data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Unauthorized", data: []}), { status: 404 });
    }
}

export const DELETE = async (req: Request, { params }: { params: Promise<{folder: string, file: string}> }) => {
    const { folder, file } = await params;
    const { message } = deleteData(`${folder}:${file}`);
    if( message === "success" ) {
        return new Response(JSON.stringify({ message: "success" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 404 });
    }
}