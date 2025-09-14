import React, { useState } from "react";
import { ClassCodeContext } from "./ClassCodeContext";

const ClassCodeProvider = ({ children }) => {
  const [code, setCode] = useState(null);

  return (
    <ClassCodeContext.Provider value={{ code, setCode }}>
      {children}
    </ClassCodeContext.Provider>
  );
};

export default ClassCodeProvider;
