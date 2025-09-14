import React, { useState, useEffect, useContext } from "react";
import QRScanner from "../Components/QRScanner";
import { EnrollmentContext } from "../Components/EnrollmentContext";
import { ClassContext } from "../Components/ClassContext";
import { ClassCodeContext } from "../Components/ClassCodeContext";

const ClassTabStudent = () => {
  const { classDetails, setClassDetails } = useContext(ClassContext);
  const [showScanner, setShowScanner] = useState(false);
  const { enrollment } = useContext(EnrollmentContext);
  const { code } = useContext(ClassCodeContext);

  useEffect(() => {
    const stored = localStorage.getItem("class");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (!parsed.students) parsed.students = [];
        setClassDetails(parsed);
      } catch (error) {
        console.error("Error parsing class data:", error);
        setClassDetails(null);
      }
    } else {
      setClassDetails(null);
    }
  }, [setClassDetails]);

  const giveAttendance = () => {
    if (!classDetails) return;

    const updatedClass = { ...classDetails };

    if (!updatedClass.students.includes(enrollment)) {
      const inputCode = prompt("Enter the attendance code:");
      if (inputCode === code) {
        updatedClass.students = [...updatedClass.students, enrollment];
        setClassDetails(updatedClass);
        localStorage.setItem("class", JSON.stringify(updatedClass));
        alert("Attendance marked ✅");
      } else {
        alert("Wrong code ❌");
      }
    } else {
      alert("You already gave attendance ✅");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 my-2">
      {classDetails ? (
        <div className="flex flex-col justify-baseline items-center px-4 py-2 bg-blue-400 w-200 border border-blue-800 rounded-2xl">
          <div className="flex flex-col justify-baseline items-center px-4 py-2 gap-2 text-white">
            <h1>Class id: {classDetails.classid}</h1>
            <h1>Period: {classDetails.period}</h1>
            <h1>Year: {classDetails.year}</h1>
          </div>

          <button
            onClick={giveAttendance}
            className="bg-blue-950 text-white rounded-2xl px-5 py-2"
          >
            Give attendance
          </button>

          <button
            onClick={() => setShowScanner(!showScanner)}
            className="bg-blue-950 text-white rounded-2xl px-5 py-2 mt-4"
          >
            {showScanner ? "Close QR Scanner" : "Open QR Scanner"}
          </button>

          {showScanner && (
            <div className="mt-4 w-full">
              <QRScanner
                classdet={classDetails}
                setClassdet={setClassDetails}
              />
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-white font-bold">Present Students:</h2>
            {classDetails.students && classDetails.students.length > 0 ? (
              classDetails.students.map((s, i) => (
                <p key={i} className="text-white">
                  {s}
                </p>
              ))
            ) : (
              <p className="text-white">No students yet</p>
            )}
          </div>
        </div>
      ) : (
        <h1>No classes uploaded</h1>
      )}
    </div>
  );
};

export default ClassTabStudent;
