import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const _id = window.localStorage.getItem('userId');
    const getUser = async () => {
      const res = await fetch(`/api/users/${_id}`);
      const { data } = await res.json;
      setUser(data[0]);
    };
  });

  return <span>Profile</span>;
};

export default Profile;
