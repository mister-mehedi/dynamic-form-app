import React from 'react';

export default function Footer() {
  return (
    // Using DaisyUI's footer component. 'footer-center' centers the content.
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
}
