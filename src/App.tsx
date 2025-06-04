import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-4 flex-1 overflow-auto">
            <Router />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
