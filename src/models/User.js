import mongoose, { models } from "mongoose";
import { Watch } from "./Watch";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        watch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Watch'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    orders: [{
        watch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Watch'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, { timestamps: true });

export const User = models?.User || mongoose.model("User", userSchema);