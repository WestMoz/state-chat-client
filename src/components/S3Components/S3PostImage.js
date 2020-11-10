import React from 'react';
import { Storage } from 'aws-amplify';
import uuid from 'uuid/dist/v4';

export default function S3PostImage({ signedIn, setImagePath }) {
  const [filename, setFilename] = React.useState(undefined);
  function uploadImage() {
    const myUuid = uuid();
    Storage.put(`${signedIn.username}/posts/${myUuid}.png`, filename, {
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
  }
  return (
    <div>
      <input type="file" accept="image/png" onChange={(evt) => onChange(evt)} />
      <button type="button" onClick={() => uploadImage()}>
        Upload
      </button>
    </div>
  );
}
