import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, UserPlus, Users, LogOut } from 'lucide-react';
import { AuthContext } from '../../Auth/AuthProvider';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useContext(AuthContext)
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Add Student', href: '/add-student', icon: UserPlus },
    { name: 'Students', href: '/students', icon: Users },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-white text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40  w-72 lg:w-80  bg-white text-black transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-600">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-700">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-800 hover:text-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 m-4 rounded-lg text-gray-600 hover:bg-gray-800 hover:text-gray-300 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar