import React, { useState } from 'react';
import Style from './card.module.css';

const Card = ({ title = "Enable Something" }) => {
  const [enabled, setEnabled] = useState(false);

  const toggle = () => setEnabled(!enabled);

  return (
    <div className={Style.cardGrid}>
      <div className={Style.card}>
        <div className={Style.icon} style={{ color: 'var(--error)' }}>👥</div>
        <h3>Collective Scheduling</h3>
        <p>Make it easy to book your team when everyone is available.</p>
      </div>
    </div>
  );
};

export default Card;
