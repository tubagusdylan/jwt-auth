/* eslint-disable react/prop-types */
import { HiCheckCircle } from "react-icons/hi";

export const Popup = ({ msg }) => {
  return (
    <div className="w-[300px] p-5 border border-purple-700">
      <HiCheckCircle />
      <h1>{msg}</h1>
    </div>
  );
};
