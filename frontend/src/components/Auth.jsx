import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { BACKEND_URL } from "../../cofig";
import axios from "axios";

function Auth({type}) {
  const [loading, setLoading] = useState(false);
  const [sign, setSign] = useState({
    name: "",
    email:"",
    password:""
  })
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const response = await axios.post(`${BACKEND_URL}/api/users/${type}`, sign);
       
         const data = response.data;
         console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
 
        navigate("/home");
    }
    catch (error) {
        alert(error)
    }

}
  return (
  
  <div className="flex h-screen lg:w-[50%] w-[100%] flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-800">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
      {type== "register" ?<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Sign up to your account</h2>:
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Sign in to your account</h2>}
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST" onSubmit={(e)=>{handleOnSubmit(e)}}>
        {type== "register"?
                <div>
          <label htmlFor='email' className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Name</label>
          <div className="mt-2">
            <input id="name" onChange={(e)=>{setSign({...sign, name: e.target.value})}} name="name" type="text" autoComplete='name' required className="block w-full px-[1vw] rounded-md border-0 py-1.5 text-gray-900 dark:text-white sshadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>:
        <div></div>}

        <div>
          <label htmlFor='email' className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Email address</label>
          <div className="mt-2">
            <input id="email" onChange={(e)=>{setSign({...sign, email: e.target.value})}} name="email" type="email" autoComplete='email' required className="block w-full px-[1vw] rounded-md border-0 py-1.5 text-gray-900 dark:text-white sshadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Password</label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div className="mt-2">
            <input id="password" onChange={(e)=>{setSign({...sign, password: e.target.value})}} name="password" type="password"  required className="block w-full px-[1vw] rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
            {loading? <div className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> <span className=" loading loading-infinity loading-md"></span></div>
            : type=="register" ? <button type="submit" className="flex cursor-pointer w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>: 
            <button type="submit" className="flex cursor-pointer w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>}
          
        </div>

      </form>
      {type== "login" ? 
        <Link to="/register"><p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-200">
        Not a member? <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">SignUp</a></p></Link>
        :<Link to="/login"><p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-200">
        Already a member? <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</a>
     </p></Link> }

    </div>
  </div>
  
  )
}

export default Auth