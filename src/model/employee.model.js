import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        designation: {
            type: String,
        },
        email: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
        },
        address: {
            type: String,
        },
        worklocation: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Employee = mongoose.model('Employee', employeeSchema, 'Employee');