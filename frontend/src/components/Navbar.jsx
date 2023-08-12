import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const Navbar = () => {
  const [msg, setMsg] = useState("");

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      setMsg(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="py-3 px-8 lg:px-44 bg-purple-600 flex justify-between text-lg font-semibold items-center">
      {msg === null && <Navigate to="/" />}
      <div className="text-white">Logo</div>
      <div>
        <button onClick={handleLogout} className="py-2 px-3 rounded-full bg-white text-purple-500 hover:bg-slate-200 active:bg-purple-950">
          Logout
        </button>
      </div>
    </nav>
  );
};
