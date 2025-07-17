import React, { useContext, useState } from "react";
import registerImage from "../../assets/animation/verification.svg";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password))
      return toast.error("Must include an uppercase letter");
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password))
      return toast.error("Must include a special character");

    try {
      const res = await createUser(email, password);
      await updateUserProfile(name);

      const userInfo = {
        name,
        email,
        image: res.user.photoURL || null,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
      setError(err.message);
    }
  };

 const handleGoogleLogin = () => {
  signInWithGoogle()
    .then(async (result) => {
      const user = result.user;
      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      await axiosInstance.post("/users", userInfo);
      toast.success("Signed in with Google");
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
        <img src={registerImage} alt="Register" className="max-w-md w-full" />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 max-w-md bg-white dark:bg-[#2c2c2c] rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-[#1e1e1e] dark:text-white">
          Create your FoodBridge account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full dark:bg-[#333] dark:text-white"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full dark:bg-[#333] dark:text-white"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full dark:bg-[#333] dark:text-white"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full dark:bg-[#333] dark:text-white"
            required
          />
          <button
            type="submit"
            className="btn w-full bg-[#F9A825] text-white hover:bg-[#f57f17]"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn w-full mt-4 bg-[#257429] text-white hover:bg-red-600"
        >
          Continue with Google
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#F9A825] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;