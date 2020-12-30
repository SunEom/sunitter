import Suneet from 'components/Suneet';
import { dbService } from 'myBase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [suneet, setSuneet] = useState('');
  const [suneets, setSuneets] = useState([]);
  useEffect(() => {
    dbService.collection('suneets').onSnapshot((snapshot) => {
      const suneetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSuneets(suneetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('suneets').add({
      text: suneet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setSuneet('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSuneet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={suneet} type="text" required placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Suneet" />
      </form>
      <div>
        {suneets.map((suneet) => (
          <Suneet key={suneet.id} suneetObj={suneet} isOwner={suneet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
