import React from 'react';

export default function ResponsiveVideoTutorial({ src, type }) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '56.25%',
      }}
    >
      <video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        controls
        autoPlay
        loop
      >
        <track kind="captions" src="captions_filename.vtt" label="English Captions" default />
        <source src={src} type={type} />
        Your browser does not support the video tag or the video format is not supported.
      </video>
    </div>
  );
}
