import { dbService } from 'myBase';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [suneet, setSuneet] = useState('');
  const [suneets, setSuneets] = useState([]);
  const getSuneets = async () => {
    const dbSuneets = await dbService.collection('suneets').get();
    dbSuneets.forEach((document) => {
      const suneetObject = {
        ...document.data(),
        id: document.id,
      };
      setSuneets((prev) => [suneetObject, ...prev]);
    });
  };
  useEffect(() => {
    getSuneets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('suneets').add({
      suneet,
      createdAt: Date.now(),
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
          <div key={suneet.id}>
            <h4>{suneet.suneet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
