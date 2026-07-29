const pool = require("../config/db");

// Get all employees
const getEmployees = async () => {
  const result = await pool.query(
    "SELECT * FROM employees ORDER BY id"
  );
  return result.rows;
};

// Add employee
const addEmployee = async (name, department, email) => {
  const result = await pool.query(
    `INSERT INTO employees (name, department, email)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, department, email]
  );

  return result.rows[0];
};

// Delete employee
const deleteEmployee = async (id) => {
  await pool.query(
    "DELETE FROM employees WHERE id = $1",
    [id]
  );
};

module.exports = {
  getEmployees,
  addEmployee,
  deleteEmployee
};
