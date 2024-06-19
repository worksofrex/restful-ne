import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-end p-4 gap-10 bg-white  border-b border-text/20 mb-6">
      <div className="flex items-center">
        <span className="mr-4 text-text">{localStorage.getItem("name")}</span>
        <UserCircleIcon width={26} className=" text-text stroke-text" />
      </div>
      <button className='p-2 rounded-lg bg-red-50' title='Logout' onClick={handleLogout}>
        <PowerIcon width={20} className='stroke-red-400' />
      </button>
    </nav>
  );
}
