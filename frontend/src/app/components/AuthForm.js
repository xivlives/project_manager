import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser, signupUser } from '../../services/authService';

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      await loginUser({ email, password });
    } else {
      await signupUser({ email, password });
    }
    router.push('/projects');
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
