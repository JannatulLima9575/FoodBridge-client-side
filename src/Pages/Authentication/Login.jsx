import React, { useContext, useState } from 'react';
import loginImage from '../../assets/animation/verification.svg';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login successful");
        navigate("/");
      })
      .catch(err => {
        toast.error("Invalid email or password");
        setError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google login failed");
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-screen">
      {/* Image */}
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img src={loginImage} alt="Login" className="max-w-md w-full" />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 max-w-md bg-white dark:bg-[#2c2c2c] rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-[#1e1e1e] dark:text-white">Login to FoodBridge</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full dark:bg-[#333] dark:text-white" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full dark:bg-[#333] dark:text-white" required />
          <button type="submit" className="btn w-full bg-[#F9A825] text-white hover:bg-[#f57f17]">Login</button>
        </form>

        <button onClick={handleGoogleLogin} className="btn w-full mt-4 bg-[#257429] text-white hover:bg-red-600">
          Continue with Google
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <p className="mt-4 text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-[#F9A825] font-medium">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;