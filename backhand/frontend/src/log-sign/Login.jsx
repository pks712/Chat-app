import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
const {authuser,setAuthuser}= useAuth();
console.log(authuser)

const {
    register,
    handleSubmit,
     
    formState: { errors },
  } = useForm();
 






 const onSubmit = (data) => {
    const userInfo = {
   
      email:data.email,
      password:data.password,
   
    };
   axios.post("/api/user/login" ,userInfo)
   .then((response)=>{
console.log(response.data)
if (response.data){
  toast.success("login successfully!")
}
localStorage.setItem("messager" ,JSON.stringify(response.data));
setAuthuser(response.data)
   })
  .catch((error) =>{
    if(error.response){
      toast.error("Error:" + error.response.data.message)
    }
  });
  };



  return (
   <div className="h-screen flex justify-center items-center">
    <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center p-6 bg-slate-800 shadow-lg rounded-md  h-[70%]">
       <div>
          <h1 className="text-2xl text-blue-600 font-bold mb-4 mt-0">Messager</h1>
       </div>
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-2xl">
            Login with your
            <span className="text-blue-600 ml-2 font-bold">Account</span>
          </h1>
        </div>
      
        {/* Email */}
        <div className="w-full mb-3">
          <label className="input validator mt-4 border border-gray-700 rounded-xl flex items-center w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              className="grow outline-none bg-transparent text-white w-full"
                {...register("email", { required: true })}
            />
          </label>
             {errors.email && <span>This field is required</span>}
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>
        {/* Password */}
        <div className="w-full">
          <label className="input validator mt-4 border border-gray-700 rounded-xl flex items-center w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              className="grow outline-none bg-transparent text-white"
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                {...register("password", { required: true })}
            />
          </label>
             {errors.password && <span>This field is required</span>}
          <p className="validator-hint hidden text-xs text-gray-500 text-center mt-1">
            Must be more than 8 characters, including at least one number, one
            lowercase letter, and one uppercase letter
          </p>
        </div>
        <div className="mt-5 w-full">
          <button type="submit" className="w-full mt-4 bg-blue-500 text-white cursor-pointer  hover:bg-gray-600 rounded-full duration-300">
         Login
          </button>
          <p className=" flex items-center justify-center mt-2 text-xl text-gray-400">
            {" "}
            don't have an account?
            <Link to={"/signup"} className="text-blue-400 underline cursor-pointer">
             SignUp
            </Link>
          </p>
        </div>
      </div>
    </form>
  
    </div>
  )
}

export default Login