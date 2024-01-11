import mongoose, { models } from "mongoose";
const watchSchema = new mongoose.Schema({
    name: {
        type: String
    },
    gender: {
        type: String
    },
    price: {
        type: String
    },
    image: {
        type: String
    }
}, { timestamps: true });

export const Watch = models?.Watch || mongoose.model("Watch", watchSchema);



