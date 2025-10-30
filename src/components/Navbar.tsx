import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wheat, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Wheat className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
              SmartAgro
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" active={isActive('/')}>Home</NavLink>
            {user && (
              <>
                <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
                <NavLink to="/crop-detector" active={isActive('/crop-detector')}>Crop Detector</NavLink>
                <NavLink to="/help" active={isActive('/help')}>Help Portal</NavLink>
                <NavLink to="/advisory" active={isActive('/advisory')}>Soil Advisory</NavLink>
                {profile?.role === 'admin' && (
                  <NavLink to="/admin" active={isActive('/admin')}>Admin</NavLink>
                )}
              </>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-600">
                  {profile?.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-green-100 text-green-700 font-medium'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}
