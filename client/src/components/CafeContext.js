import { async } from '@firebase/util';
import { createContext, useEffect, useState } from 'react';

export const CafeContext = createContext(null);

const CafeProvider = ({ children }) => {
  const [cafes, setCafes] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [newComment, setNewComment] = useState(null);

  // console.log(cafes);

  // Get all the cafe list from mongoDB
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/cafes');
      const { data } = await res.json();
      setCafes(data);
    };
    fetchData();
  }, []);

  return (
    <CafeContext.Provider
      value={{
        cafes,
        setCafes,
        isSelected,
        setIsSelected,
        selectedCafe,
        setSelectedCafe,
        newComment,
        setNewComment,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export default CafeProvider;
