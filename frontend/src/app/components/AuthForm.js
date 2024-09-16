'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, signupUser } from '../../services/authService';

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (mode === 'login') {
        await loginUser({ email, password });
        router.push('/projects'); // Redirect to projects page on successful login
      } else {
        await signupUser({ email, password });
        router.push(' /login'); // Redirect to login page on successful signup
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-form">
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
