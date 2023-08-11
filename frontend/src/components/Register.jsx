import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import axios from "axios";

export const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      setMsg(null);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="py-[9vh]">
      {msg === null && <Navigate to="/" />}
      <div className="w-[400px] mx-auto p-4  bg-white rounded-lg">
        <h1 className="text-center font-bold text-3xl pt-1 pb-3 text-purple-400">Register</h1>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="text-purple-800 font-semibold text-lg">
              Name
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="block w-full border border-purple-500 p-3 rounded-lg my-2 outline-none focus:ring focus:ring-blue-200"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email" className="text-purple-800 font-semibold text-lg">
              Email
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="block w-full border border-purple-500 p-3 rounded-lg my-2 outline-none focus:ring focus:ring-blue-200"
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
          <div className="relative">
            <label htmlFor="conf_password" className="text-purple-800 font-semibold text-lg">
              Confirm Password
              <input
                type="text"
                name="conf_password"
                id="conf_password"
                placeholder="*******"
                className="block w-full border border-purple-500 p-3 rounded-lg my-2 outline-none focus:ring focus:ring-blue-200"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </label>
          </div>
          <h6 className="text-sm text-red-500">{msg}</h6>
          <button className="w-full bg-purple-500 p-3 rounded-lg mt-5 font-semibold text-white text-lg hover:bg-purple-400 active:bg-purple-800">Register</button>
        </form>
        <div className="w-full mt-5 text-center">
          <span className="t">
            Already have account?{" "}
            <Link to="/" className="text-purple-500 hover:text-purple-800 hover:underline">
              Login now
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};
