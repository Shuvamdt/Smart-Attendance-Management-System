import React, { useState } from "react";
import { ClassContext } from "./ClassContext";

const ClassProvider = ({ children }) => {
  const [classDetails, setClassDetails] = useState({});

  return (
    <ClassContext.Provider value={{ classDetails, setClassDetails }}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassProvider;
