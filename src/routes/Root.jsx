import React from 'react';
import { Outlet } from 'react-router-dom';

// Importing the Navbar and Footer components to be used in the layout.
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Root() {
  return (
    // Using Flexbox and min-h-screen to ensure the layout takes up at least
    // the full height of the viewport, keeping the footer at the bottom.
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />

      {/* The Outlet component from react-router-dom renders the active child route's element. */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
