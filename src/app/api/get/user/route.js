import { connectDB } from "@/DB/ConnectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function GET(req) {
    connectDB();
    const session = await getServerSession(authOptions);
    const user = await User.findOne({ email: session?.user.email }).populate("cart.watch").populate("orders.watch");
    return Response.json({
        success: true,
        user
    });
}