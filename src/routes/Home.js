import React, { useState } from 'react';

const Home = () => {
  const [suneet, setSuneet] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSuneet(value);
  };
  return (
    <div>
      <form>
        <input type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Suneet" />
      </form>
    </div>
  );
};
export default Home;
