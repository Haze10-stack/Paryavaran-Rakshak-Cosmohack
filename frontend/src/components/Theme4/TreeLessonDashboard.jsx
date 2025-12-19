import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HoverCard from './HoverCard';

/* Utility */
const getStatusColor = (status) => {
  switch (status) {
    case 'CRITICAL': return '#FF6B6B';
    case 'URGENT': return '#FFB86B';
    case 'PENDING': return '#F0D86B';
    case 'ONGOING': return '#86C28E';
    case 'RESOLVED': return '#7DB07F';
    case 'ARCHIVED': return '#9AA8B0';
    default: return '#9AA8B0';
  }
};

/* Updated nature-themed panel styling */
const panelBase = {
  background: 'rgba(34, 85, 51, 0.6)',
  border: '1px solid rgba(144, 238, 144, 0.3)',
  borderRadius: '12px',
  padding: '14px',
  backdropFilter: 'blur(8px)',
  boxShadow: 'inset 0 0 18px rgba(144, 238, 144, 0.1), 0 14px 30px rgba(0,0,0,0.3)',
};

/* Machine noise hook (unchanged functionality) */
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

  const playMechanicalBuzz = (durationMs = 140, gainValue = 0.06) => {
    const ctx = ensureCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const bufferSize = Math.floor(ctx.sampleRate * (durationMs / 1000));
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const env = 1 - i / bufferSize;
        data[i] = (Math.random() * 2 - 1) * 0.6 * env;
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(gainValue, now);
      src.connect(gain).connect(ctx.destination);
      src.start(now);
      src.stop(now + durationMs / 1000 + 0.02);
    } catch (e) { /* silence audio exceptions */ }
  };

  return useMemo(() => ({
    playHover: () => {
      playClick(160, 80, 0.06);
      setTimeout(() => playMechanicalBuzz(110, 0.04), 35);
    },
    playAction: () => {
      playClick(220, 120, 0.09);
      playMechanicalBuzz(180, 0.06);
    },
  }), []);
};

/* Main component */
const TreeLessonDashboard = ({ onClose }) => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('victims');
  const [particles, setParticles] = useState([]);
  const [isMuted, setIsMuted] = useState(true);

  const { playHover, playAction } = useMachineNoise();
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  /* floating leaf particles instead of raindrops */
  useEffect(() => {
    const createParticle = () => {
      const id = Math.random();
      const size = Math.random() * 6 + 4;
      const startPosition = Math.random() * window.innerWidth;
      const animationDuration = Math.random() * 2 + 4;
      const leafType = Math.floor(Math.random() * 3);

      const newParticle = { 
        id, 
        size, 
        left: startPosition, 
        duration: animationDuration,
        leafType,
        rotation: Math.random() * 360
      };
      setParticles(prev => [...prev, newParticle]);
      setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), animationDuration * 1000);
    };
    const t = setInterval(createParticle, 2500);
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

  const victimStories = [
    { 
      id: 1,
      title: "The Echo of Mottainai",
      description: "A call from Earth against waste and neglect",
      thumbnail: "/assets/mottainai.png",
      status: "CRITICAL",
      image: "/assets/mottonaiModal.png", // inside modal
      additionalContent: "\"Every story matters. Every voice deserves to be heard. In the silence of loss, we find the strength to speak for those who cannot.\"",
      text: "Every piece of plastic tossed, every tree cut without care, carries the quiet cry of 'Mottainai'—what a waste. This ancient Japanese word, carried forward by voices like Wangari Maathai, speaks not only of wasted resources but of lost chances to protect our home. From polluted rivers to animals harmed, the world has felt the grief of neglect. Yet, Mottainai also whispers hope: when we reuse, plant, and respect, we heal. The Earth is asking us to listen, before her voice fades into silence.",
      gif: "/assets/Theme4/hover_image.gif"
    },
    {
      id: 2,
      title: "The Guardians of Life",
      description: "A village’s sacrifice to protect nature",
      thumbnail: "/assets/Deer.jpg",
      status: "URGENT",
      image: "/assets/Bishnoi.png",
      text: "In the deserts of Rajasthan, where every drop of water and every tree is precious, the Bishnoi people stood as shields for nature. When hunters and loggers threatened their land, they hugged trees, risked their lives, and defended the blackbucks and forests they saw as family. Their courage turned barren villages into green oases, and their spirit still whispers to us: protect what gives you life, no matter the cost.",
      gif: "/assets/Theme4/hover_image.gif",
      additionalContent: "A legacy of courage, sacrifice, and deep love for the Earth."
    },
    {
      id: 3,
      title: "The Embrace of the Forest",
      description: "A cry of villagers who hugged trees to save life itself",
      thumbnail: "/assets/Chipko.png",
      status: "PENDING",
      image: "/assets/download2.png",
      text: "In the 1970s, as axes threatened the forests of Uttarakhand, villagers wrapped their arms around trees with trembling courage. They were mothers, daughters, and farmers, led by women who stood unarmed before loggers, declaring that no tree would fall while they still breathed. Their embrace was not just for the trees, but for rivers, animals, and the children yet to come. And in their defiance, the forests lived. Rivers ran clean again, wildlife thrived, and the Chipko spirit echoed across the world, teaching us that sometimes, the simplest act—holding on—can change history.",
      gif: "/assets/Theme4/hover_image.gif",
      additionalContent: "The Chipko Movement’s legacy: courage, sacrifice, and hope for generations."
    },
    { 
      id: 4, 
      title: "The Child's Cry", 
      description: "Young victim of air pollution", 
      thumbnail: "/assets/thumb4.png", 
      status: "CRITICAL",
      image: "/assets/thumb4.png",
      text: "Eight-year-old Emma's asthma worsened dramatically when the factory moved to her neighborhood. Her story represents countless children affected by environmental injustice.",
      gif: "/assets/Theme4/hover_image.gif",
      additionalContent: "A child's struggle made visible — a plea for clean air."
    },
  ];

  const disasterStories = [
    {
      id: 1,
      title: "Daisugi: The Art of Giving Without Losing",
      description: "An ancient wisdom showing how to live in harmony with nature",
      thumbnail: "/assets/daisugi.png",
      status: "ARCHIVED",
      image: "/assets/Daisugi.jpg",
      text: "Centuries ago in Japan, forests were vanishing under the weight of human need. But the technique of Daisugi taught a different path—one where trees could give wood without being cut down, where life was shared instead of destroyed. This wisdom reminds us that sustainability is not a modern invention, but an old truth: we can take from the Earth while still protecting it. Let Daisugi inspire us to grow, reuse, and live gently—so that both people and forests thrive together.",
      gif: "/assets/Theme4/hover_image.gif",
      additionalContent: "An ancient lesson of balance — trees giving life without being lost, a reminder to live in harmony with nature."
    },
    {
      id: 2,
      title: "Patagonia: Fashion That Fights for the Planet",
      description: "Turning clothing into a force for environmental change",
      thumbnail: "/assets/Patagonia.png",
      status: "ARCHIVED",
      image: "/assets/shirt.png",
      text: "While fast fashion polluted rivers and filled landfills, Patagonia chose a different path. They created durable clothes from recycled materials, repaired old ones for free, and reinvested profits into protecting forests and rivers. Their story is proof that business can heal instead of harm—showing the world that style and sustainability can walk hand in hand. Patagonia’s movement inspires us all to rethink what we wear and how we live, reminding us that every choice can be an act of courage for the planet.",
      gif: "/assets/Theme4/hover_image.gif",
      additionalContent: "A call to be an eco-hero — reuse, recycle, repair, and wear your values with pride."
    },
    {
      id: 3,
      title: "Toyota’s Kaizen: Small Steps, Big Impact",
      description: "How simple daily improvements can help save the planet",
      thumbnail: "/assets/supra.jpg",
      status: "ARCHIVED",
      image: "/assets/Toyota.jpg",
      text: "Factories once consumed too much energy and created harmful waste, damaging our planet. But Toyota’s Kaizen philosophy changed everything. By encouraging workers to share small, smart ideas every day, Toyota cut waste and saved energy—reducing energy use by 30% and waste by 70%. Their story proves that even the smallest changes can lead to massive impact. Kaizen reminds us that sustainability begins with daily choices, and together, those choices can change the world.",
      gif: "/assets/Theme4/hover_image.gif",
      additionalContent: "Be a Kaizen hero — save energy, reduce waste, and take small steps that create a cleaner, brighter future."
    },
    {
      id: 4,
      title: "Khadi: Spinning Change, Weaving Hope",
      description: "How handwoven fabric became a symbol of eco-pride and freedom",
      thumbnail: "/assets/khadi.jpg",
      status: "ARCHIVED",
      image: "/assets/khadi1.jpg",
      text: "In the 1920s, India faced polluted rivers and chemical-laden clothes from imports. Mahatma Gandhi’s Khadi turned the wheel of change — handwoven fabric from local cotton, spun on charkhas, empowered villages and revived dignity in work. Khadi cut pollution, used natural fibers, and gave livelihoods to rural artisans, while keeping the Earth clean. More than cloth, it became a movement of pride, self-reliance, and sustainability. Today, Khadi still inspires us to wear values, protect nature, and create a greener tomorrow.",
      gif: "/assets/Theme4/hover_image.gif",
      additionalContent: "Spin your change — choose natural, reuse clothes, plant seeds of hope, and make Earth smile."
    }
  ];

  const currentStories = selectedSection === 'victims' ? victimStories : disasterStories;

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

  const gotoDashboard = () => {
    navigate('/theme4dashboard');
  };

  return (
    <div style={{
      fontFamily: "'Courier New', monospace",
      background: 'radial-gradient(1200px 600px at 50% 30%, rgba(34, 85, 51, 0.95), rgba(20, 50, 30, 0.98))',
      color: '#e8f5e8',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Ambient audio */}
      <audio ref={audioRef} src="/assets/rain.mp3" loop preload="auto" style={{ display: 'none' }} />

      {/* Nature-themed background video */}
      <video ref={videoRef} src="/assets/rain.mp4" autoPlay loop muted playsInline style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, 
        filter: 'brightness(0.6) saturate(1.4) hue-rotate(60deg) contrast(1.2)'
      }} />

      {/* Nature overlay with green tints */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'linear-gradient(180deg, rgba(60, 179, 113, 0.15) 0%, rgba(34, 139, 34, 0.2) 50%, rgba(0, 100, 0, 0.25) 100%)', 
        zIndex: 2, 
        pointerEvents: 'none' 
      }} />

      {/* Floating leaves */}
      {particles.map((p) => (
        <div key={p.id} style={{
          position: 'absolute', 
          left: `${p.left}px`, 
          top: '-20px', 
          width: `${p.size}px`, 
          height: `${p.size}px`,
          background: p.leafType === 0 
            ? 'linear-gradient(135deg, #90EE90 0%, #32CD32 50%, #228B22 100%)'
            : p.leafType === 1
            ? 'linear-gradient(135deg, #98FB98 0%, #00FF7F 50%, #00CED1 100%)'
            : 'linear-gradient(135deg, #ADFF2F 0%, #7FFF00 50%, #32CD32 100%)',
          borderRadius: p.leafType === 0 
            ? '0 100% 0 100%'
            : p.leafType === 1
            ? '50% 0 50% 100%'
            : '100% 0 100% 0',
          animation: `leaffall ${p.duration}s ease-in-out`, 
          zIndex: 1, 
          boxShadow: '0 2px 8px rgba(50, 205, 50, 0.3)',
          transform: `rotate(${p.rotation}deg)`,
          filter: 'brightness(1.1) saturate(1.2)'
        }} />
      ))}

      {/* Butterfly GIFs */}
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
            filter: 'drop-shadow(0 0 10px rgba(255, 223, 0, 0.4))'
          }}
        />
      </div>

      <div style={{
        position: 'absolute',
        bottom: 'clamp(120px, 20vw, 130px)',
        right: 'clamp(20px, 4vw, 40px)',
        zIndex: 11,
        animation: 'butterflyFloat 6s ease-in-out infinite'
      }}>
        <img 
          src="/assets/butterfly.gif" 
          alt="Butterfly" 
          style={{
            width: 'clamp(40px, 8vw, 80px)',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(255, 223, 0, 0.4))'
          }}
        />
      </div>

      {/* Plant GIF */}
      <div style={{
        position: 'absolute',
        bottom: '18px',
        right: '18px',
        zIndex: 10,
        borderRadius:'12px'
      }}>
        <img 
          src="/assets/Flower.gif" 
          alt="Plant" 
          style={{
            width: 'clamp(160px, 30vw, 300px)',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(255, 223, 0, 0.4))',
            borderRadius:'12px'
          }}
        />
      </div>

      {/* Main container */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        padding: 'clamp(8px, 2vw, 16px)',
        display: 'grid',
        gridTemplateColumns: window.innerWidth >= 1200 ? 'minmax(260px, 320px) 1fr' : '1fr',
        gridTemplateRows: window.innerWidth >= 768 ? 'auto 1fr' : 'auto auto 1fr',
        gap: 'clamp(10px, 1.5vw, 18px)',
        minHeight: '100vh',
        boxSizing: 'border-box',
        background: 'rgba(34, 85, 51, 0.4)',
        border: '1px solid rgba(144, 238, 144, 0.5)',
        boxShadow: 'inset 0 0 40px rgba(144, 238, 144, 0.2), 0 0 20px rgba(50, 205, 50, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <header style={{
          gridColumn: '1 / -1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '12px 18px',
          borderRadius: 12,
          background: 'rgba(34, 85, 51, 0.8)',
          border: '1px solid rgba(144, 238, 144, 0.3)',
          boxShadow: 'inset 0 0 18px rgba(144, 238, 144, 0.1), 0 6px 18px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={handleToggleAudio} onMouseEnter={playHover} style={{
              ...panelBase,
              padding: '8px 12px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              cursor: 'pointer',
              background: isMuted ? 
                'rgba(34, 85, 51, 0.6)' : 
                'linear-gradient(90deg, rgba(144, 238, 144, 0.3), rgba(50, 205, 50, 0.2))',
              border: `1px solid ${isMuted ? 'rgba(255,120,120,0.5)' : 'rgba(144, 238, 144, 0.5)'}`
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: 6,
                background: isMuted ? 'rgba(255,120,120,0.9)' : 'rgba(144, 238, 144, 0.9)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }} />
              <div style={{ color: '#e8f5e8', fontWeight: 600, fontSize: '0.9rem' }}>
                {isMuted ? 'ENABLE AUDIO' : 'AUDIO: ON'}
              </div>
            </button>
          </div>

          <h1 style={{ 
            margin: 0, 
            color: '#e8f5e8', 
            fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', 
            fontWeight: 700, 
            letterSpacing: 1,
            textShadow: '0 0 20px rgba(144, 238, 144, 0.5)'
          }}>
            Case Studies
          </h1>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={gotoDashboard} onMouseEnter={playHover} style={{
              ...panelBase,
              display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', padding: '8px 12px',
              transition: 'all 0.3s ease'
            }}>
              <X size={16} />
              <span style={{ color: '#e8f5e8', fontWeight: 600 }}>CLOSE</span>
            </button>
          </div>
        </header>

        {/* Sidebar nav */}
        <nav style={{
          gridRow: window.innerWidth >= 768 ? '2 / span 1' : '2',
          gridColumn: window.innerWidth >= 1200 ? '1' : '1',
          background: 'rgba(34, 85, 51, 0.7)',
          padding: 18,
          borderRadius: 12,
          display: 'flex',
          flexDirection: window.innerWidth >= 1200 ? 'column' : 'row',
          gap: 12,
          border: '1px solid rgba(144, 238, 144, 0.3)',
          boxShadow: 'inset 0 0 18px rgba(144, 238, 144, 0.1)',
          overflowX: window.innerWidth < 1200 ? 'auto' : 'visible'
        }}>
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#e8f5e8', 
            fontWeight: 700, 
            marginBottom: window.innerWidth >= 1200 ? 6 : 0,
            marginRight: window.innerWidth < 1200 ? 12 : 0,
            whiteSpace: 'nowrap'
          }}>
            SECTIONS
          </div>
          <button onClick={() => { playAction(); setSelectedSection('victims'); }} onMouseEnter={playHover}
            style={{
              padding: 12,
              borderRadius: 8,
              textAlign: 'left',
              cursor: 'pointer',
              background: selectedSection === 'victims' ? 
                'linear-gradient(90deg, rgba(144, 238, 144, 0.3), rgba(50, 205, 50, 0.2))' : 
                'rgba(34, 85, 51, 0.5)',
              border: '1px solid rgba(144, 238, 144, 0.2)',
              color: selectedSection === 'victims' ? '#e8f5e8' : '#b8e8b8',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              minWidth: window.innerWidth < 1200 ? '150px' : 'auto',
              boxShadow: selectedSection === 'victims' ? '0 0 15px rgba(144, 238, 144, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}>
            Motivation for Preservation
          </button>

          <button onClick={() => { playAction(); setSelectedSection('disasters'); }} onMouseEnter={playHover}
            style={{
              padding: 12,
              borderRadius: 8,
              textAlign: 'left',
              cursor: 'pointer',
              background: selectedSection === 'disasters' ? 
                'linear-gradient(90deg, rgba(144, 238, 144, 0.3), rgba(50, 205, 50, 0.2))' : 
                'rgba(34, 85, 51, 0.5)',
              border: '1px solid rgba(144, 238, 144, 0.2)',
              color: selectedSection === 'disasters' ? '#e8f5e8' : '#b8e8b8',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              minWidth: window.innerWidth < 1200 ? '150px' : 'auto',
              boxShadow: selectedSection === 'disasters' ? '0 0 15px rgba(144, 238, 144, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}>
            Sustainable Techniques
          </button>

          <div style={{ 
            marginTop: window.innerWidth >= 1200 ? 'auto' : 0, 
            marginLeft: window.innerWidth < 1200 ? 'auto' : 0,
            fontSize: '0.8rem', 
            color: '#b8e8b8', 
            opacity: 0.9,
            whiteSpace: 'nowrap'
          }}>
            Lessons & survivor stories
          </div>
        </nav>

        {/* Main content */}
        <main style={{
          gridRow: window.innerWidth >= 768 ? '2 / span 1' : '3',
          gridColumn: window.innerWidth >= 1200 ? '2' : '1',
          background: 'rgba(34, 85, 51, 0.7)',
          borderRadius: 12,
          padding: 18,
          overflowY: 'auto',
          border: '1px solid rgba(144, 238, 144, 0.3)',
          boxShadow: 'inset 0 0 18px rgba(144, 238, 144, 0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18
          }}>
            {currentStories.map(story => (
              /*
                HoverCard props mapping:
                - image: card thumbnail / preview -> use story.thumbnail
                - modalImage: larger image shown inside modal -> use story.image (or story.modalImage if present)
                - gif, text, title, description pass through as-is
              */
              <HoverCard
                key={story.id}
                image={story.thumbnail}
                modalImage={story.modalImage || story.image}
                text={story.text}
                title={story.title}
                description={story.description}
                additionalContent={story.additionalContent}
                gif={story.gif}
                className="w-full h-auto"
              />
            ))}
          </div>
        </main>
      </div>

      {/* Scoped styles with nature theme */}
      <style jsx>{`
        @keyframes leaffall {
          0% { 
            transform: translateY(-20px) rotate(0deg) translateX(0px); 
            opacity: 0; 
          }
          10% { 
            opacity: 0.9; 
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(20px);
            opacity: 0.8;
          }
          90% { 
            opacity: 0.6; 
          }
          100% { 
            transform: translateY(100vh) rotate(360deg) translateX(-10px); 
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

        /* Nature-themed scrollbars */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { 
          background: rgba(34, 139, 34, 0.2);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(180deg, rgba(144, 238, 144, 0.6), rgba(50, 205, 50, 0.8));
          border-radius: 4px;
          border: 1px solid rgba(34, 139, 34, 0.3);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(144, 238, 144, 0.8), rgba(50, 205, 50, 1));
        }

        /* Responsive adjustments */
        @media (max-width: 1199px) {
          div[style*="grid-template-columns: minmax(260px, 320px) 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }

        /* Add nature glow to interactive elements */
        button:hover, .interactive:hover, [role="button"]:hover {
          box-shadow: 0 0 15px rgba(144, 238, 144, 0.4) !important;
          transition: box-shadow 0.3s ease !important;
        }
      `}</style>
    </div>
  );
};

export default TreeLessonDashboard;