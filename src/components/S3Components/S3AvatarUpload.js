import React from 'react';
import { Storage } from 'aws-amplify';
import uuid from 'uuid/dist/v4';
import Axios from 'axios';

export default function S3AvatarUpload({ signedIn }) {
  const [filename, setFilename] = React.useState(undefined);

  async function updateAvatar(avatarPath) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const resp = await Axios.post('http://localhost:4000/update-avatar', {
        token,
        avatarPath,
      });
      console.log('SUCCESS UPLOAD', resp);
    } catch (error) {
      console.log(error);
    }
  }

  function uploadImage() {
    const myUuid = uuid();
    Storage.put(`${signedIn.username}/avatar/${myUuid}.png`, filename, {
      contentType: 'image/*',
    })
      .then((result) => {
        console.log(result.key);
        updateAvatar(result.key);
      })
      .catch((err) => console.log(err));
  }

  function onChange(e) {
    setFilename(e.target.files[0]);
  }

  return (
    <div>
      <input type="file" accept="image/png" onChange={(evt) => onChange(evt)} />
      <button onClick={() => uploadImage()}>Upload</button>
    </div>
  );
}
