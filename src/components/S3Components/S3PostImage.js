import React from 'react';
import { Storage } from 'aws-amplify';
import uuid from 'uuid/dist/v4';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import '../../styles/s3post.css';

export default function S3PostImage({ signedIn, setImagePath }) {
  const [filename, setFilename] = React.useState(undefined);
  function uploadImage(file) {
    const myUuid = uuid();
    Storage.put(`${signedIn.username}/posts/${myUuid}.png`, file, {
      contentType: 'image/*',
    })
      .then((result) => {
        console.log(result.key);
        setImagePath(result.key);
      })
      .catch((err) => console.log(err));
  }

  function onChange(e) {
    setFilename(e.target.files[0]);
    uploadImage(e.target.files[0]);
  }
  console.log(filename);

  return (
    <div className="s3-post-main">
      <label for="post-img" className="s3-post-icon">
        <AttachFileIcon fontSize="large" />
        <div>{filename ? filename.name : 'Upload Image File'}</div>
      </label>
      <input
        id="post-img"
        type="file"
        accept="image/png"
        onChange={(evt) => onChange(evt)}
      />
    </div>
  );
}
