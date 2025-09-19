
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Appbar from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../../cofig";
export default function AdminPanel() {
  const [allUsers, setAllUsers] = useState([])
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Sample Task",
      start: "2025-09-10",
      end: "2025-09-20",
      assigned: "Regular User",
      status: "in_progress",
    },
    {
      id: 3,
      title: "fdsaf",
      start: "2025-09-16",
      end: "2025-09-17",
      assigned: "Regular User",
      status: "not_started",
    },
    {
      id: 2,
      title: "Sample Task",
      start: "2025-09-17",
      end: "2025-09-18",
      assigned: "Regular User",
      status: "not_started",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    s_date: "",
    e_date: "",
    em_name: "",
    hours: 0,
    period: "Day",
    description: "",
  });
  
  useEffect(()=>{
    const axiosData = async() =>{
    const res = await axios.get(`${BACKEND_URL}/api/users/allusers`)
    const user_info = localStorage.getItem("userInfo");
    const token = user_info.token;
        setAllUsers(res.data.allUser)
    const taskRes = await axios.post(`${BACKEND_URL}/api/tasks/crtasks`, form,
        {headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    )
    console.log(taskRes)
    console.log(res.data.allUser)

    }

    axiosData();
  },[form])
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    console.log("first")
    console.log(form)
    
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
             <Appbar/>
             <div className="head mb-5 flex items-center justify-between">
              <h1 className=' text-2xl font-bold'>Tasks</h1>
              <BackButton link = "/home"/>
             </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 cursor-pointer">Assign / Create Task</h2>
        <div className="grid grid-cols-5 gap-3 mb-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded px-3 py-2 col-span-1"
          />
          <input
            type="date"
            name="s_date"
            value={form.start}
            onChange={handleChange}
            className="border rounded px-3 py-2 col-span-1"
          />
          <input
            type="date"
            name="e_date"
            value={form.end}
            onChange={handleChange}
            className="border rounded px-3 py-2 col-span-1"
          />
          <select
            name="em_name"
            value={form.em_name}
            onChange={handleChange}
            className="border rounded px-3 py-2 col-span-1"
          >{allUsers? allUsers.map((user, index)=>(
            <option key={index}>{user.name}</option>
          )): <option >users</option>}

          </select>
        </div>
        <div className="flex">
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2 mb-3"
        />
        <div className="ml-5">
          <h1>Allocation</h1>
          <div className="flex gap-2">
             <input
              type="number"
              name="hours"
              placeholder="hours"
              value={form.hours}
              onChange={handleChange}
              className="border rounded px-3 py-2 "
            />
            <p className=" text-4xl">/</p>
          <select
            name="period"
            value={form.period}
            onChange={handleChange}
            className="border rounded px-3 py-2 "
          >
            <option>Day</option>
            <option>Week</option>
            <option>Month</option>
          </select>
          </div>

        </div>
        </div>

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Create/Assign
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">All Tasks</h2>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Title</th>
              <th className="border px-3 py-2">Period</th>
              <th className="border px-3 py-2">Assigned</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border px-3 py-2">{task.id}</td>
                <td className="border px-3 py-2">{task.title}</td>
                <td className="border px-3 py-2">
                  {task.start} → {task.end}
                </td>
                <td className="border px-3 py-2">{task.assigned}</td>
                <td className="border px-3 py-2">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
