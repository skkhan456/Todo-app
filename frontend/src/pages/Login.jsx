import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { handleSuccess,handleError } from "../utils.jsx";



const Login = () => {
    const [LoginInfo,setLoginInfo]=useState({
        
        email:'',
        password:''
    })

    const nevigate=useNavigate();

    const handleChange = (e) => {
        const {name,value}=e.target;
        console.log(name,value)
        const copyLoginInfo={...LoginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin=async (e)=>{
        e.preventDefault(); // refrese hone se rokega
        const {email,password}=LoginInfo;
        if ( !email || !password) {
            return handleError('email and password are required')
        }

        try{
            const url="https://todo-app-api-gold.vercel.app/auth/login"
            const response=await fetch(url,{
                method:"post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            });
            const result=await response.json();
            const {message,success,error,jwtToken,name}=result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser',name)
                setTimeout(()=>{
                    nevigate('/home')
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
            <h1 className="text-2xl font-bold mb-6 text-center">Login Page</h1>

            <form onSubmit={handleLogin}  className="space-y-5">

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
                value={LoginInfo.email}
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
                value={LoginInfo.password}
                />
            </div>

            <button
                
                type="submit"
                className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 "
            >
                Login
            </button>
            <span className="mt-4 text-sm text-gray-600 block text-center">
                Don't have an account?{" "}
                <Link
                to="/signup"
                className="text-blue-600 hover:underline font-medium transition duration-200"
                >
                SignUp
                </Link>
            </span>
            </form>
        </div>
        </div>
  );
};

export default Login;
