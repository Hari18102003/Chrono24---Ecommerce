import { connectDB } from "@/DB/ConnectDB";
import { Watch } from "@/models/Watch";

export async function GET(req, { params }) {

    const { id } = params;
    connectDB();
    const watch = await Watch.findOne({ _id: id });
    return Response.json({
        success: true,
        watch
    });
}