import React from "react";

function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center text-gray-400">
        &copy; {new Date().getFullYear()} Chat2DB. All rights reserved.
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <span className="text-gray-700">|</span>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <span className="text-gray-700">|</span>
          <a href="#" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
