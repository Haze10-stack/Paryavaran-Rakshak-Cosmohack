import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* Cherry blossom inspired panel base */
const panelBase = {
background: 'linear-gradient(135deg, rgba(139,69,101,0.85), rgba(72,39,57,0.8))',
  border: '1px solid rgba(255,182,193,0.5)',
  borderRadius: '12px',
  padding: '14px',
  backdropFilter: 'blur(8px)',
  boxShadow: 'inset 0 0 20px rgba(255,182,193,0.2), 0 14px 30px rgba(139,69,101,0.6)',
};

/* Machine noise hook */
const useMachineNoise = () => {
  const audioCtxRef = useRef(null);

  const ensureCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playClick = (frequency = 180, durationMs = 90, gainValue = 0.08) => {
    const ctx = ensureCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(frequency, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + durationMs / 1000 + 0.02);
    } catch (e) { /* silence audio exceptions */ }
  };

  const playGentleChime = (durationMs = 120, gainValue = 0.04) => {
    const ctx = ensureCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + durationMs / 1000);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);
      
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + durationMs / 1000 + 0.02);
    } catch (e) { /* silence audio exceptions */ }
  };

  return useMemo(() => ({
    playHover: () => {
      playClick(160, 80, 0.06);
      setTimeout(() => playGentleChime(100, 0.03), 35);
    },
    playAction: () => {
      playClick(220, 120, 0.09);
      playGentleChime(150, 0.05);
    },
  }), []);
};

/* Main component */
const MissionDashboard = ({ onClose }) => {
  const [selectedMission, setSelectedMission] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const { playHover, playAction } = useMachineNoise();
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  /* Floating cherry blossom petals */
  useEffect(() => {
    const createParticle = () => {
      const id = Date.now() + Math.random();
      const left = Math.random() * 100;
      const size = Math.random() * 8 + 6;
      const dur = Math.random() * 3 + 5;
      const petalType = Math.floor(Math.random() * 4);
      const rotation = Math.random() * 360;
      
      setParticles(p => [...p, { id, left, size, dur, petalType, rotation }]);
      setTimeout(() => setParticles(p => p.filter(x => x.id !== id)), (dur + 0.2) * 1000);
    };
    const t = setInterval(createParticle, 2000);
    return () => clearInterval(t);
  }, []);

  /* ensure audio loops */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);

  const missions = [
    {
      id: 1,
      title: "Operation Verdant Dawn",
      description: "Establish a resilient tree corridor by planting native saplings and protecting them until established.",
      briefing: "The city has allocated a neglected stretch of Riverside Municipal Park for ecological restoration. Your team will plant native saplings, prepare planting pits, apply mulch, and install simple protection (stakes/tree-guards) to ensure initial survival. Prioritize native species, work with the community volunteers on site, and tag each tree with a GPS marker and care log entry. Time your digging to avoid root damage, conserve topsoil for backfill, and coordinate water resupply for the first 2–4 weeks. This is a community-forward operation: educate passersby, recruit one volunteer per 10 saplings, and leave the site cleaner than you found it.",
      duration: "Estimated 3–5 hours (plus follow-up watering shifts over 4 weeks)",
      difficulty: "Medium",
      location: "Riverside Municipal Park — Sector 7 (near the north embankment)",
      rewards:'10pts',
      image:'./assets/M1.png'
    },
    {
      id: 2,
      title: "Moonlit River Cleanse",
      description: "Restore and clean urban waterways — remove trash, invasive debris, and pollutants to revive aquatic habitats.",
      briefing: "Under the cover of twilight, your crew will perform a coordinated cleanup of the Riverbend & Lakeshore District. Focus on removing plastic, fishing lines, tires, and other debris from the water and shoreline; install temporary silt traps where needed; and collect water samples for basic turbidity and pollutant logging. Work in small teams with one safety spotter each, use PPE and headlamps to minimize disturbance to wildlife, and coordinate with municipal waste crews for proper disposal and recycling. Engage local anglers and residents — recruit volunteers, teach quick best-practices for preventing future pollution, and place signage with 'Do Not Dump' and contact info. Document GPS locations of heavy deposits and submit a short post-op report with photos and recommended follow-up actions (restoration plantings, barriers, or community monitoring).",
      duration: "Estimated 4–8 hours (plus waste sorting and reporting)",
      difficulty: "Medium",
      location: "Riverbend & Lakeshore District — North Shoreline and Marina Area",
      rewards:'10pts',
      image: './assets/River.png'
    },
    {
      id: 3,
      title: "Pink Dawn Cleanup",
      description: "Launch a cleanliness drive in your surroundings",
      briefing: "Your mission is to unite the community to clean streets, parks, and public spaces. Remove litter, segregate waste, and spread awareness about keeping the environment clean. Work swiftly and inspire others to join the movement.",
      duration: "Estimated 4-6 hours",
      difficulty: "Low",
      location: "Neighborhood Streets & Parks",
      rewards:'10pts',
      image: './assets/M3.png'
    },
    { 
      id: 4, 
      title: "Operation Raincatcher", 
      description: "Set up systems to collect and conserve rainwater", 
      briefing: "Deploy rainwater harvesting methods in households, schools, and community centers. Install collection barrels, guide rooftop runoff, and ensure proper storage for reuse. The objective is to conserve every drop and promote sustainable water use.", 
      duration: "Estimated 5-7 hours", 
      difficulty: "Medium", 
      location: "Community Rooftops & Open Spaces",
      rewards:'10pts',
      image: './assets/M4.png' 
}
  ];


  const handleMissionSelect = (index) => {
    playAction();
    setSelectedMission(index);
  };

  const handleToggleAudio = async () => {
    playAction();
    const audio = audioRef.current;
    if (!audio) {
      setIsMuted(true);
      return;
    }
    if (isMuted) {
      try { audio.muted = false; await audio.play(); } catch {}
      setIsMuted(false);
    } else {
      try { audio.pause(); } catch {}
      setIsMuted(true);
    }
  };

  const navigate = useNavigate();

  const handleClose = () => {
    // prefer calling the parent onClose if provided
    if (onClose && typeof onClose === 'function') {
      onClose();
      return;
    }
    // otherwise navigate back to the Theme 5 dashboard
    navigate('/theme5dashboard');
  };

  return (
    <div style={{
      fontFamily: "'Courier New', monospace",
      background: 'radial-gradient(1200px 600px at 50% 30%, rgba(139, 69, 101, 0.95), rgba(72, 39, 57, 0.98))',
      color: '#fce4ec',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Ambient audio */}
      <audio ref={audioRef} src="/assets/cherry.mp3" loop preload="auto" style={{ display: 'none' }} />

      {/* Ambient background video with cherry blossom filter */}
      <video ref={videoRef} src="/assets/cherry.mp4" autoPlay loop muted playsInline style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0,
      }} />

      {/* Cherry blossom overlay with pink tints */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'linear-gradient(180deg, rgba(219, 112, 147, 0.15) 0%, rgba(199, 21, 133, 0.2) 50%, rgba(139, 69, 101, 0.25) 100%)', 
        zIndex: 2, 
        pointerEvents: 'none' 
      }} />

      {/* Floating cherry blossom petals */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          top: `-20px`,
          left: `${p.left}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          background: p.petalType === 0 
            ? 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 50%, #FF1493 100%)'
            : p.petalType === 1
            ? 'linear-gradient(135deg, #FFCCCB 0%, #FFC0CB 50%, #FF69B4 100%)'
            : p.petalType === 2
            ? 'linear-gradient(135deg, #F8BBD9 0%, #E91E63 50%, #C2185B 100%)'
            : 'linear-gradient(135deg, #FFE4E1 0%, #FF91A4 50%, #FF1493 100%)',
          borderRadius: p.petalType === 0 
            ? '50% 0 50% 0'
            : p.petalType === 1
            ? '0 50% 50% 50%'
            : p.petalType === 2
            ? '50% 50% 0 50%'
            : '80% 20% 80% 20%',
          animation: `petalfall ${p.dur}s ease-in-out`,
          zIndex: 1,
          transform: `rotate(${p.rotation}deg)`,
          boxShadow: '0 2px 8px rgba(255, 182, 193, 0.4)',
          filter: 'brightness(1.1) saturate(1.2)',
          opacity: 0.9,
          pointerEvents: 'none'
        }} />
      ))}

      {/* Butterfly GIF in top left corner */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        animation: 'butterflyFloat 6s ease-in-out infinite'
      }}>
        <img 
          src="/assets/butterfly.gif" 
          alt="Butterfly" 
          style={{
            width: 'clamp(40px, 8vw, 80px)',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.6)) hue-rotate(300deg) saturate(1.3)'
          }}
        />
      </div>

      {/* Cat GIF in bottom left corner */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 10,
      }}>
        <img 
          src="/assets/meow.gif" 
          alt="Cat" 
          style={{
            width: 'clamp(80px, 15vw, 160px)',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.6)) hue-rotate(300deg) saturate(1.3)'
          }}
        />
      </div>

      {/* Main container */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        padding: 'clamp(12px, 2.5vw, 20px)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr',
        gap: 'clamp(10px, 1.5vw, 18px)',
        maxHeight: '100vh',
        boxSizing: 'border-box'
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '12px 18px',
          borderRadius: 12,
          background: 'linear-gradient(90deg, rgba(139,69,101,0.72), rgba(72,39,57,0.6))',
          border: '1px solid rgba(255,182,193,0.5)',
          boxShadow: 'inset 0 0 20px rgba(255,182,193,0.2), 0 14px 30px rgba(139,69,101,0.6)'
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={handleToggleAudio} onMouseEnter={playHover} style={{
              ...panelBase,
              padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              background: isMuted ? 'linear-gradient(180deg, rgba(255,182,193,0.3), rgba(139,69,101,0.2))' : 'linear-gradient(90deg, rgba(255,105,180,0.4), rgba(255,182,193,0.3))'
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: 6,
                background: isMuted ? 'rgba(255,120,120,0.9)' : 'rgba(120,220,160,0.95)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
              }} />
              <div style={{ color: '#fce4ec', fontWeight: 600, fontSize: '0.9rem' }}>
                {isMuted ? 'ENABLE AUDIO' : 'AUDIO: ON'}
              </div>
            </button>
          </div>

          <h1 style={{ margin: 0, color: '#fce4ec', fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 700, letterSpacing: 1 }}>
            MISSION SELECT
          </h1>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleClose} onMouseEnter={playHover} style={{
              ...panelBase,
              display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', padding: '8px 12px'
            }}>
              <X size={16} />
              <span style={{ color: '#fce4ec', fontWeight: 600 }}>CLOSE</span>
            </button>
          </div>
        </header>

        {/* Main content area - split layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(12px, 2vw, 24px)',
          height: '100%',
          overflow: 'hidden'
        }}>
          {/* Mission list (left side) */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(139,69,101,0.55), rgba(72,39,57,0.45))',
            borderRadius: 12,
            border: '1px solid rgba(255,182,193,0.3)',
            boxShadow: 'inset 0 0 20px rgba(255,182,193,0.1), 0 8px 20px rgba(139,69,101,0.4)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Mission list header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,182,193,0.3)',
              background: 'linear-gradient(90deg, rgba(255,182,193,0.1), rgba(255,105,180,0.05))',
              flexShrink: 0
            }}>
              <h2 style={{ 
                margin: 0, 
                color: '#fce4ec', 
                fontSize: '1.1rem', 
                fontWeight: 700,
                textAlign: 'center'
              }}>
                AVAILABLE MISSIONS
              </h2>
            </div>

            {/* Mission list */}
            <div style={{ 
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              flex: 1,
              overflowY: 'auto'
            }}>
              {missions.map((mission, index) => (
                <MissionItem 
                  key={mission.id}
                  mission={mission}
                  isSelected={selectedMission === index}
                  onClick={() => handleMissionSelect(index)}
                  onMouseEnter={playHover}
                />
              ))}
            </div>
          </div>

          {/* Mission details (right side) */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(139,69,101,0.45), rgba(72,39,57,0.5))',
            borderRadius: 12,
            border: '1px solid rgba(255,182,193,0.3)',
            boxShadow: 'inset 0 0 20px rgba(255,182,193,0.1), 0 8px 20px rgba(139,69,101,0.4)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Mission details header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,182,193,0.3)',
              background: 'linear-gradient(90deg, rgba(255,182,193,0.1), rgba(255,105,180,0.05))',
              flexShrink: 0
            }}>
              <h2 style={{ 
                margin: 0, 
                color: '#fce4ec', 
                fontSize: '1.1rem', 
                fontWeight: 700,
                textAlign: 'center'
              }}>
                MISSION BRIEFING
              </h2>
            </div>

            {/* Mission image and details - SCROLLABLE CONTAINER */}
            <div style={{
              flex: 1,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              overflowY: 'auto'
            }}>
              {/* Mission image - with zoom effect - 1024x1024 aspect ratio */}
              <div style={{
                width: '100%',
                aspectRatio: '1 / 1',
                maxWidth: '800px',
                maxHeight : '400px',
                margin: '0 auto',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '8px',
                border: '1px solid rgba(255,182,193,0.2)',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0
              }}>
                <img 
                  src={missions[selectedMission].image}
                  alt={missions[selectedMission].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="mission-image-hover"
                />
              </div>

              {/* Mission info - with hover effect for background/text color swap */}
              <div 
                style={{
                  background: isInfoHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255,182,193,0.1)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,182,193,0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                onMouseEnter={() => setIsInfoHovered(true)}
                onMouseLeave={() => setIsInfoHovered(false)}
              >
                <h3 style={{ 
                  margin: '0 0 12px 0', 
                  color: isInfoHovered ? '#FF69B4' : '#fce4ec', 
                  fontSize: '2rem', 
                  fontWeight: 700,
                  transition: 'color 0.3s ease'
                }}>
                  {missions[selectedMission].title}
                </h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ 
                    margin: '0 0 8px 0', 
                    color: isInfoHovered ? '#FF1493' : '#FFB6C1', 
                    fontSize: '1rem', 
                    fontWeight: 600,
                    transition: 'color 0.3s ease'
                  }}>
                    Mission Briefing:
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    color: isInfoHovered ? '#C2185B' : '#FFCCCB', 
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    transition: 'color 0.3s ease'
                  }}>
                    {missions[selectedMission].briefing}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <h4 style={{ 
                      margin: '0 0 4px 0', 
                      color: isInfoHovered ? '#FF1493' : '#FFB6C1', 
                      fontSize: '0.9rem', 
                      fontWeight: 600,
                      transition: 'color 0.3s ease'
                    }}>
                      Duration:
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      color: isInfoHovered ? '#C2185B' : '#FFCCCB', 
                      fontSize: '0.85rem',
                      transition: 'color 0.3s ease'
                    }}>
                      {missions[selectedMission].duration}
                    </p>
                  </div>

                  <div>
                    <h4 style={{ 
                      margin: '0 0 4px 0', 
                      color: isInfoHovered ? '#FF1493' : '#FFB6C1', 
                      fontSize: '0.9rem', 
                      fontWeight: 600,
                      transition: 'color 0.3s ease'
                    }}>
                      Difficulty:
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      color: isInfoHovered ? '#C2185B' : '#FFCCCB', 
                      fontSize: '0.85rem',
                      transition: 'color 0.3s ease'
                    }}>
                      {missions[selectedMission].difficulty}
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ 
                    margin: '0 0 4px 0', 
                    color: isInfoHovered ? '#FF1493' : '#FFB6C1', 
                    fontSize: '0.9rem', 
                    fontWeight: 600,
                    transition: 'color 0.3s ease'
                  }}>
                    Location:
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    color: isInfoHovered ? '#C2185B' : '#FFCCCB', 
                    fontSize: '0.85rem',
                    transition: 'color 0.3s ease'
                  }}>
                    {missions[selectedMission].location}
                  </p>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ 
                    margin: '0 0 4px 0', 
                    color: isInfoHovered ? '#FF1493' : '#FFB6C1', 
                    fontSize: '0.9rem', 
                    fontWeight: 600,
                    transition: 'color 0.3s ease'
                  }}>
                    Rewards:
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    color: isInfoHovered ? '#C2185B' : '#FFCCCB', 
                    fontSize: '0.85rem',
                    transition: 'color 0.3s ease'
                  }}>
                    {missions[selectedMission].rewards}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        @keyframes petalfall {
          0% { 
            transform: translateY(-20px) rotate(0deg) translateX(0px); 
            opacity: 0; 
          }
          10% { 
            opacity: 0.9; 
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(30px);
            opacity: 0.8;
          }
          90% { 
            opacity: 0.4; 
          }
          100% { 
            transform: translateY(100vh) rotate(360deg) translateX(-15px); 
            opacity: 0; 
          }
        }

        @keyframes butterflyFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-10px) translateX(5px) rotate(2deg); 
          }
          50% { 
            transform: translateY(-5px) translateX(-8px) rotate(-1deg); 
          }
          75% { 
            transform: translateY(-12px) translateX(3px) rotate(1deg); 
          }
        }

        /* Image zoom effect */
        .mission-image-hover:hover {
          transform: scale(1.1);
        }

        /* scrollbars with cherry blossom theme */
        ::-webkit-scrollbar { 
          width: 8px; 
          height: 8px; 
        }
        ::-webkit-scrollbar-track { 
          background: rgba(139,69,101,0.2); 
          border-radius: 4px; 
        }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(180deg, rgba(255,182,193,0.6), rgba(255,105,180,0.8)); 
          border-radius: 4px; 
          border: 1px solid rgba(139,69,101,0.3); 
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(180deg, rgba(255,182,193,0.8), rgba(255,105,180,1)); 
        }

        /* Add subtle pink glow to interactive elements */
        button:hover, .interactive:hover, [role="button"]:hover {
          box-shadow: 0 0 15px rgba(255, 105, 180, 0.4) !important;
          transition: box-shadow 0.3s ease !important;
        }

        @media (max-width: 880px) {
          div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

/* Mission Item Component */
const MissionItem = ({ mission, isSelected, onClick, onMouseEnter }) => (
  <div
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    role="button"
    tabIndex={0}
    style={{
      padding: '16px',
      borderRadius: '8px',
      cursor: 'pointer',
      background: isSelected 
        ? 'linear-gradient(90deg, rgba(255,105,180,0.3), rgba(255,182,193,0.2))'
        : 'rgba(255,182,193,0.05)',
      border: isSelected 
        ? '1px solid rgba(255,182,193,0.4)' 
        : '1px solid rgba(255,182,193,0.2)',
      color: isSelected ? '#fce4ec' : '#FFCCCB',
      fontWeight: isSelected ? 700 : 600,
      transition: 'all 0.3s ease',
      boxShadow: isSelected 
        ? '0 0 15px rgba(255, 105, 180, 0.4)' 
        : 'none'
    }}
    onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
  >
    <div style={{
      fontSize: '1rem',
      marginBottom: '4px'
    }}>
      {mission.title}
    </div>
    <div style={{
      fontSize: '0.8rem',
      opacity: 0.8
    }}>
      {mission.description}
    </div>
  </div>
);

export default MissionDashboard;