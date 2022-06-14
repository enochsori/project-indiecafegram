import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import Geocode from 'react-geocode';

// react geocode setting with api key from env
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
Geocode.setApiKey(REACT_APP_GOOGLE_MAPS_API_KEY);

export const CafeContext = createContext(null);

const CafeProvider = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  const [cafes, setCafes] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [geoCodes, setGeoCodes] = useState([]);
  const [center, setCenter] = useState(null);
  const [chatConversation, setChatConverstation] = useState(null);

  // console.log(cafes);

  // Get all the cafe list from mongoDB after login
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/cafes');
      const { data } = await res.json();
      console.log(data);
      if (data) {
        setCafes(data);
        // Extract addresses from all cafes' info
        const locations = data.map((cafe) => cafe.address);

        // Find geocode to mark cafe locations in map
        let geoArray = [];
        locations.map(async (loc) => {
          const res = await Geocode.fromAddress(loc);
          const data = await res.results[0].geometry.location;
          geoArray.push(data);
        });
        setGeoCodes(geoArray);
        setCenter(geoArray[0]);
      }
    };
    fetchData();
  }, [isLoggedIn]);

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
        geoCodes,
        setGeoCodes,
        center,
        setCenter,
        chatConversation,
        setChatConverstation,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export default CafeProvider;
