import { CONSTANT_MESSAGE } from "../common/constants.js";
import { addEmployees, deleteEmployees, getEmployeesById, getallEmployees, updateEmployees } from "../service/employeeService.js";
import { EmployeeAdd, employeeDelete, employeeUpdate } from "../validators/validator.js";

export const addEmployee = async (req, res) => {
    try {
        await EmployeeAdd.validateAsync(req.body);
        const employee = await addEmployees(req.body);
        return res.status(employee.statusCode).send(employee); 
    } catch (error) {
        console.log("Error in Add Employee API: ", error);
        return res.status(500).send({ statusCode: 500, status: CONSTANT_MESSAGE.STATUS.ERROR, message: error.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const EmployeeDetails = await getallEmployees();
        return res.status(EmployeeDetails?.statusCode || 200).send(EmployeeDetails);
    } catch (error) {
        console.log("Error in Get All Employees API: ", error);
        return res.status(500).send({ statusCode: 500, status: CONSTANT_MESSAGE.STATUS.ERROR, message: error.message });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
        const employees = await getEmployeesById(req.query.id);
        return res.status(employees.statusCode).send(employees);
    } catch (error) {
        console.log("Error in Get Employee By ID API: ", error);
        return res.status(500).send({ statusCode: 500, status: CONSTANT_MESSAGE.STATUS.ERROR, message: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        await employeeUpdate.validateAsync(req.query);
        const employee = await updateEmployees(req.body);
        return res.status(employee.statusCode).send(employee);

    } catch (error) {
        console.log("Error in Update Product API: ", error);
        return res.status(500).send({ statusCode: 500, status: CONSTANT_MESSAGE.STATUS.ERROR, message: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        await employeeDelete.validateAsync(req.query);
        const product = await deleteEmployees(req.query);
        return res.status(product.statusCode).send(product);

    } catch (error) {
        console.log("Error in delete Product API: ", error);
        return res.status(500).send({ statusCode: 500, status: CONSTANT_MESSAGE.STATUS.ERROR, message: error.message });
    }
};