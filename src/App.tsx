
// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <Router />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
