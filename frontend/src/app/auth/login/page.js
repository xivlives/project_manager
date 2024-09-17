import AuthForm from '../../components/AuthForm';

const LoginPage = () => {
  return(
    <div className='bg-gray-800 min-h-screen'>
      <AuthForm mode="login" />
    </div>
  )
};

export default LoginPage;
