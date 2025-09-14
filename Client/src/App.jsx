import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Registration";
import Home from "./Pages/Home";
import ClassTabStudent from "./Pages/ClasstabStudent";
import Admin from "./Pages/Admin";

class ClassDetails {
  constructor(classid, year, period, students) {
    this.classid = classid;
    this.year = year;
    this.period = period;
    this.students = students;
  }
}

const App = () => {
  const classdet = new ClassDetails();
  localStorage.setItem("class", JSON.stringify(classdet));
  return (
    <div>
      <div className="min-h-screen overflow-x-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student-form" element={<Registration />} />
            <Route path="/class-tab-student" element={<ClassTabStudent />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
