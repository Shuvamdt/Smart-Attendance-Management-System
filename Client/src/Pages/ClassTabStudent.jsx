import React, { useState, useEffect } from "react";

const ClassTabStudent = () => {
  const [classdet, setClassdet] = useState(null);

  useEffect(() => {
    const loadClass = () => {
      try {
        const stored = localStorage.getItem("class");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (!parsed.student) {
            parsed.student = [];
          }
          setClassdet(parsed);
        } else {
          setClassdet(null);
        }
      } catch (error) {
        console.error("Error parsing class data:", error);
        setClassdet(null);
      }
    };
    loadClass();
    window.addEventListener("storage", loadClass);
    return () => {
      window.removeEventListener("storage", loadClass);
    };
  }, []);

  const giveAttendance = () => {
    if (!classdet) return;
    const updatedClass = { ...classdet };
    if (!updatedClass.student.includes("12023002001387")) {
      const code = localStorage.getItem("code");

      const userCode = prompt("Enter the attendance code:");
      if (userCode === code) {
        updatedClass.student = [...updatedClass.student, "12023002001387"];
        localStorage.setItem("class", JSON.stringify(updatedClass));
        setClassdet(updatedClass);
        alert("Attendance marked ✅");
      } else {
        alert("Wrong code ❌");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center py-4 my-2">
        {classdet != null ? (
          <div className="flex flex-col justify-baseline items-center px-4 py-2 bg-blue-400 w-200 border border-blue-800 rounded-2xl">
            <div className="flex flex-col justify-baseline items-center px-4 py-2 gap-2 text-white">
              <h1>Class id: {classdet.classid}</h1>
              <h1>Period: {classdet.period}</h1>
              <h1>Year: {classdet.year}</h1>
            </div>
            <button
              onClick={giveAttendance}
              className="bg-blue-950 text-white rounded-2xl px-5 py-2"
            >
              Give attendance
            </button>
            <div className="mt-4">
              <h2 className="text-white font-bold">Present Students:</h2>
              {classdet.student && classdet.student.length > 0 ? (
                classdet.student.map((s, i) => (
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
    </div>
  );
};

export default ClassTabStudent;
