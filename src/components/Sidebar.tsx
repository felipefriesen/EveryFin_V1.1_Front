
// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { Home, LogIn, LogOut, FileText, FilePlus2, Users, Settings, ReceiptText } from 'lucide-react';

const menuItems = [
  { to: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
  { to: '/entradas', icon: <FilePlus2 size={20} />, label: 'Entradas' },
  { to: '/saidas', icon: <LogOut size={20} />, label: 'Saídas' },
  { to: '/relatorios', icon: <FileText size={20} />, label: 'Relatórios' },
  { to: '/recibos', icon: <ReceiptText size={20} />, label: 'Recibos' },
  { to: '/cadastro/clientes', icon: <Users size={20} />, label: 'Clientes' },
  { to: '/cadastro/funcionarios', icon: <Users size={20} />, label: 'Funcionários' },
  { to: '/configuracoes', icon: <Settings size={20} />, label: 'Configurações' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col shadow-xl">
      <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
        EveryFin
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive ? 'bg-white text-gray-900 font-semibold' : 'hover:bg-gray-800'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
