import mongoose from "mongoose";

export interface Message extends mongoose.Document {
    content: string;
    createdAt: Date;
   
}

const MessageSchema: mongoose.Schema<Message> = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
   
});



export interface User extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessages: boolean;
    isVerified: boolean;
    messages: Message[];

}

const UserSchema: mongoose.Schema<User> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required:[true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required:[true, "Verify code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        required: true,
        default: true,
    },
    messages: [MessageSchema],
});



const User=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);