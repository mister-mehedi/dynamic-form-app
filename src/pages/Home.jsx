/**
 * @file Home.jsx
 * @description This file serves as the main page for the Dynamic Form application.
 * It contains the complete logic for creating, managing, validating, and displaying
 * a form with dynamically added fields. It is optimized for performance using
 * React.memo and useCallback, and features a polished UI/UX with custom icons
 * and animations.
 * @author Mehedi
 * @date 2025-07-12
 */

// =================================================================================
// SECTION 1: IMPORTS
// React is imported for component creation and hooks like useState and useCallback.
// =================================================================================
import React, { useState, useCallback } from 'react';

// =================================================================================
// SECTION 2: SVG ICON COMPONENTS
// Defining SVG icons as separate, reusable React components keeps the main JSX
// clean and readable. This is a best practice for managing icons in a project.
// =================================================================================

/**
 * A simple plus (+) icon component.
 * Used for the "Add Field" button.
 */
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

/**
 * A paper airplane (send) icon component.
 * Used for the "Submit Form" button to provide a clear visual cue for the action.
 */
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

/**
 * A trash can icon component.
 * Used for the delete button on each form field row.
 */
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 00-2.09 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);


// =================================================================================
// SECTION 3: MEMOIZED CHILD COMPONENT
// The FormField component represents a single, dynamic row in the form.
// =================================================================================

/**
 * A memoized component for a single form field row.
 * @param {object} props - The component's props.
 * @param {object} props.field - The data for the field (id, name, type).
 * @param {number} props.index - The index of the field in the array.
 * @param {function} props.onChange - The callback function to handle input changes.
 * @param {function} props.onRemove - The callback function to handle field removal.
 * @param {object} props.error - An object containing validation errors for this field.
 * @param {boolean} props.showRemoveButton - A boolean to control the visibility of the delete button.
 *
 * @description By wrapping this component in React.memo(), we prevent it from re-rendering
 * if its props have not changed. This is a critical performance optimization that stops
 * all fields from updating when the user interacts with just one.
 */
const FormField = React.memo(({ field, index, onChange, onRemove, error, showRemoveButton }) => {
  return (
    // The `animate-fade-in` class is a custom animation defined in index.css
    // to provide a smooth entrance for newly added fields.
    <div className="animate-fade-in flex flex-col sm:flex-row items-start sm:items-end gap-4 p-4 bg-base-200 rounded-lg">

      {/* Name Input */}
      <div className="form-control w-full sm:flex-1">
        <label htmlFor={`name-${field.id}`} className="label">
          <span className="label-text text-base font-semibold text-blue-600">Name</span>
        </label>
        <input
          id={`name-${field.id}`}
          type="text"
          name="name"
          value={field.name}
          onChange={(e) => onChange(field.id, e)}
          placeholder="e.g., Jane Smith"
          // Dynamically apply the 'input-error' class if a validation error exists for this field's name.
          className={`input input-bordered w-full ${error?.name ? 'input-error' : ''}`}
        />
        {/* Conditionally render the error message below the input if it exists. */}
        {error?.name && <p className="text-error text-xs mt-1">{error.name}</p>}
      </div>

      {/* Role Select Box */}
      <div className="form-control w-full sm:flex-1">
        <label htmlFor={`type-${field.id}`} className="label">
          <span className="label-text text-base font-semibold text-blue-600">Role</span>
        </label>
        <select
          id={`type-${field.id}`}
          name="type"
          value={field.type}
          onChange={(e) => onChange(field.id, e)}
          className={`select select-bordered w-full ${error?.type ? 'select-error' : ''}`}
        >
          <option value="" disabled>Select Role</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Staff">Staff</option>
        </select>
        {error?.type && <p className="text-error text-xs mt-1">{error.type}</p>}
      </div>

      {/* Delete Button - Conditionally rendered only if there is more than one field. */}
      {showRemoveButton && (
        <button
          type="button"
          onClick={() => onRemove(field.id)}
          className="btn btn-ghost btn-circle text-error/70 hover:bg-error/20"
          aria-label={`Remove field ${index + 1}`}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
});

// =================================================================================
// SECTION 4: MAIN PAGE COMPONENT
// This is the primary component for the page, orchestrating state and logic.
// =================================================================================
export default function Home() {
  // --- STATE MANAGEMENT ---
  // `fields`: An array of objects, where each object represents a row in the form.
  // We initialize it with one default field.
  const [fields, setFields] = useState([{ id: Date.now(), name: '', type: '' }]);

  // `errors`: An object to store validation errors. The key is the field's ID,
  // and the value is another object with errors for 'name' and 'type'.
  const [errors, setErrors] = useState({});

  // --- LOGIC AND HANDLERS ---
  /**
   * Appends a new, empty field object to the `fields` state array.
   * A unique ID is generated using a combination of Date.now() and the array length
   * to ensure uniqueness during the component's lifecycle.
   */
  const handleAddField = () => {
    setFields(currentFields => [...currentFields, { id: Date.now() + currentFields.length, name: '', type: '' }]);
  };

  /**
   * Removes a field from the `fields` array based on its ID.
   * @param {number} idToRemove - The unique ID of the field to be removed.
   * @description This function is wrapped in `useCallback` to memoize it. This prevents
   * it from being recreated on every render, which is essential for the `React.memo`
   * optimization on the `FormField` component to work correctly.
   */
  const handleRemoveField = useCallback((idToRemove) => {
    // Use the functional form of setState to ensure we have the latest state.
    setFields(currentFields => currentFields.filter((field) => field.id !== idToRemove));
    // Also remove any errors associated with the deleted field.
    setErrors(currentErrors => {
      const updatedErrors = { ...currentErrors };
      delete updatedErrors[idToRemove];
      return updatedErrors;
    });
  }, []); // The empty dependency array `[]` means the function is created only once.

  /**
   * Handles value changes for any input or select box.
   * @param {number} id - The ID of the field being changed.
   * @param {object} event - The DOM event object from the input/select element.
   * @description Also wrapped in `useCallback` for performance optimization.
   */
  const handleChange = useCallback((id, event) => {
    const { name, value } = event.target;
    setFields(currentFields => currentFields.map((field) =>
      field.id === id ? { ...field, [name]: value } : field
    ));
  }, []);

  /**
   * Validates the entire form.
   * @returns {boolean} - Returns `true` if the form is valid, `false` otherwise.
   * @description It iterates through all fields, checks for empty values, and populates
   * the `errors` state object accordingly.
   */
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    fields.forEach(field => {
      const fieldErrors = {};
      if (!field.name.trim()) { fieldErrors.name = 'Name is required.'; isValid = false; }
      if (!field.type) { fieldErrors.type = 'Type is required.'; isValid = false; }
      if (Object.keys(fieldErrors).length > 0) { newErrors[field.id] = fieldErrors; }
    });
    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles the form submission event.
   * It prevents the default browser action, runs validation, and if successful,
   * logs the data and shows a success modal.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted Successfully:', fields);
      // Using a DaisyUI modal provides a better user experience than a standard `alert()`.
      document.getElementById('success_modal').showModal();
    } else {
      console.log('Form has validation errors.');
    }
  };

  // --- JSX RENDERING ---
  return (
    // Using a React Fragment `<>` to return multiple top-level elements.
    <>
      {/* Hero Section: Provides a clear title and introduction to the page. */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-500">Dynamic Form Builder</h1>
        <p className="py-6 text-lg text-base-content/70 max-w-2xl mx-auto font-semibold">
          A responsive and performant form where you can add, validate, and remove fields. Built with React and Tailwind CSS.
        </p>
      </div>

      {/* Main Form Card: Wraps the form in a styled card for visual structure. */}
      <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
        <div className="card-body p-4 sm:p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Map over the `fields` state array to render a `FormField` component for each item. */}
            {fields.map((field, index) => (
              <FormField
                key={field.id} // The `key` prop is crucial for React's list rendering performance.
                field={field}
                index={index}
                onChange={handleChange}
                onRemove={handleRemoveField}
                error={errors[field.id]}
                showRemoveButton={fields.length > 1}
              />
            ))}
            {/* Action Buttons Section */}
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

      {/* State Display Table: Shows a live representation of the form's state data. */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="divider"></div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-600">Live Form State</h3>
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th>#</th>
                <th className=''>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="hover">
                  <th>{index + 1}</th>
                  {/* Display the value or a placeholder if empty. */}
                  <td>{field.name || <span className="text-base-content/50 italic">empty</span>}</td>
                  <td>{field.type || <span className="text-base-content/50 italic">empty</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Modal: A hidden DaisyUI modal that is shown upon successful form submission. */}
      <dialog id="success_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-success">Success!</h3>
          <p className="py-4">The form data has been added.</p>
          <div className="modal-action">
            {/* The `form` with `method="dialog"` allows closing the modal via the button or ESC key. */}
            <form method="dialog">
              <button className="btn btn-outline btn-info">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
