import Suneet from 'components/Suneet';
import { dbService, storageService } from 'myBase';
import React, { useEffect, useState } from 'react';
import { v4 as uudiv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [suneet, setSuneet] = useState('');
  const [suneets, setSuneets] = useState([]);
  const [attachment, setAttachment] = useState();
  useEffect(() => {
    dbService.collection('suneets').onSnapshot((snapshot) => {
      const suneetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSuneets(suneetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const fileRef = storageService.ref().child(`${userObj.uid}/${uudiv4()}`);
    const response = await fileRef.putString(attachment, 'data_url');
    console.log(response);

    // await dbService.collection('suneets').add({
    //   text: suneet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setSuneet('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSuneet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => setAttachment(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={suneet} type="text" required placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Suneet" />
        {attachment && (
          <div>
            <img src={attachment} alt="#" width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
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
