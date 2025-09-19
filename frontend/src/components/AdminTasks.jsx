import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../cofig";
export default function Tasks() {
  const [tasks, setTasks] = useState(null); 

useEffect(() => {
  const l_data = JSON.parse(localStorage.getItem("userInfo"));
  const token = l_data?.token;

  const axiosRes = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/tasks/gettasks`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Backend response:", res.data);

      // Adjust according to backend shape
      setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]); // fallback
    }
  };

  if (token) axiosRes();
}, []);

  // Render states

  if (tasks === null) return <div className="text-center font-bold">Loading...</div>;
  if (tasks.length === 0) return <div className="text-center font-bold">No tasks found</div>;

  return (
    <div className="w-full py-5 h-screen">
      <div className="head flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
      </div>

      <table className="w-[94vw] mt-[10vh] mb-[8vh] border shadow-2xl rounded-xl text-black font-bold">
        <thead className="bg-gray-300">
          <tr>
            <th className="p-4 underline underline-offset-2">Id</th>
            <th className="p-4 underline underline-offset-2">Title</th>
            <th className="p-4 text-green-600 underline underline-offset-2">
              Date Assigned
            </th>
            <th className="p-4 text-red-400 underline underline-offset-2">
              Deadline
            </th>
            {tasks[0]?.em_name && (
              <th className="p-4 underline underline-offset-2">Employee Name</th>
            )}
            <th className="p-4 underline underline-offset-2">Status</th>
            <th className="p-4 underline underline-offset-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) =>{
            let star_d = task.s_date.split("T")
            star_d = star_d[0]
            let end_d = task.s_date.split("T")
            end_d = end_d[0]
            return(
            <tr
              key={index}
              className="bg-blue-200 border shadow mb-5 rounded-md text-black font-bold"
            >
              <td className="p-4 text-center">{index + 1}</td>
              <td className="p-4 text-center flex flex-col gap-2 items-center">
                
               <div>{task.title}</div>
               <div className=" w-[7vw] h-[4vh] rounded-sm text-black bg-amber-600 flex items-center justify-center text-sm">20 hrs/week</div>
                </td>
              <td className="p-4 text-center">{star_d}</td>
              <td className="p-4 text-center">{end_d}</td>
              {task.em_name && (
                <td className="p-4 text-center">{task.em_name}</td>
              )}
              <td className="p-4 text-center">{task.status}</td>
              <td className="p-4 text-center">{task.action}</td>
            </tr>
          )
         })}
        </tbody>
      </table>
    </div>
  );
}
