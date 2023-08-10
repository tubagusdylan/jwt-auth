import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <section className="py-[20vh]">
      <div className="w-[400px] mx-auto p-4  bg-white rounded-lg">
        <h1 className="text-center font-bold text-3xl pt-1 pb-3 text-purple-400">Login</h1>
        <form>
          <label htmlFor="email" className="text-purple-800 font-semibold text-lg">
            Email
            <input type="email" name="email" id="email" placeholder="Enter your email" className="block w-full border border-purple-500 p-3 rounded-lg my-2 outline-none focus:ring focus:ring-blue-200" />
          </label>
          <div className="relative">
            <label htmlFor="password" className="text-purple-800 font-semibold text-lg">
              Password
              <input type={isShowPassword ? "text" : "password"} name="password" id="password" placeholder="*******" className="block w-full border border-purple-500 p-3 rounded-lg my-2 outline-none focus:ring focus:ring-blue-200" />
            </label>
            {isShowPassword ? (
              <HiOutlineEye size={25} className="absolute top-12 mt-[3px] right-3 cursor-pointer text-purple-400" onClick={handleShowPassword} />
            ) : (
              <HiOutlineEyeOff size={25} className="absolute top-12 mt-[3px] right-3 cursor-pointer text-purple-400" onClick={handleShowPassword} />
            )}
          </div>
          <button className="w-full bg-purple-500 p-3 rounded-lg mt-5 font-semibold text-white text-lg">Login</button>
        </form>
        <div className="w-full mt-5 text-center">
          <span className="t">
            Do not have account?{" "}
            <a href="#" className="text-purple-500 hover:text-purple-800 hover:underline">
              Register now
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};
