import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import canvasPreview from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  console.log('centerAspectCrop', mediaHeight, mediaHeight, aspect);
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
function ImageResizer() {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef();
  const imgRef = useRef();
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        console.log('helloooooo');
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
        console.log(canvasPreview);
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function onImageLoad(e) {
    console.log(onImageLoad);
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function saveImage(el) {
    var canvas = document.getElementById('canvas');
    var image = canvas.toDataURL('image/jpg');
    console.log(image);
    var link = document.createElement('a');
    // link.download = 'filename.png';
    // link.href = image;
    // link.click();
    const base64Canvas = canvas.toDataURL('image/jpeg').split(';base64,')[1];
    console.log(base64Canvas);
  }

  return (
    <div>
      <div className="App">
        <center>
          <input type="file" accept="image/*" onChange={onSelectFile} />
          <br />
          <br />
          <div>
            {Boolean(imgSrc) && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
          </div>
          <div>
            {Boolean(completedCrop) && (
              <canvas
                id="canvas"
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            )}
          </div>
          <button id="download" onClick={saveImage} download="myImage.jpg">
            Save Image
          </button>
        </center>
      </div>
    </div>
  );
}

export default ImageResizer;
