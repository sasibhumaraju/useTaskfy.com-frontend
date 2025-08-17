import React, { useState } from 'react';
import Style from './card.module.css';

const Card = ({ title ="", message = "", icon }) => {
  const [enabled, setEnabled] = useState(false);

  const toggle = () => setEnabled(!enabled);

  return (
    <div className={Style.cardContainer}>
      <div className={Style.card}>
        <div className={Style.icon}>{icon}</div>
        <div className={Style.title}>{title}</div>
        <div className={Style.message}>{message}</div>
      </div>
    </div>
  );
};

export default Card;
