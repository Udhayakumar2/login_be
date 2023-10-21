import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
    {
        token: {
            type: String,          
        },
        userId: {
            type: String,
        },           
        isactive:{
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
    }
);

export const Token = mongoose.model('Token', tokenSchema,'Token');