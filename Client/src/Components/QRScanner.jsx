import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRScanner = ({ classdet, setClassdet }) => {
  const studentId = "12023002001387";

  return (
    <Scanner
      onScan={(result) => {
        const classCode = localStorage.getItem("code");
        const userCode = result[0].rawValue;
        if (userCode === classCode) {
          if (!classdet.student.includes(studentId)) {
            const updatedClass = { ...classdet };
            updatedClass.student = [...updatedClass.student, studentId];
            localStorage.setItem("class", JSON.stringify(updatedClass));
            setClassdet(updatedClass);
            alert("Attendance marked ✅");
          } else {
            alert("You have already marked attendance");
          }
        } else {
          alert("Wrong code ❌");
        }
      }}
    />
  );
};

export default QRScanner;
