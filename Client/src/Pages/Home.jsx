import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-100">
        <div className="flex justify-center items-center gap-6">
          <button
            className="px-6 py-2 m-4 bg-blue-500 rounded-2xl text-white"
            onClick={() => {
              navigate("/student-form");
            }}
          >
            Register
          </button>
          <button className="px-6 py-2 m-4 bg-blue-500 rounded-2xl text-white">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
