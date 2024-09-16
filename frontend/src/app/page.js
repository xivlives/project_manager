import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Your Personal Project Manager</h1>
      <div className="auth-buttons">
        <Link href="/auth/login">
          <button>Login</button>
        </Link>
        <Link href="/auth/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
