import { createContext, useEffect, useState } from 'react';
import Geocode from 'react-geocode';

// react geocode setting with api key from env
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
Geocode.setApiKey(REACT_APP_GOOGLE_MAPS_API_KEY);

export const CafeContext = createContext(null);

const CafeProvider = ({ children }) => {
  const [cafes, setCafes] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [geoCodes, setGeoCodes] = useState([]);
  const [center, setCenter] = useState({ lat: 45.501689, lng: -73.567256 });

  // console.log(cafes);

  // Get all the cafe list from mongoDB
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/cafes');
      const { data } = await res.json();
      setCafes(data);
      if (data) {
        // Extract addresses from all cafes' info
        const locations = data.map((cafe) => cafe.address);
        console.log(locations);

        // Find geocode to mark cafe locations in map
        let geoArray = [];
        locations.map(async (loc) => {
          const res = await Geocode.fromAddress(loc);
          const data = await res.results[0].geometry.location;
          geoArray.push(data);
        });
        setGeoCodes(geoArray);
      }
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
        geoCodes,
        center,
        setCenter,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export default CafeProvider;
