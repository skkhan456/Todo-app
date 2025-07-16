import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { handleSuccess,handleError } from "../utils.jsx";



const Signup = () => {
    const [signupInfo,setsignupInfo]=useState({
        name:'',
        email:'',
        password:''
    })

    const nevigate=useNavigate();

    const handleChange = (e) => {
        const {name,value}=e.target;
        console.log(name,value)
        const copysignupInfo={...signupInfo};
        copysignupInfo[name]=value;
        setsignupInfo(copysignupInfo);
    };

    const handlesignup=async (e)=>{
        e.preventDefault(); // refrese hone se rokega
        const {name,email,password}=signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }

        try{
            const url="https://todo-app-api-gold.vercel.app/auth/signup"
            const response=await fetch(url,{
                method:"post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result=await response.json();
            const {message,success,error}=result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    nevigate('/login')
                },1000)
            }else if(error){
                const details=error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message)
            }
            console.log(result)
        }catch(err){
            handleError(err);
        }
    }


    
    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Signup Page</h1>

            <form onSubmit={handlesignup}  className="space-y-5">
            <div className="flex flex-col">
                <label
                htmlFor="name"
                className="mb-1 text-sm font-medium text-gray-700"
                >
                Name
                </label>
                <input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Enter your name"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={signupInfo.name}
                />
            </div>

            <div className="flex flex-col">
                <label
                htmlFor="email"
                className="mb-1 text-sm font-medium text-gray-700"
                >
                Email
                </label>
                <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={signupInfo.email}
                />
            </div>

            <div className="flex flex-col">
                <label
                htmlFor="password"
                className="mb-1 text-sm font-medium text-gray-700"
                >
                Password
                </label>
                <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter your password"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={signupInfo.password}
                />
            </div>

            <button
                
                type="submit"
                className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 "
            >
                Sign Up
            </button>
            <span className="mt-4 text-sm text-gray-600 block text-center">
                Already have an account?{" "}
                <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium transition duration-200"
                >
                Login
                </Link>
            </span>
            </form>
        </div>
        </div>
  );
};

export default Signup;
