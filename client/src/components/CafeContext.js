import { async } from '@firebase/util';
import { createContext, useState, useEffect } from 'react';

export const CafeContext = createContext(null);

const CafeProvider = ({ children }) => {
  const [cafes, setCafes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/cafes');
      const { data } = await res.json();
      setCafes(data);
    };
    fetchData();
  }, []);

  return (
    <CafeContext.Provider value={(cafes, setCafes)}>
      {children}
    </CafeContext.Provider>
  );
};

export default CafeProvider;
