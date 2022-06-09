import { async } from '@firebase/util';
import { createContext, useEffect, useState } from 'react';

export const CafeContext = createContext(null);

const CafeProvider = ({ children }) => {
  const [cafes, setCafes] = useState(null);
  console.log(cafes);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/cafes');
      const { data } = await res.json();
      setCafes(data);
    };
    fetchData();
  }, []);

  return (
    <CafeContext.Provider value={{ cafes, setCafes }}>
      {children}
    </CafeContext.Provider>
  );
};

export default CafeProvider;
