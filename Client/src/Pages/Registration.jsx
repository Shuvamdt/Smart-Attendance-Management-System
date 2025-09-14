import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EnrollmentContext } from "../Components/EnrollmentContext";

const API_URL = "http://localhost:3000";

const Registration = () => {
  const { enrollment, setEnrollment } = useContext(EnrollmentContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await axios.post(`${API_URL}/submit`, { formData: data });
      setEnrollment(data.enroll);
      alert(`${data.enroll} Registered successfully!`);
      navigate("/class-tab-student");
    } catch (error) {
      alert("Error uploading data ");
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="flex flex-col m-2 p-4 justify-center items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border-black border bg-gray-300 px-8 py-4 rounded-xl w-2xl"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="border border-black rounded-xl py-2 px-4"
          />
          <label htmlFor="enroll">Enrollment no.</label>
          <input
            type="text"
            id="enroll"
            name="enroll"
            required
            className="border border-black rounded-xl py-2 px-4"
          />
          <label htmlFor="section">Section</label>
          <input
            type="text"
            id="section"
            name="section"
            required
            className="border border-black rounded-xl py-2 px-4"
          />
          <label htmlFor="year">Academic year</label>
          <input
            type="text"
            id="year"
            name="year"
            required
            className="border border-black rounded-xl py-2 px-4"
          />
          <label htmlFor="email">College email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border border-black rounded-xl py-2 px-4"
          />
          <div className="flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className="bg-blue-500 rounded-2xl px-8 py-2 w-40 my-4 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
