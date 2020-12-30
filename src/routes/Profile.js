import { authService, dbService } from 'myBase';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };
  const getMySuneets = async () => {
    const suneets = await dbService.collection('suneets').where('creatorId', '==', userObj.uid).orderBy('createdAt').get();
    console.log(suneets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMySuneets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
