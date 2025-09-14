import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Registration";
import Home from "./Pages/Home";
import ClassTabStudent from "./Pages/ClassTabStudent";
import Admin from "./Pages/Admin";
import EnrollmentProvider from "./Components/EnrollmentProvider";
import ClassProvider from "./Components/ClassProvider";
import ClassCodeProvider from "./Components/ClassCodeProvider";

class ClassDetails {
  constructor(classid, year, period, students) {
    this.classid = classid;
    this.year = year;
    this.period = period;
    this.students = students;
  }
}

const App = () => {
  return (
    <div>
      <EnrollmentProvider>
        <ClassProvider>
          <ClassCodeProvider>
            <div className="min-h-screen overflow-x-hidden">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/student-form" element={<Registration />} />
                  <Route
                    path="/class-tab-student"
                    element={<ClassTabStudent />}
                  />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </BrowserRouter>
            </div>
          </ClassCodeProvider>
        </ClassProvider>
      </EnrollmentProvider>
    </div>
  );
};

export default App;
