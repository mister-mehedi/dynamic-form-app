import React, { useState } from 'react';

export default function Home() {
  // 1. STATE MANAGEMENT
  // 'fields' holds an array of all our dynamic form rows.
  // Each row is an object with a unique id, a name, and a type.
  // We use Date.now() + index for a simple unique ID.
  const [fields, setFields] = useState([{ id: Date.now(), name: '', type: '' }]);

  // 'errors' will hold any validation errors, keyed by the field's id.
  const [errors, setErrors] = useState({});

  // 2. CORE FUNCTIONS
  // Adds a new, empty field row to the 'fields' state array.
  const handleAddField = () => {
    const newField = { id: Date.now() + fields.length, name: '', type: '' };
    setFields([...fields, newField]);
  };

  // Removes a field row by its unique id.
  const handleRemoveField = (idToRemove) => {
    const updatedFields = fields.filter((field) => field.id !== idToRemove);
    setFields(updatedFields);
    // Also clear any errors associated with the removed field.
    const updatedErrors = { ...errors };
    delete updatedErrors[idToRemove];
    setErrors(updatedErrors);
  };

  // Updates the 'name' or 'type' for a specific field when the user types or selects a value.
  const handleChange = (id, event) => {
    const { name, value } = event.target;
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, [name]: value } : field
    );
    setFields(updatedFields);
  };

  // Checks all fields to ensure they are not empty.
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    fields.forEach(field => {
      const fieldErrors = {};
      // Check if the name input is empty after trimming whitespace.
      if (!field.name.trim()) {
        fieldErrors.name = 'Name is required.';
        isValid = false;
      }
      // Check if a type has been selected.
      if (!field.type) {
        fieldErrors.type = 'Type is required.';
        isValid = false;
      }
      // If there are errors for this field, add them to the main errors object.
      if (Object.keys(fieldErrors).length > 0) {
        newErrors[field.id] = fieldErrors;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  // Handles the form submission event.
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the browser from reloading the page.
    if (validateForm()) {
      // If validation passes, log the data and show a success message.
      console.log('Form Submitted Successfully:', fields);
      alert('Success! The form data has been logged to the console.');
    } else {
      // If validation fails, log an error message.
      console.log('Form has validation errors.');
    }
  };

  // 3. JSX / RENDERING
  return (
    <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
      <div className="card-body">
        <h1 className="card-title text-2xl sm:text-3xl justify-center mb-6">User Information Form</h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col sm:flex-row items-start sm:items-end gap-4 p-4 border border-base-300 rounded-lg">
              {/* Name Input Field */}
              <div className="form-control w-full sm:flex-1">
                <label htmlFor={`name-${field.id}`} className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  id={`name-${field.id}`}
                  type="text"
                  name="name"
                  value={field.name}
                  onChange={(e) => handleChange(field.id, e)}
                  placeholder="Enter Name"
                  className={`input input-bordered w-full ${errors[field.id]?.name ? 'input-error' : ''}`}
                />
                {errors[field.id]?.name && <p className="text-error text-xs mt-1">{errors[field.id].name}</p>}
              </div>

              {/* Type Select Box */}
              <div className="form-control w-full sm:flex-1">
                <label htmlFor={`type-${field.id}`} className="label">
                  <span className="label-text">Type</span>
                </label>
                <select
                  id={`type-${field.id}`}
                  name="type"
                  value={field.type}
                  onChange={(e) => handleChange(field.id, e)}
                  className={`select select-bordered w-full ${errors[field.id]?.type ? 'select-error' : ''}`}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Staff">Staff</option>
                </select>
                {errors[field.id]?.type && <p className="text-error text-xs mt-1">{errors[field.id].type}</p>}
              </div>

              {/* Delete Button (only shown if there's more than one field) */}
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField(field.id)}
                  className="btn btn-error btn-outline"
                >
                  Delete
                </button>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="card-actions flex-col sm:flex-row justify-between mt-6">
            <button type="button" onClick={handleAddField} className="btn btn-primary w-full sm:w-auto">
              + Add Field
            </button>
            <button type="submit" className="btn btn-success w-full sm:w-auto">
              Submit Form
            </button>
          </div>
        </form>

        {/* Displaying Form State in a Table */}
        <div className="mt-8">
          <div className="divider"></div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Current Form State</h3>
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id}>
                    <th>{index + 1}</th>
                    <td>{field.name || <span className="text-base-content/50 italic">empty</span>}</td>
                    <td>{field.type || <span className="text-base-content/50 italic">empty</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
