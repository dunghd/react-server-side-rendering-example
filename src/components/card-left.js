import React from 'react';

const CardLeft = ({ appNo, totalApps, img }) => (
  <div className="col-left">
    <div className="app-no">
      <span className="current">{`0${appNo}`}</span>
      <span className="connector">of </span>
      <br />
      <span className="total">{`0${totalApps}`}</span>
    </div>
    <img
      className="app-icon"
      src={img.src}
      alt={img.alt}
      height="120"
      width="120"
    />
  </div>
);

export default CardLeft;
