import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const Dashboard = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [expiredToken, setExpiredToken] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpiredToken(decoded.exp);
    } catch (error) {
      if (error.response) {
        setMsg("error");
      }
    }
  };

  const axiosJWT = axios.create();

  // untuk mengecek apakah token sudah expired atau belum
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expiredToken * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpiredToken(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  return (
    <div className="py-3 px-8 lg:px-44 mt-5">
      {msg === "error" && <Navigate to="/" />}
      <h1 className="text-white font-bold text-2xl lg:text-4xl">Welcome back: {name}</h1>
      <button className="mt-5 text-white border py-2 px-3 rounded-full border-purple-300 hover:bg-white hover:text-purple-500 hover:border-none" onClick={getUsers}>
        Get Users
      </button>
      <table className="table-auto w-full text-center mt-10 bg-white">
        <thead>
          <tr className="text-purple-900">
            <th className="border border-slate-300">Id</th>
            <th className="border border-slate-300">Name</th>
            <th className="border border-slate-300">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((value, index) => {
            return (
              <tr key={index} className="text-purple-900">
                <td className="border border-slate-300">{value.id}</td>
                <td className="border border-slate-300">{value.name}</td>
                <td className="border border-slate-300">{value.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
