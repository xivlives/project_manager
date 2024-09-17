import AuthForm from '../../components/AuthForm';

const SignupPage = () => {
  return (
    <div className='bg-gray-800 min-h-screen'>
      <AuthForm mode="signup" />;
    </div>
  ) 
};

export default SignupPage;