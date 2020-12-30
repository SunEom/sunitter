import { dbService, storageService } from 'myBase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Suneet = ({ suneetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSuneet, setNewSuneet] = useState(suneetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this Suneet?');
    console.log(ok);
    if (ok) {
      await dbService.doc(`suneets/${suneetObj.id}`).delete();
      await storageService.refFromURL(`${suneetObj.attachmentUrl}`).delete();
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
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container suneetEdit">
                <input
                  onChange={onChange}
                  type="text"
                  placeholder="Edit your Suneet"
                  value={newSuneet}
                  required
                  autoFocus
                  className="formInput"
                />
                <input type="submit" value="Update Suweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{suneetObj.text}</h4>
          {suneetObj.attachmentUrl && <img alt="atttachment" src={suneetObj.attachmentUrl} />}
          {isOwner && (
            <div class="suneet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Suneet;
