import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().required(),
    password: joi.string().min(8).required(),
});

export const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).max(16).required(),
});

export const EmployeeAdd = joi.object({
    name: joi.string().required(),
    designation: joi.string().required(),
    email: joi.string().required(),
    salary: joi.number().required(),
    address: joi.string().required(),
    worklocation: joi.string().required(),
});

export const employeeUpdate = joi.object({
    id:joi.string().required(),
});

export const employeeDelete = joi.object({
    id: joi.string().required(),
});