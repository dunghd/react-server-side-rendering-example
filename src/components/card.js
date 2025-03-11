import React from 'react';
import CardLeft from './card-left';
import CardRight from './card-right';

const Card = ({ apps, totalApps }) => {
  const cards = apps.map((app, index) => (
    <div className="app-card" key={app.name}>
      <CardLeft img={app.img} appNo={index + 1} totalApps={totalApps} />
      <CardRight app={app} />
    </div>
  ));

  return cards;
};

export default Card;
