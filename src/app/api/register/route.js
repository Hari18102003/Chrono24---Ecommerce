import { connectDB } from "@/DB/ConnectDB";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    connectDB();
    const { email, password } = await req.json();
    if (!email || !password) {
        return Response.json({
            success: false,
            message: "Enter all fields"
        });
    }
    if (password.length < 4) {
        return Response.json({
            success: false,
            message: "Password should be minimum 4 characters"
        });
    }
    const user = await User.findOne({ email });
    if (user) {
        return Response.json({
            success: false,
            message: "Email already exist!"
        });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ email, password: hashedPassword });
    return Response.json({
        success: true,
        message: "Account Created!"
    });
}