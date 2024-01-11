import { connectDB } from "@/DB/ConnectDB";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req) {
    connectDB();
    const session = await getServerSession(authOptions);
    const { id } = await req.json();
    await User.findOneAndUpdate({ email: session?.user.email }, { $pull: { cart: { watch: id } } });
    return Response.json({
        success: true,
        message: "Item removed!"
    });
}