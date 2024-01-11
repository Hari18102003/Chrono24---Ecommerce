import { connectDB } from "@/DB/ConnectDB";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                connectDB();
                const user = await User.findOne({ email });
                if (user) {
                    const match = bcrypt.compareSync(password, user.password);
                    if (match) {
                        return user;
                    }
                }
                throw new Error("Invalid Credentials");
            }
        })
    ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }