import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const validatePasswordMatch = (value) => {
    const password = getValues("password");
    return value === password || "Password and Confirm Password do not match";
  };

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword,
      };

      const response = await axios.post("/api/user/signup", userInfo);

      if (response.data) {
        toast.success("Signup successful! you can login.");
        // ✅ redirect to login
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error("Error: " + error.response.data.error);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center p-6 bg-slate-800 shadow-lg rounded-md w-[100%] h-[70%]">
          <h1 className="text-2xl text-blue-600 font-bold">Messager</h1>
          <h2 className="text-2xl mt-3">
            Create a new <span className="text-blue-600 font-bold">Account</span>
          </h2>

          {/* Input fields same as earlier */}
          <div className="w-full mt-12">
            <input
              className="w-full bg-transparent text-white border p-2 rounded"
              type="text"
              placeholder="Username"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-red-400 text-sm">Name is required</span>}
          </div>

          <div className="w-full mt-4">
            <input
              className="w-full bg-transparent text-white border p-2 rounded"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-red-400 text-sm">Email is required</span>}
          </div>

          <div className="w-full mt-4">
            <input
              className="w-full bg-transparent text-white border p-2 rounded"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
              })}
            />
            {errors.password && <span className="text-red-400 text-sm">Password is too weak</span>}
          </div>

          <div className="w-full mt-4">
            <input
              className="w-full bg-transparent text-white border p-2 rounded"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmpassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
            {errors.confirmpassword && (
              <span className="text-red-400 text-sm">{errors.confirmpassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>

          <p className="mt-4 text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
