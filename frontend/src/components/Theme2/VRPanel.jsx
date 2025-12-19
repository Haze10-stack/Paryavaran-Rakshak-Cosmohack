import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Desert text effects
const mirageShimmer = `
  @keyframes mirageShimmer {
    0%, 100% { 
      text-shadow: 0 0 10px rgba(255, 140, 0, 0.6), 0 0 20px rgba(255, 165, 0, 0.4);
      filter: blur(0px);
    }
    50% { 
      text-shadow: 0 0 20px rgba(255, 140, 0, 0.8), 0 0 30px rgba(255, 165, 0, 0.6), 0 0 40px rgba(255, 69, 0, 0.3);
      filter: blur(0.5px);
    }
  }
`;

const sandDrift = `
  @keyframes sandDrift {
    0% { transform: translateX(-100px) translateY(0px) rotate(0deg); opacity: 0; }
    25% { transform: translateX(-50px) translateY(-10px) rotate(90deg); opacity: 0.7; }
    75% { transform: translateX(50px) translateY(10px) rotate(270deg); opacity: 0.5; }
    100% { transform: translateX(100px) translateY(-5px) rotate(360deg); opacity: 0; }
  }
`;

const heatRise = `
  @keyframes heatRise {
    0% { transform: translateY(20px) scaleY(0.8); opacity: 0; }
    50% { transform: translateY(-10px) scaleY(1.2); opacity: 0.6; }
    100% { transform: translateY(-40px) scaleY(0.6); opacity: 0; }
  }
`;

const cardStyles = `
  .desert-card {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 350px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 8px 32px rgba(139, 69, 19, 0.3);
    border: 2px solid rgba(210, 180, 140, 0.5);
  }

  .desert-card:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 20px 60px rgba(139, 69, 19, 0.5), 0 0 40px rgba(255, 140, 0, 0.2);
    border-color: rgba(255, 140, 0, 0.7);
  }

  .gif-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('./assets/Thme2/sand1.jpg') center/cover;
    filter: sepia(0.3) saturate(1.2) brightness(0.8);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      rgba(139, 69, 19, 0.7) 0%,
      rgba(160, 82, 45, 0.5) 25%,
      rgba(210, 180, 140, 0.3) 50%,
      rgba(244, 164, 96, 0.4) 75%,
      rgba(139, 69, 19, 0.6) 100%
    );
    backdrop-filter: blur(1px);
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    text-align: center;
  }

  .desert-title {
    color: #FF8C00;
    font-size: clamp(1.2rem, 3.5vw, 1.5rem);
    font-weight: 900;
    letter-spacing: 2px;
    margin-bottom: 1rem;
    animation: mirageShimmer 3s infinite ease-in-out;
    text-transform: uppercase;
    text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.8);
  }

  .vision-text {
    color: #D2B48C;
    font-size: clamp(0.9rem, 2.2vw, 1rem);
    margin-bottom: 1.5rem;
    opacity: 0.9;
    font-style: italic;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }

  .desert-button {
    background: linear-gradient(45deg, #CD853F, #D2691E, #A0522D);
    border: 2px solid #8B4513;
    border-radius: 25px;
    padding: 12px 24px;
    color: #FFDAB9;
    font-weight: bold;
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.4);
    backdrop-filter: blur(4px);
    margin-bottom: 1.5rem;
  }

  .desert-button:hover {
    background: linear-gradient(45deg, #D2691E, #FF8C00, #CD853F);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 69, 19, 0.6);
    color: white;
  }

  .status-grid {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .status-orb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: 0 0 15px currentColor;
    animation: mirageShimmer 2s infinite ease-in-out;
  }

  .status-orb.ready { color: #FF8C00; background: #FF8C00; }
  .status-orb.content { color: #DEB887; background: #DEB887; animation-delay: 0.7s; }

  .status-label {
    color: #D2B48C;
    font-size: clamp(0.6rem, 1.5vw, 0.7rem);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .progress-section {
    width: 100%;
    max-width: 250px;
  }

  .progress-track {
    background: rgba(139, 69, 19, 0.3);
    border-radius: 10px;
    height: 6px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .progress-fill {
    height: 100%;
    width: 85%;
    background: linear-gradient(90deg, #FF8C00, #FFD700, #FF8C00);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }

  .progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: progressShine 2s infinite;
  }

  @keyframes progressShine {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  .progress-text {
    color: #DEB887;
    font-size: clamp(0.7rem, 1.8vw, 0.8rem);
    margin-top: 0.75rem;
    opacity: 0.9;
    text-align: center;
  }

  .sand-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #D2B48C;
    border-radius: 50%;
    pointer-events: none;
    animation: sandDrift 6s infinite linear;
    box-shadow: 0 0 4px rgba(210, 180, 140, 0.8);
  }

  .sand-particle:nth-child(2) { animation-delay: -2s; background: #DEB887; }
  .sand-particle:nth-child(3) { animation-delay: -4s; background: #F4A460; }
  .sand-particle:nth-child(4) { animation-delay: -1s; background: #CD853F; }
  .sand-particle:nth-child(5) { animation-delay: -3s; background: #D2B48C; }

  .heat-wave {
    position: absolute;
    width: 20px;
    height: 30px;
    background: radial-gradient(ellipse, rgba(255, 140, 0, 0.2), transparent);
    animation: heatRise 4s infinite ease-in-out;
    pointer-events: none;
  }

  .heat-wave:nth-child(2) { animation-delay: -1s; }
  .heat-wave:nth-child(3) { animation-delay: -2s; }

  @media screen and (max-width: 768px) {
    .desert-card { min-height: 280px; }
    .content-wrapper { padding: 1.5rem; }
    .status-grid { gap: 1rem; }
  }

  @media screen and (max-width: 480px) {
    .desert-card { min-height: 250px; }
    .content-wrapper { padding: 1rem; }
    .status-grid { gap: 0.75rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .desert-card, .desert-title, .status-orb, .progress-fill::after,
    .sand-particle, .heat-wave {
      animation: none !important;
    }
  }

  ${mirageShimmer}
  ${sandDrift}
  ${heatRise}
`;

const DesertVRCard = ({ onVideoSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/vrvideos");
  };


  return (
    <>
      <style>{cardStyles}</style>
      <div 
        className="desert-card"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCardClick();
          }
        }}
      >
        
        {/* Overlay for better text readability */}
        <div className="overlay" />

        {/* Animated sand particles */}
        <div className="sand-particle" style={{ top: '20%', right: '15%' }} />
        <div className="sand-particle" style={{ top: '60%', left: '10%' }} />
        <div className="sand-particle" style={{ top: '80%', right: '25%' }} />
        <div className="sand-particle" style={{ top: '40%', left: '80%' }} />
        <div className="sand-particle" style={{ top: '30%', left: '50%' }} />

        {/* Heat wave effects */}
        <div className="heat-wave" style={{ bottom: '20%', left: '20%' }} />
        <div className="heat-wave" style={{ bottom: '30%', right: '30%' }} />
        <div className="heat-wave" style={{ bottom: '25%', left: '70%' }} />

        {/* Main Content */}
        <div className="content-wrapper" onClick={handleCardClick}>
          <h1 className="desert-title">
            Desert of Consequences
          </h1>

          <p className="vision-text">
            Witness the harsh reality of environmental neglect
          </p>

          <button 
            className="desert-button"
          >
            Journey Into VR
          </button>

          <div className="status-grid">
            <div className="status-item">
              <div className="status-orb ready" />
              <span className="status-label">System Ready</span>
            </div>
            <div className="status-item">
              <div className="status-orb content" />
              <span className="status-label">4 Scenarios</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
            <div className="progress-text">
              Experience Library: Fully Loaded
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesertVRCard;