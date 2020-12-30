import { dbService } from 'myBase';
import React, { useState } from 'react';

const Home = () => {
  const [suneet, setSuneet] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('suneet').add({
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
    </div>
  );
};
export default Home;
