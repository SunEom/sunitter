import React from 'react';

const Suneet = ({ suneetObj, isOwner }) => {
  return (
    <div>
      <h4>{suneetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete Suneet</button>
          <button>Edit Suneet</button>
        </>
      )}
    </div>
  );
};

export default Suneet;
