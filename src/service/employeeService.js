import { CONSTANT_MESSAGE } from "../common/constants.js";
import { Employee } from "../model/employee.model.js";

export const addEmployees = async (employeeDetails) => {
    try {
        const employee = await Employee.findOne({email: employeeDetails.email});
        if (employee) {
            return {
                statusCode: 400,
                status: CONSTANT_MESSAGE.STATUS.ERROR,
                message: CONSTANT_MESSAGE.EMPLOYEE.EMAIL_ALREADY_EXISTS
            };
        }
        const addEmployee = new Employee(employeeDetails);
        const abc = await addEmployee.save();
        console.log("dasfgasd",abc);
        return {
            statusCode: 200,
            status: CONSTANT_MESSAGE.STATUS.SUCCESS,
            message: CONSTANT_MESSAGE.EMPLOYEE.EMPLYOEE_ADDED_SUCCESSFULLY,
            data: addEmployee
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: CONSTANT_MESSAGE.STATUS.ERROR,
            message: error.message
        };
    }
};


export const getallEmployees = async () => {
    try {
        const employee = await Employee.find({});
        if (!employee) {
            return {
                statusCode: 200,
                status: CONSTANT_MESSAGE.EMPLOYEE.EMPLOYEE_FETCH_SUCCESS,
                message: 'Employee data not found'
            }
        }
        return {
            statusCode: 200,
            status: CONSTANT_MESSAGE.EMPLOYEE.EMPLOYEE_FETCH_SUCCESS,
            message: 'Employee data fetched successfully',
            data: employee
        }
    } catch (error) {
        return {
            statusCode: 500,
            status: CONSTANT_MESSAGE.STATUS.ERROR,
            message: error.message,
        };
    }
};

export const getEmployeesById = async (employeeId) => {
    try {
        const employee = await Employee.find({ _id:employeeId})
        if (employee.length) {
            return {
                statusCode: 200,
                status: CONSTANT_MESSAGE.STATUS.SUCCESS,
                message: CONSTANT_MESSAGE.EMPLOYEE.EMPLOYEE_FETCH_SUCCESS,
                data: product
            };
        }
        return {
            statusCode: 200,
            status: CONSTANT_MESSAGE.STATUS.SUCCESS,
            message: CONSTANT_MESSAGE.EMPLOYEE.EMPLOYEE_FETCH_SUCCESS
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: CONSTANT_MESSAGE.STATUS.ERROR,
            message: error.message,
        };
    }
};

export const updateEmployees = async (EmployeeDetails) => {
    try {
        const employee =await Employee.updateOne({ _id: EmployeeDetails.id }, EmployeeDetails);
        return {
            statusCode: 200,
            status: CONSTANT_MESSAGE.STATUS.SUCCESS,
            message: CONSTANT_MESSAGE.EMPLOYEE.EMPLOYEE_UPDATED_SUCCESSFULLY,
            data: employee
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: CONSTANT_MESSAGE.STATUS.ERROR,
            message: error.message,
        };
    }
};

export const deleteEmployees = async (employeeDetails) => {
    try {
        const employee = await Employee.deleteOne({ _id: employeeDetails.id});
        if (!employee) {
            return {
                statusCode: 200,
                status: CONSTANT_MESSAGE.STATUS.SUCCESS,
                message: CONSTANT_MESSAGE.EMPLOYEE.EMPLOYEE_DELETED
            };
        }
        return {
            statusCode: 200,
            status: CONSTANT_MESSAGE.STATUS.SUCCESS,
            message: CONSTANT_MESSAGE.EMPLOYEE.EMPLOYEE_DELETED
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: CONSTANT_MESSAGE.STATUS.ERROR,
            message: error.message,
        };
    }
};