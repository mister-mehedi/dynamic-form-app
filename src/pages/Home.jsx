import React, { useState, useCallback } from 'react';

// =================================================================================
// Memoized FormField Component
// By wrapping this component in React.memo, we ensure it only re-renders when its
// specific props (field, error, etc.) actually change. This prevents all fields
// from re-rendering when you type in just one.
// =================================================================================
const FormField = React.memo(({ field, index, onChange, onRemove, error, showRemoveButton }) => {
  console.log(`Rendering Field: ${index + 1}`); // Add this to see the optimization in action

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 p-4 border border-base-300 rounded-lg">
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
          onChange={(e) => onChange(field.id, e)}
          placeholder="Enter Name"
          className={`input input-bordered w-full ${error?.name ? 'input-error' : ''}`}
        />
        {error?.name && <p className="text-error text-xs mt-1">{error.name}</p>}
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
          onChange={(e) => onChange(field.id, e)}
          className={`select select-bordered w-full ${error?.type ? 'select-error' : ''}`}
        >
          <option value="" disabled>Select Type</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Staff">Staff</option>
        </select>
        {error?.type && <p className="text-error text-xs mt-1">{error.type}</p>}
      </div>

      {/* Delete Button */}
      {showRemoveButton && (
        <button
          type="button"
          onClick={() => onRemove(field.id)}
          className="btn btn-error btn-outline"
        >
          Delete
        </button>
      )}
    </div>
  );
});


// =================================================================================
// Main Home Component
// =================================================================================
export default function Home() {
  const [fields, setFields] = useState([{ id: Date.now(), name: '', type: '' }]);
  const [errors, setErrors] = useState({});

  const handleAddField = () => {
    const newField = { id: Date.now() + fields.length, name: '', type: '' };
    setFields([...fields, newField]);
  };

  // useCallback memoizes the function itself. This is crucial because if the function
  // was recreated on every render, React.memo would see it as a "new" prop and
  // re-render the FormField component anyway, defeating the optimization.
  const handleRemoveField = useCallback((idToRemove) => {
    setFields(currentFields => currentFields.filter((field) => field.id !== idToRemove));
    setErrors(currentErrors => {
      const updatedErrors = { ...currentErrors };
      delete updatedErrors[idToRemove];
      return updatedErrors;
    });
  }, []); // Empty dependency array means this function is created only once.

  const handleChange = useCallback((id, event) => {
    const { name, value } = event.target;
    setFields(currentFields => currentFields.map((field) =>
      field.id === id ? { ...field, [name]: value } : field
    ));
  }, []); // Empty dependency array means this function is created only once.

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    fields.forEach(field => {
      const fieldErrors = {};
      if (!field.name.trim()) {
        fieldErrors.name = 'Name is required.';
        isValid = false;
      }
      if (!field.type) {
        fieldErrors.type = 'Type is required.';
        isValid = false;
      }
      if (Object.keys(fieldErrors).length > 0) {
        newErrors[field.id] = fieldErrors;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted Successfully:', fields);
      // Use the modal instead of alert()
      document.getElementById('success_modal').showModal();
    } else {
      console.log('Form has validation errors.');
    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
        <div className="card-body">
          <h1 className="card-title text-2xl sm:text-3xl justify-center mb-6">User Information Form (Optimized)</h1>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                field={field}
                index={index}
                onChange={handleChange}
                onRemove={handleRemoveField}
                error={errors[field.id]}
                showRemoveButton={fields.length > 1}
              />
            ))}

            <div className="card-actions flex-col sm:flex-row justify-between mt-6">
              <button type="button" onClick={handleAddField} className="btn btn-primary w-full sm:w-auto">
                + Add Field
              </button>
              <button type="submit" className="btn btn-success w-full sm:w-auto">
                Submit Form
              </button>
            </div>
          </form>

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

      {/* Success Modal using DaisyUI */}
      <dialog id="success_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-success">Success!</h3>
          <p className="py-4">The form data has been logged to the console.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
