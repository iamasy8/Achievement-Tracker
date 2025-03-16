import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="font-bold text-xl">Achievement Tracker</div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link>
            <Link to="/todos" className="hover:bg-blue-700 px-3 py-2 rounded">Todo List</Link>
            <Link to="/events" className="hover:bg-blue-700 px-3 py-2 rounded">Events</Link>
            <Link to="/pomodoro" className="hover:bg-blue-700 px-3 py-2 rounded">Pomodoro</Link>
            <Link to="/progress" className="hover:bg-blue-700 px-3 py-2 rounded">Progress</Link>
          </div>
          <div className="md:hidden">
            <button className="focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;