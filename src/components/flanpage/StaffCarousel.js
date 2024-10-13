import React, { useState } from 'react';
import './StaffCarousel.css';

const skins = [
  { name: 'Paxino', description: 'Mastermind creator and fearless founder, leading the way!', imageUrl: 'https://i.ibb.co/7jSsdcK/novaskin-1.gif' },
  { name: 'UntalCali', description: 'Boss-level admin, keeping everything in check like a pro.', imageUrl: 'https://i.ibb.co/0XssXqc/novaskin-2.gif' },
  { name: 'BLADErexa', description: 'Born to build! The ultimate constructor of epic stuff.', imageUrl: 'https://i.ibb.co/CWXg5TX/novaskin-5.gif' },
  { name: 'MrCrystalchemist', description: 'Code wizard, designer, and developer with explosive creativity.', imageUrl: 'https://i.ibb.co/5YkK7SR/novaskin-3.gif' },
  { name: 'laPupu', description: 'Project’s illustrator and creative captain, making everything look awesome.', imageUrl: 'https://i.ibb.co/KDmpN1W/novaskin-4.gif' },
];

const StaffCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(3); // Centered skin initially

  // Function to move the clicked skin to the center
  const handleClick = (index) => {
    const steps = index - 2; // Ensure the clicked skin becomes the center one
    setCurrentIndex((prevIndex) => (prevIndex + steps + skins.length) % skins.length);
  };

  // Logic to display 5 skins cyclically around the center
  const getVisibleSkins = () => {
    const visibleSkins = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + skins.length) % skins.length;
      visibleSkins.push(skins[index]);
    }
    return visibleSkins;
  };

  return (
    <div className="carousel-section">
      <h1 className="section-title">Meet Our Pixel Heroes</h1>
      <div className="section-description">
        These are the heroes behind FlanCoin Project’s. Click on any of them to learn more about their role in the team.
      </div>

      <div className="carousel-container">
        <div className="carousel">
          {getVisibleSkins().map((skin, index) => (
            <div
              key={index}
              className={`skin ${index === 2 ? 'center' : 'side'}`} // The 3rd visible item is always the center skin
              style={{ backgroundImage: `url(${skin.imageUrl})` }}
              onClick={() => handleClick(index)} // Clicking moves the skin to the center
            ></div>
          ))}
        </div>
      </div>

      <div className="skin-description retro-pop">
        <h3 className="retro-title">{skins[currentIndex].name}</h3>
        <p className="retro-description">{skins[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default StaffCarousel;
