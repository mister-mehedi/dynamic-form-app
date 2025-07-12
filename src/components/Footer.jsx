import React from 'react';

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-blue-100 text-blue-800 font-semibold">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
}
