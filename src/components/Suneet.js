import { dbService } from 'myBase';
import React, { useState } from 'react';

const Suneet = ({ suneetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSuneet, setNewSuneet] = useState(suneetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this Suneet?');
    console.log(ok);
    if (ok) {
      await dbService.doc(`suneets/${suneetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`suneets/${suneetObj.id}`).update({
      text: newSuneet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSuneet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Edit your Suneet" value={newSuneet} required />
            <input type="submit" value="Update Suneet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{suneetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Suneet</button>
              <button onClick={toggleEditing}>Edit Suneet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Suneet;
