const employeeModel = require("../models/employeeModel");

// GET /employees
const getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch employees"
    });
  }
};

// POST /employees
const addEmployee = async (req, res) => {
  try {
    const { name, department, email } = req.body;

    const employee = await employeeModel.addEmployee(
      name,
      department,
      email
    );

    res.status(201).json(employee);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add employee"
    });
  }
};

// DELETE /employees/:id
const deleteEmployee = async (req, res) => {
  try {
    await employeeModel.deleteEmployee(req.params.id);

    res.status(200).json({
      message: "Employee deleted"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete employee"
    });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  deleteEmployee
};
