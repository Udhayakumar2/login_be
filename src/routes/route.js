import { login, register } from '../controller/authenticationController.js';
import express from 'express';
import { addEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from '../controller/employeeController.js';
import { checkJwtToken } from '../middleware/authentication.js';

export const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/employee',checkJwtToken,addEmployee);
router.get('/employee',getEmployees);
router.get('/employeebyId',getEmployeeById);
router.put('/employee',updateEmployee);
router.delete('/employee',deleteEmployee);