import React from 'react';
import { Storage } from 'aws-amplify';
import uuid from 'uuid/dist/v4';
import Axios from 'axios';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import '../../styles/s3avatar.css';

export default function S3AvatarUpload({ signedIn, setRefresh, refresh }) {
  const [filename, setFilename] = React.useState(undefined);

  async function updateAvatar(avatarPath) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const resp = await Axios.post('http://localhost:4000/update-avatar', {
        token,
        avatarPath,
      });
      console.log('SUCCESS UPLOAD', resp);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  }

  function uploadImage(file) {
    const myUuid = uuid();
    Storage.put(`${signedIn.username}/avatar/${myUuid}.png`, file, {
      contentType: 'image/*',
    })
      .then((result) => {
        console.log(result.key);
        updateAvatar(result.key);
      })
      .catch((err) => console.log(err));
  }

  async function onChange(e) {
    setFilename(e.target.files[0]);
    uploadImage(e.target.files[0]);
  }

  console.log('file object', filename);

  return (
    <div className="s3-avatar-main">
      <div className="s3-upload-icon">
        <label for="file-input">
          <PhotoCameraIcon fontSize="large"></PhotoCameraIcon>
        </label>
      </div>

      <input
        id="file-input"
        type="file"
        accept="image/png"
        onChange={(evt) => onChange(evt)}
      />

      {/* <button onClick={() => uploadImage()}>Upload</button> */}
    </div>
  );
}
