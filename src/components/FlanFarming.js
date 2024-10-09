import React, { useState, useEffect } from 'react';
import './FlanFarming.css';
import farmingVideo from '../../assets/farming.mp4';

const FlanFarming = () => {
  const [plusSevenElements, setPlusSevenElements] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newElement = {
        id: Date.now(),
        x: Math.random() * 150,
        y: Math.random() * 10,
      };
      setPlusSevenElements((prev) => [...prev, newElement]);

      setTimeout(() => {
        setPlusSevenElements((prev) => prev.filter((el) => el.id !== newElement.id));
      }, 2000);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="flan-farming">
      <div className="farming-video-container">
        <video className="farming-video" autoPlay loop muted>
          <source src={farmingVideo} type="video/mp4" />
        </video>
        {plusSevenElements.map((element) => (
          <span key={element.id} className="plus-seven" style={{ top: `${element.y}%`, left: `${element.x}%` }}>
            +7$ FLAN
          </span>
        ))}
      </div>
    </section>
  );
};

export default FlanFarming;
