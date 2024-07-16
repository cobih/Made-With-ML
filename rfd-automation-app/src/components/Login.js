import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AnimatedCard, AnimatedButton, AnimatedInput } from './ui/animated';
import { CardHeader, CardTitle, CardContent } from './ui/card';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isRegistering) {
      const success = await register(username, password);
      if (success) {
        setIsRegistering(false);
      } else {
        setError('Registration failed. Please try again.');
      }
    } else {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <AnimatedCard className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isRegistering ? 'Register for RFD Automation' : 'Login to RFD Automation'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <AnimatedInput
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <AnimatedInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <AnimatedButton type="submit" className="w-full">
              {isRegistering ? 'Register' : 'Log In'}
            </AnimatedButton>
          </form>
          <p className="mt-4 text-center">
            {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="ml-1 text-blue-500 hover:underline"
            >
              {isRegistering ? 'Log In' : 'Register'}
            </button>
          </p>
        </CardContent>
      </AnimatedCard>
    </div>
  );
};

export default Login;