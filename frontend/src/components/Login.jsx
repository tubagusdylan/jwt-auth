import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import axios from "axios";

export const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      setMsg(null);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="py-[20vh]">
      {msg === null && <Navigate to="/dashboard" />}
      <div className="w-[400px] mx-auto p-4  bg-white rounded-lg">
        <h1 className="text-center font-bold text-3xl pt-1 pb-3 text-purple-400">Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-purple-800 font-semibold text-lg">
              Email
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="block w-full border border-purple-500 p-3 rounded-lg my-2 outline-none focus:ring focus:ring-blue-200"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-purple-800 font-semibold text-lg">
              Password
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="*******"
                className="block w-full border border-purple-500 p-3 rounded-lg my-2 outline-none focus:ring focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {isShowPassword ? (
              <HiOutlineEye size={25} className="absolute top-12 mt-[3px] right-3 cursor-pointer text-purple-400" onClick={handleShowPassword} />
            ) : (
              <HiOutlineEyeOff size={25} className="absolute top-12 mt-[3px] right-3 cursor-pointer text-purple-400" onClick={handleShowPassword} />
            )}
          </div>
          <h6 className="text-sm text-red-500">{msg}</h6>
          <button className="w-full bg-purple-500 p-3 rounded-lg mt-5 font-semibold text-white text-lg hover:bg-purple-400 active:bg-purple-800">Login</button>
        </form>
        <div className="w-full mt-5 text-center">
          <span className="t">
            Do not have account?{" "}
            <Link to="/register" className="text-purple-500 hover:text-purple-800 hover:underline">
              Register now
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};
