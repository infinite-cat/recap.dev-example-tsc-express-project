import express, { Router, Request, Response } from 'express';
import { tracer } from '@recap.dev/client'

import { Employee } from '../models/employee';
import employeesJson from './../data/employees.json';

const router: Router = express.Router();
const employees = employeesJson as Employee[];

const getAllEmployees = () => {
    return employees.sort((a, b) => b.Id - a.Id)
}

// GET: api/employees
router.get('/', async (req: Request, res: Response) => {
    tracer.setUnitName('getEmployees')
    try {
        res.json(getAllEmployees());
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET: api/employees/:id
router.get('/:id', async (req: Request, res: Response) => {
    tracer.setUnitName('getEmployee')

    try {
        const employee = employees.find(i => i.Id == +req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// POST: api/employees/
router.post('/', async (req: Request, res: Response) => {
    tracer.setUnitName('createEmployee')

    try {
        const employee = req.body as Employee;
        employee.Id = Math.max(...employees.map(i => i.Id)) + 1;
        employees.push(employee);
        res.json(employee);
    } catch (error) {
        res.status(500).json(error);
    }
});

// PUT: api/employees/:id
router.put('/:id', async (req: Request, res: Response) => {
    tracer.setUnitName('updateEmployee')

    try {
        const index = employees.findIndex(i => i.Id === +req.params.id);
        const employee = employees[index];
        if (employee) {
            employees[index] = { ...employee, ...(req.body as Employee) };
            res.json(employees[index]);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE: api/employees/:id
router.delete('/:id', async (req: Request, res: Response) => {
    tracer.setUnitName('deleteEmployee')

    try {
        const index = employees.findIndex(i => i.Id === +req.params.id);
        const employee = employees[index];
        if (index !== -1) {
            employees.splice(index, 1);
            res.json(employee);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
