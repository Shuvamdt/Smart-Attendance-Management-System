import React, { useState } from "react";
import { EnrollmentContext } from "./EnrollmentContext";

const EnrollmentProvider = ({ children }) => {
  const [user, setUser] = useState(0);

  return (
    <EnrollmentContext.Provider value={{ user, setUser }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export default EnrollmentProvider;
