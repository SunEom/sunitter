import { dbService } from 'myBase';
import React from 'react';

const Suneet = ({ suneetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this Suneet?');
    console.log(ok);
    if (ok) {
      await dbService.doc(`suneets/${suneetObj.id}`).delete();
    }
  };
  return (
    <div>
      <h4>{suneetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Suneet</button>
          <button>Edit Suneet</button>
        </>
      )}
    </div>
  );
};

export default Suneet;
