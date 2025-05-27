import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 p-4">
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'font-bold' : ''}>
          Dashboard
        </NavLink>
      </nav>
    </aside>
);
}
