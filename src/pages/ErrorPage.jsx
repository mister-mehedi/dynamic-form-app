import React from 'react';

const ErrorPage = () => {
  return (
    <div>
      page not found
      <p className="text-center text-red-500">Sorry, the page you are looking for does not exist.</p>
      <p className="text-center">Please check the URL or return to the home page</p>
    </div>
  );
};

export default ErrorPage;