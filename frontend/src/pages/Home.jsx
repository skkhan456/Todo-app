// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleSuccess } from '../utils';

// const Home = () => {
//   const [loggedInUser,setloggedInUser]=useState('');
//   const nevigate=useNavigate();

//   useEffect(() => {
//     setloggedInUser(localStorage.getItem('loggedInUser'))
//   }, []);

//   const handlelogout=(e)=>{
//       localStorage.removeItem('loggedInUser')
//       localStorage.removeItem('token')
//       handleSuccess('User Loggedout');

//       setTimeout(() => {
//             nevigate('/login');
//         }, 1000)
//   }
  

//   return (
//     <div >
     
//       <h1 className='font-bold text-xl'>{loggedInUser}</h1>
//       <button 
//       onClick={handlelogout}
//                 className="border-1 bg-blue-500 p-3 rounded-md hover:bg-blue-300 ">
//       LogOut
//       </button>
//     </div>
    
//   )
// }

// export default Home

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';

//import Navbar from "src/components/Navbar.jsx";

function Home() {
  const [todo, setTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleAdd = () => {
    const newtodos = [
      ...todos,
      {
        id: uuidv4(),
        todo,
        isCompleted: false,
        dueDate: selectedDate,
      },
    ];
    setTodos(newtodos);
    setTodo("");
    setSelectedDate("");
    saveToLS(newtodos);
  };

  const handleDelete = (id) => {
    const newtodos = todos.filter((item) => item.id !== id);
    setTodos(newtodos);
    saveToLS(newtodos);
  };

  const handleEdit = (id) => {
    const toEdit = todos.find((item) => item.id === id);
    setTodo(toEdit.todo);
    setSelectedDate(toEdit.dueDate || "");
    const newtodos = todos.filter((item) => item.id !== id);
    setTodos(newtodos);
    saveToLS(newtodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (id) => {
    const newtodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newtodos);
    saveToLS(newtodos);
  };
       const navigate=useNavigate();

    const handlelogout=(e)=>{
      localStorage.removeItem('loggedInUser')
      localStorage.removeItem('token')
      handleSuccess('User Loggedout');

      setTimeout(() => {
            navigate('/login');
        }, 1000)
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col">
       
    <nav className="flex justify-between items-center bg-indigo-900 text-white py-2 px-6">
  {/* Left: Logo */}
  <div className="font-bold text-xl">iTask</div>

  {/* Right: Nav links + Logout */}
  <div className="flex items-center gap-6">
    <span className="cursor-pointer hover:font-bold">Home</span>
    <span className="cursor-pointer hover:font-bold">Your Tasks</span>
    <button
      onClick={handlelogout}
      className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white font-medium"
    >
      Logout
    </button>
  </div>
</nav>
      <div className="min-h-screen bg-gradient-to-tr from-pink-100 to-violet-100 p-4 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-4xl font-bold text-center text-violet-800 mb-6">
            iTask - Manage your todos at one place
          </h1>

          {/* Add Todo Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Add Todo</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={todo}
                onChange={handleChange}
                placeholder="Write your task..."
                className="flex-1 border-2 border-violet-300 focus:border-violet-500 outline-none rounded-lg px-4 py-2 text-gray-800 shadow-sm"
              />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-2 border-violet-300 rounded-lg px-3 py-2 text-gray-700"
              />
              <button
                onClick={handleAdd}
                disabled={todo.length < 3}
                className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Completion Stats */}
          <div className="text-right text-gray-600 mb-3 text-sm">
            Completed: {todos.filter((t) => t.isCompleted).length} / {todos.length}
          </div>

          {/* Display Todos */}
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Your Todos</h2>
          <div className="space-y-3">
            {todos.length === 0 && (
              <div className="text-center text-gray-500 font-medium">No todos to display</div>
            )}

            {todos.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => handleCheckBox(item.id)}
                      className="w-5 h-5 accent-violet-600"
                    />
                    <span
                      className={`text-lg ${
                        item.isCompleted ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {item.todo}
                    </span>
                  </div>

                  {item.dueDate && (
                    <div
                      className={`text-sm ${
                        new Date(item.dueDate) < new Date() && !item.isCompleted
                          ? "text-red-500 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      Due: {item.dueDate}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;

