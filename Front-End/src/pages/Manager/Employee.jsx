import React, { useEffect, useState } from 'react';

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', hours_worked: '', password: '', manager_id: '' });
  const [editId, setEditId] = useState(null);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/my-api/employee');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddOrEditEmployee = async (e) => {
    e.preventDefault();
    try {
      const url = editId
        ? `http://localhost:3000/my-api/employee/${editId}`
        : 'http://localhost:3000/my-api/employee';

      const method = editId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editId ? 'edit' : 'add'} employee`);
      }

      // Refresh employees and clear the form
      fetchEmployees();
      setFormData({ name: '', hours_worked: '', password: '', manager_id: '' });
      setEditId(null);
    } catch (error) {
      console.error(`Error ${editId ? 'editing' : 'adding'} employee:`, error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/my-api/employee/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditClick = (employee) => {
    setEditId(employee.id);
    setFormData({
      name: employee.name,
      hours_worked: employee.hours_worked,
      password: employee.password,
      manager_id: employee.manager_id,
    });
  };

  return (
    <div>
      <h1>Employee Management</h1>

      {/* Employee Table */}
      <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Hours Worked</th>
            <th>Password</th>
            <th>Manager ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.hours_worked}</td>
              <td>{employee.password}</td>
              <td>{employee.manager_id}</td>
              <td>
                <button onClick={() => handleEditClick(employee)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Employee Form */}
      <h2>{editId ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleAddOrEditEmployee}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Hours Worked:
            <input
              type="number"
              step="0.01"
              value={formData.hours_worked}
              onChange={(e) => setFormData({ ...formData, hours_worked: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Manager ID:
            <input
              type="number"
              value={formData.manager_id}
              onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
              required
            />
          </label>
        </div>
        <button type="submit">{editId ? 'Save Changes' : 'Add Employee'}</button>
      </form>
    </div>
  );
}

export default EmployeePage;