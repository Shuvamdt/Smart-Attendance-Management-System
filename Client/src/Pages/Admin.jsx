import React, { useContext, useEffect, useState, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ClassContext } from "../Components/ClassContext";
import { ClassCodeContext } from "../Components/ClassCodeContext";

const Admin = () => {
  const { classDetails, setClassDetails } = useContext(ClassContext);
  const { code, setCode } = useContext(ClassCodeContext);
  const [timer, setTimer] = useState(5000);
  const [inputValue, setInputValue] = useState("");

  const generateCode = useCallback(() => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(newCode);
  }, [setCode]);

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
    setClassDetails(newClass);
    e.target.reset();
  };

  const deleteClass = () => {
    setClassDetails(null);
    setCode(null);
  };

  const addStudent = (e) => {
    e.preventDefault();
    if (!classDetails) return;

    const formData = new FormData(e.target);
    const studentName = formData.get("studentName").trim();
    if (!studentName) return;

    const updatedClass = {
      ...classDetails,
      students: [...(classDetails.students || []), studentName],
    };
    setClassDetails(updatedClass);
    e.target.reset();
  };

  useEffect(() => {
    if (classDetails) {
      generateCode();
      const interval = setInterval(generateCode, timer);
      return () => clearInterval(interval);
    }
  }, [classDetails, timer, generateCode]);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-10">
      <form
        onSubmit={createClass}
        className="flex flex-col gap-4 px-4 py-8 bg-blue-300 border border-blue-900 rounded-2xl w-200"
      >
        <div className="flex gap-2 w-full">
          <label htmlFor="classId">Class Id</label>
          <input
            type="text"
            name="classId"
            id="classId"
            className="w-170 px-4 py-2 border border-blue-900 rounded-2xl"
            required
          />
        </div>
        <div className="flex gap-2">
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

      {classDetails && (
        <div className="flex flex-col gap-2 px-4 py-2 rounded-2xl bg-blue-300 w-200 mt-5">
          <h3>Class: {classDetails.classid}</h3>
          <h3>Year: {classDetails.year}</h3>
          <h3>Period: {classDetails.period}</h3>

          <h1 className="mt-3">Students</h1>
          {classDetails.students?.length > 0 ? (
            classDetails.students.map((s, i) => <p key={i}>{s}</p>)
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

          <div className="flex flex-col items-center my-3 gap-3">
            <label htmlFor="setTimeOut">Set Time Interval (secs)</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              id="setTimeOut"
              placeholder="e.g. 10"
              className="border border-blue-900 rounded-2xl px-4 py-2"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                const secs = Number(inputValue);
                if (!isNaN(secs) && secs > 0) {
                  setTimer(secs * 1000);
                }
                setInputValue("");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-2xl"
            >
              Change time interval
            </button>

            <div className="font-bold text-lg">
              Attendance code: <span className="ml-2 text-red-600">{code}</span>
            </div>

            {code && (
              <QRCodeCanvas
                value={code}
                size={150}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin
              />
            )}
          </div>

          <div className="flex justify-end w-full my-3">
            <button
              onClick={deleteClass}
              className="px-4 py-2 bg-red-600 rounded-2xl text-white"
            >
              Delete Class
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
