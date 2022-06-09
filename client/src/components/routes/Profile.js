import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  
  return <span>Profile</span>;
};

export default Profile;
