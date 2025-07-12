import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  // The useRouteError hook from react-router-dom provides the error object.
  const error = useRouteError();
  // Log the error for debugging purposes.
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-base-200">
      <div className="card bg-base-100 shadow-xl p-8">
        <h1 className="text-5xl font-bold text-error">Oops!</h1>
        <p className="mt-4 text-xl">Sorry, an unexpected error has occurred.</p>
        <p className="mt-2 text-lg text-base-content/70">
          {/* Display a user-friendly message from the error object */}
          <i>{error.statusText || error.message}</i>
        </p>
        <div className="card-actions justify-center mt-6">
          {/* Provide an easy way for the user to get back to the homepage */}
          <Link to="/" className="btn btn-primary">Go Back Home</Link>
        </div>
      </div>
    </div>
  );
}
