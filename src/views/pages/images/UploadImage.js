import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
function UploadImage() {
  const [uploadImage, setUploadImage] = useState('');
  const onDrop = (pictureFiles) => {
    console.log('hello', pictureFiles);
    setUploadImage(pictureFiles);
  };
  console.log(uploadImage);
  return (
    <div>
      <ImageUploader
        withIcon={false}
        withPreview={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
      />
    </div>
  );
}

export default UploadImage;
