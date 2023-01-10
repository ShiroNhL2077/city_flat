import mongoose from "mongoose";
const { Schema, model } = mongoose;



const MessageSchema = new Schema({
    chatId: {
        type: String,
        required: true,
    },
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    triedToGet: {
        type: Boolean,
        default: false,
        select: false,
    },
    sendAt: {
        type: Number,
        default: Date.now
    }
},
{ timestamps: true }
);


export default model("Message", MessageSchema);