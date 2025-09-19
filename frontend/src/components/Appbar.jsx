import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
export default function Appbar() {

  const handleOnClick = ()=>{
    localStorage.clear("userInfo")
  }

    const [role, setRole] = useState("role");
    
    useEffect(()=>{
      let det = localStorage.getItem("userInfo");
      det = JSON.parse(det);
      setRole(det.role);
      console.log(det)
    },[])
  return (
    <div className='w-full px-10 py-5 flex justify-between '>
      <Link to={'/home'}>
        <div className=' text-2xl'>Gantt App</div>
      </Link>
      
      <div className=' flex gap-2.5 items-center'>
        <Link to={"/calendar"}>
        <button className="relative cursor-pointer inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Calender
            </span>
        </button>
        </Link>

        {role === "user"? null :
          <Link to={"/admin"}>
            <button className="relative cursor-pointer inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Admin
            </span>
            </button>
           </Link>
        }  
           <Link to={"/register"}>
             <button type="button" className="focus:outline-none cursor-pointer  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleOnClick}>Log Out</button>

           </Link>
        
      </div>
    </div>
  )
}
