import React, { useState, useCallback } from 'react';

// =================================================================================
// ICONS - We define these as simple React components for reusability.
// =================================================================================
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 00-2.09 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);


// =================================================================================
// Memoized FormField Component (Now with fade-in animation)
// =================================================================================
const FormField = React.memo(({ field, index, onChange, onRemove, error, showRemoveButton }) => {
  return (
    // We add the 'animate-fade-in' class here for the smooth entrance effect.
    <div className="animate-fade-in flex flex-col sm:flex-row items-start sm:items-end gap-4 p-4 bg-base-200 rounded-lg">
      <div className="form-control w-full sm:flex-1">
        <label htmlFor={`name-${field.id}`} className="label">
          <span className="label-text">Name</span>
        </label>
        <input id={`name-${field.id}`} type="text" name="name" value={field.name} onChange={(e) => onChange(field.id, e)} placeholder="e.g., John Doe" className={`input input-bordered w-full ${error?.name ? 'input-error' : ''}`} />
        {error?.name && <p className="text-error text-xs mt-1">{error.name}</p>}
      </div>
      <div className="form-control w-full sm:flex-1">
        <label htmlFor={`type-${field.id}`} className="label">
          <span className="label-text">Role</span>
        </label>
        <select id={`type-${field.id}`} name="type" value={field.type} onChange={(e) => onChange(field.id, e)} className={`select select-bordered w-full ${error?.type ? 'select-error' : ''}`}>
          <option value="" disabled>Select Role</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Staff">Staff</option>
        </select>
        {error?.type && <p className="text-error text-xs mt-1">{error.type}</p>}
      </div>
      {showRemoveButton && (
        <button type="button" onClick={() => onRemove(field.id)} className="btn btn-ghost btn-circle text-error/70 hover:bg-error/20">
          <TrashIcon />
        </button>
      )}
    </div>
  );
});

// =================================================================================
// Main Home Component (With Enhanced UI)
// =================================================================================
export default function Home() {
  const [fields, setFields] = useState([{ id: Date.now(), name: '', type: '' }]);
  const [errors, setErrors] = useState({});

  const handleAddField = () => {
    setFields(currentFields => [...currentFields, { id: Date.now() + currentFields.length, name: '', type: '' }]);
  };

  const handleRemoveField = useCallback((idToRemove) => {
    setFields(currentFields => currentFields.filter((field) => field.id !== idToRemove));
    setErrors(currentErrors => {
      const updatedErrors = { ...currentErrors };
      delete updatedErrors[idToRemove];
      return updatedErrors;
    });
  }, []);

  const handleChange = useCallback((id, event) => {
    const { name, value } = event.target;
    setFields(currentFields => currentFields.map((field) =>
      field.id === id ? { ...field, [name]: value } : field
    ));
  }, []);

  const validateForm = () => {
    const newErrors = {}; let isValid = true;
    fields.forEach(field => {
      const fieldErrors = {};
      if (!field.name.trim()) { fieldErrors.name = 'Name is required.'; isValid = false; }
      if (!field.type) { fieldErrors.type = 'Type is required.'; isValid = false; }
      if (Object.keys(fieldErrors).length > 0) { newErrors[field.id] = fieldErrors; }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted Successfully:', fields);
      document.getElementById('success_modal').showModal();
    } else {
      console.log('Form has validation errors.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Dynamic Form Builder</h1>
        <p className="py-6 text-lg text-base-content/70 max-w-2xl mx-auto">
          A responsive and performant form where you can add, validate, and remove fields on the fly. Built with React and Tailwind CSS.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
        <div className="card-body p-4 sm:p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {fields.map((field, index) => (
              <FormField key={field.id} field={field} index={index} onChange={handleChange} onRemove={handleRemoveField} error={errors[field.id]} showRemoveButton={fields.length > 1} />
            ))}
            <div className="card-actions flex-col sm:flex-row justify-between mt-6 pt-4 border-t border-base-200">
              <button type="button" onClick={handleAddField} className="btn btn-primary btn-outline w-full sm:w-auto">
                <PlusIcon /> Add Field
              </button>
              <button type="submit" className="btn btn-success w-full sm:w-auto">
                <SendIcon /> Submit Form
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* State Display Table */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="divider"></div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">Live Form State</h3>
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="hover">
                  <th>{index + 1}</th>
                  <td>{field.name || <span className="text-base-content/50 italic">empty</span>}</td>
                  <td>{field.type || <span className="text-base-content/50 italic">empty</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Modal */}
      <dialog id="success_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-success">Success!</h3>
          <p className="py-4">The form data has been logged to the browser's console.</p>
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