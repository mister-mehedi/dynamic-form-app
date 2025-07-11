import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    // Using DaisyUI's navbar component with a shadow for a nice visual effect.
    <header className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        {/* NavLink is a special version of Link that knows whether or not it is "active". */}
        <NavLink to="/" className="btn btn-ghost text-xl">
          Dynamic Form App
        </NavLink>
      </div>
    </header>
  );
}
