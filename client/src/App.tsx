

import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../src/pages/Login'
import SignUp from "../src/pages/SignUp"
import Dashboard from './pages/Dashboard'
function App() {
  return (
    <div className='font-generalsans  text-sm'>
      <BrowserRouter>
      <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
