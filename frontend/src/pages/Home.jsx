
import Appbar from "../components/Appbar"
import Tasks from '../components/AdminTasks';
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("name");
  const [role, setRole] = useState("role");
  
  useEffect(()=>{
    let det = localStorage.getItem("userInfo");
    det = JSON.parse(det);
    setName(det.name);
    setRole(det.role);
    console.log(det)
  },[])
  return (
    <div className='w-full px-10'>
        <Appbar/>
        <h1 className=' text-2xl font-bold '>Welcome, {name}</h1>
        <h2 className=' text-md'> Role: {role}</h2>
        <Tasks/>
     
    </div>
  )
}
