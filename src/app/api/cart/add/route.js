import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/models/User";
import { connectDB } from "@/DB/ConnectDB";

export async function PUT(req) {
    connectDB();
    const { id, quantity } = await req.json();
    const session = await getServerSession(authOptions);
    const checkUser = await User.findOne({ email: session?.user.email, 'cart': { $elemMatch: { watch: id } } });
    if (checkUser) {
        return Response.json({
            success: true,
            message: "Already Added!",
        });
    }
    const user = await User.findOneAndUpdate({ email: session?.user.email }, { $push: { cart: { $each: [{ watch: id, quantity: quantity }] } } }, { new: true }).populate("cart.watch").populate("orders.watch");
    return Response.json({
        success: true,
        message: "Added to Cart!",
        user
    });
}