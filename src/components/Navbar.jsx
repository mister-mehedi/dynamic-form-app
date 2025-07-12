import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar bg-blue-100 text-blue-800 shadow-lg">
      <div className="flex-1">
        {/* NavLink is a special version of Link that knows whether or not it is "active". */}
        <NavLink to="/" className="btn btn-ghost text-xl">
          {'>'} Dynamic Form App
        </NavLink>
      </div>
    </header>
  );
}
