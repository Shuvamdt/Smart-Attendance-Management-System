import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const Admin = () => {
  const [classDetails, setClassDetails] = useState(null);
  const [attendanceCode, setAttendanceCode] = useState(null);
  const [timer, setTimer] = useState(5000);
  const [inputValue, setInputValue] = useState("");
  const [refresh, setRefresh] = useState(false);

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("code", code);
    setAttendanceCode(code);
  };

  const createClass = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const newClass = {
      classid: data.classId,
      year: data.year,
      period: data.period,
      students: [],
    };

    localStorage.setItem("class", JSON.stringify(newClass));
    setClassDetails(newClass);
    e.target.reset();
  };

  const deleteClass = () => {
    localStorage.removeItem("class");
    setClassDetails(null);
    setAttendanceCode(null);
  };

  const addStudent = (e) => {
    e.preventDefault();
    if (!classDetails) {
      return;
    }

    const formData = new FormData(e.target);
    const studentName = formData.get("studentName");

    if (!studentName.trim()) {
      return;
    }

    const updatedClass = {
      ...classDetails,
      student: [...(classDetails.student || []), studentName],
    };

    localStorage.setItem("class", JSON.stringify(updatedClass));
    setClassDetails(updatedClass);
    e.target.reset();
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("class"));
    if (stored) {
      setClassDetails(stored);
    }
  }, [refresh]);

  useEffect(() => {
    if (classDetails) {
      generateCode();
      const interval = setInterval(generateCode, timer);
      return () => clearInterval(interval);
    }
  }, [classDetails, timer]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full mt-10">
        <form
          onSubmit={createClass}
          className="flex flex-col justify-center items-baseline gap-4 px-4 py-8 bg-blue-300 border border-blue-900 rounded-2xl w-200"
        >
          <div className="flex justify-baseline items-center gap-2 w-full">
            <label htmlFor="classId">Class Id</label>
            <input
              type="text"
              name="classId"
              id="classId"
              className="w-170 px-4 py-2 border border-blue-900 rounded-2xl"
              required
            />
          </div>
          <div className="flex gap-2 justify-baseline items-center">
            <label htmlFor="year">Academic year</label>
            <input
              type="text"
              name="year"
              id="year"
              className="w-70 px-4 py-2 border border-blue-900 rounded-2xl"
              required
            />
            <label htmlFor="period">Period</label>
            <input
              type="text"
              name="period"
              id="period"
              className="w-72 px-4 py-2 border border-blue-900 rounded-2xl"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 m-4 bg-blue-500 rounded-2xl text-white"
          >
            Create Class
          </button>
        </form>

        <div className="flex justify-center items-center">
          <h1 className="my-5">Current Class</h1>
        </div>

        {classDetails && (
          <div className="flex flex-col justify-baseline items-baseline gap-2 px-4 py-2 rounded-2xl bg-blue-300 w-200">
            <div className="flex gap-2 justify-baseline items-center">
              <h1>Class:</h1>
              <h3>{classDetails.classid}</h3>
            </div>
            <div className="flex gap-2 justify-baseline items-center">
              <h1>Academic year:</h1>
              <h3>{classDetails.year}</h3>
            </div>
            <div className="flex gap-2 justify-baseline items-center">
              <h1>Period:</h1>
              <h3>{classDetails.period}</h3>
            </div>

            <h1>Students</h1>
            {classDetails?.student?.length > 0 ? (
              classDetails.student.map((element, index) => (
                <div key={index}>
                  <h1>{element}</h1>
                </div>
              ))
            ) : (
              <p>No students yet</p>
            )}

            <form onSubmit={addStudent} className="flex gap-2 my-3">
              <input
                type="text"
                name="studentName"
                placeholder="Enter student name"
                className="px-4 py-2 border border-blue-900 rounded-2xl"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-2xl"
              >
                Add Student
              </button>
            </form>

            <div className="flex flex-col justify-center items-center w-full my-3 gap-3">
              <label htmlFor="setTimeOut">Set Time Out</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                id="setTimeOut"
                placeholder="*in secs"
                className="border border-blue-900 rounded-2xl px-4 py-2"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const secs = Number(inputValue);
                  setTimer((secs > 0 ? secs : 10) * 1000);
                  setInputValue("");
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-2xl"
              >
                Change time interval
              </button>

              <div className="font-bold text-lg">
                Attendance code:{" "}
                <span className="ml-2 text-red-600">{attendanceCode}</span>
              </div>

              {attendanceCode && (
                <QRCodeCanvas
                  value={attendanceCode}
                  size={150}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={true}
                />
              )}
            </div>

            <div className="flex justify-end w-full my-3 mr-5">
              <button
                onClick={() => {
                  setRefresh(!refresh);
                }}
                className="px-4 py-2 bg-blue-800 rounded-2xl text-white"
              >
                Refresh
              </button>
            </div>

            <div className="flex justify-end w-full my-3 mr-5">
              <button
                onClick={deleteClass}
                className="px-4 py-2 bg-blue-800 rounded-2xl text-white"
              >
                Delete Class
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
