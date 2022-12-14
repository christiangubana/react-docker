import React from 'react';
import { createContext, useState } from 'react';

const YearContext = createContext();

export const FilterProvider = ({ children }) => {
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(thisYear);

  return (
    <YearContext.Provider
      value={{
        year,
        setYear,
      }}
    >
      {children}
    </YearContext.Provider>
  );
};

export default YearContext;
