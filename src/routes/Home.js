import Suneet from 'components/Suneet';
import SuneetFactory from 'components/SuneetFactory';
import { dbService } from 'myBase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [suneets, setSuneets] = useState([]);

  useEffect(() => {
    dbService.collection('suneets').onSnapshot((snapshot) => {
      const suneetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSuneets(suneetArray);
    });
  }, []);

  return (
    <div className="container">
      <SuneetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {suneets.map((suneet) => (
          <Suneet key={suneet.id} suneetObj={suneet} isOwner={suneet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
