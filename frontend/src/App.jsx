
import { Route, Routes, Navigate } from 'react-router-dom'
import Calendar from './pages/Calendar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'

import Home from './pages/Home'

export default function App() {

  // const isLoggedIn = localStorage.getItem("userInfo");
  // if(!isLoggedIn){
  //   return <Navigate to="/register" />
  // }
  return (
    <div>
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/calendar' element={<Calendar/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
    </Routes>
    </div>
  )
}
