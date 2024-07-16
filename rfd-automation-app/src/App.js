import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TenderProvider } from './contexts/TenderContext';
import Dashboard from './Dashboard';
import Login from './components/Login';

const AuthenticatedApp = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <TenderProvider>
      <div>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <span className="font-bold text-xl">RFD Automation</span>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </nav>
        <Dashboard />
      </div>
    </TenderProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

export default App;