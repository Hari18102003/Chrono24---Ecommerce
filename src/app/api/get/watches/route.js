import { connectDB } from "@/DB/ConnectDB";
import { Watch } from "@/models/Watch";

export async function GET(req) {
    connectDB();
    const watches = await Watch.find().sort({ _id: -1 });
    return Response.json({
        success: true,
        watches,
        length: watches.length
    });
}