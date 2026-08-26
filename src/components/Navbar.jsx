import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-blue-400 transition">
        ZEF Event Scheduler
      </Link>
      <div className="flex items-center space-x-4 text-sm font-medium">
        <Link to="/" className="hover:text-blue-400 transition">Events</Link>
        {token ? (
          <>
            <Link to="/create-event" className="hover:text-blue-400 transition">Create Event</Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="hover:text-blue-400 transition">Sign In</Link>
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}