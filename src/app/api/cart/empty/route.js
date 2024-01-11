import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/DB/ConnectDB";
import { User } from "@/models/User";

export async function PUT(req) {
    const session = await getServerSession(authOptions);
    connectDB();
    const userEmail = session?.user.email;
    const user = await User.findOne({ email: userEmail });
    await User.findOneAndUpdate({ email: userEmail }, { $push: { orders: user.cart } });
    await User.findOneAndUpdate({ email: userEmail }, { $set: { cart: [] } });
    return Response.json({
        success: true,
        message: "Order Placed!"
    });
}