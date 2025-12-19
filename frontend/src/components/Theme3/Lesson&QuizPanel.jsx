import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* Utility */
const getStatusColor = (status) => {
  switch (status) {
    case 'CRITICAL': return '#ff6b6b';
    case 'URGENT': return '#ffb86b';
    case 'PENDING': return '#f0d86b';
    case 'ONGOING': return '#86c28e';
    case 'RESOLVED': return '#7db07f';
    case 'ARCHIVED': return '#9aa8b0';
    default: return '#9aa8b0';
  }
};

/* panelBase inspired by UrgentPanel visuals */
const panelBase = {
  background: 'linear-gradient(135deg, rgba(8,12,24,0.85), rgba(14,24,40,0.8))',
  border: '1px solid rgba(70,130,180,0.18)',
  borderRadius: '12px',
  padding: '14px',
  backdropFilter: 'blur(8px)',
  boxShadow: 'inset 0 0 18px rgba(30,60,100,0.06), 0 14px 30px rgba(0,0,0,0.45)',
};

/* Machine noise hook (unchanged functionality but robust) */
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
const LessonQuizPanel = ({ onClose }) => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('victims');
  const [particles, setParticles] = useState([]);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [isMuted, setIsMuted] = useState(true);

  const { playHover, playAction } = useMachineNoise();
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  /* floating particles for subtle motion (inspired by UrgentPanel) */
  useEffect(() => {
    const create = () => {
      const id = Date.now() + Math.random();
      const left = Math.random() * 100;
      const size = 1 + Math.random() * 3;
      const dur = 4 + Math.random() * 3;
      setParticles(p => [...p, { id, left, size, dur }]);
      setTimeout(() => setParticles(p => p.filter(x => x.id !== id)), (dur + 0.2) * 1000);
    };
    const t = setInterval(create, 2000);
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
    { id: 1, title: "The Last Voice of Sector 7", description: "A mother's final message to her children", video: "/assets/login.mp4", thumbnail: "/assets/thumb1.png", status: "CRITICAL" },
    { id: 2, title: "The Factory Worker's Plea", description: "Industrial accident survivor testimony", video: "/assets/poll.mp4", thumbnail: "/assets/thumb2.png", status: "URGENT" },
    { id: 3, title: "The Farmer's Lament", description: "Crop failure and soil contamination story", video: "/assets/Theme_1.mp4", thumbnail: "/assets/thumb3.png", status: "PENDING" },
    { id: 4, title: "The Child's Cry", description: "Young victim of air pollution", video: "/assets/login.mp4", thumbnail: "/assets/thumb4.png", status: "CRITICAL" },
    { id: 5, title: "The Elder's Warning", description: "Environmental activist's final testimony", video: "/assets/elder.mp4", thumbnail: "/assets/thumb1.png", status: "URGENT" },
    { id: 6, title: "The Student's Hope", description: "Young environmental advocate's message", video: "/assets/student.mp4", thumbnail: "/assets/thumb1.png", status: "PENDING" }
  ];

  const disasterStories = [
    { id: 1, title: "The Great Chemical Spill", description: "Industrial disaster that changed everything", video: "/assets/0831.mp4", thumbnail: "/assets/thumb1.png", status: "ARCHIVED" },
    { id: 2, title: "The Water Crisis", description: "Contamination of the main water supply", video: "/assets/poll.mp4", thumbnail: "/assets/thumb1.png", status: "ONGOING" },
    { id: 3, title: "The Air Purge", description: "Toxic air event that lasted 72 hours", video: "/assets/Theme_1.mp4", thumbnail: "/assets/thumb1.png", status: "RESOLVED" },
    { id: 4, title: "The Soil Death", description: "Agricultural land becomes wasteland", video: "/assets/login.mp4", thumbnail: "/assets/thumb1.png", status: "CRITICAL" },
    { id: 5, title: "The Forest Fire", description: "Wildfire that consumed 10,000 hectares", video: "/assets/fire.mp4", thumbnail: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1dedc?w=400&h=300&fit=crop&q=60", status: "ARCHIVED" },
    { id: 6, title: "The Ocean Dead Zone", description: "Marine ecosystem collapse event", video: "/assets/ocean.mp4", thumbnail: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop&q=60", status: "ONGOING" }
  ];

  const currentStories = selectedSection === 'victims' ? victimStories : disasterStories;

  const handleStoryClick = (story) => {
    playAction();
    setSelectedVideo(story);
    setShowVideoPlayer(true);
  };

  const updateVideoProgress = (videoId, progress) => {
    setVideoProgress(prev => ({ ...prev, [videoId]: Math.min(100, Math.max(0, progress)) }));
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

  const handleClose = () => {
    playAction();
    if (onClose && typeof onClose === 'function') {
      onClose();
      return;
    }
    // fallback: navigate back (likely to T4 dashboard)
    try {
      navigate(-1);
    } catch {
      window.location.href = '/';
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', 'Inter', system-ui, -apple-system, sans-serif",
      background: 'radial-gradient(800px 400px at 10% 10%, rgba(20,30,50,0.06), transparent), linear-gradient(180deg, #07111a 0%, #071a25 100%)',
      color: '#dbeefc',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Ambient audio */}
      <audio ref={audioRef} src="/assets/rain.mp3" loop preload="auto" style={{ display: 'none' }} />

      {/* Ambient background video */}
      <video ref={videoRef} src="/assets/rain.mp4" autoPlay loop muted playsInline style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.4) saturate(0.85)'
      }} />

      {/* subtle floating particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          top: `${10 + Math.random() * 80}%`,
          left: `${p.left}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          background: 'rgba(135,206,235,0.06)',
          borderRadius: '50%',
          boxShadow: '0 4px 18px rgba(70,130,180,0.06)',
          transform: `translateY(${Math.random() * 20}px)`,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.9
        }} />
      ))}

      {/* Main container */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        padding: 'clamp(12px, 2.5vw, 20px)',
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 320px) 1fr',
        gridTemplateRows: 'auto 1fr',
        gap: 'clamp(10px, 1.5vw, 18px)',
        minHeight: '100vh',
        boxSizing: 'border-box'
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
          background: 'linear-gradient(90deg, rgba(12,20,32,0.72), rgba(8,18,28,0.6))',
          border: '1px solid rgba(70,130,180,0.12)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={handleToggleAudio} onMouseEnter={playHover} style={{
              ...panelBase,
              padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              background: isMuted ? 'linear-gradient(180deg, rgba(70,110,140,0.18), rgba(40,60,80,0.06))' : 'linear-gradient(90deg, rgba(60,130,190,0.16), rgba(90,160,210,0.12))'
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: 6,
                background: isMuted ? 'rgba(255,120,120,0.9)' : 'rgba(120,220,160,0.95)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
              }} />
              <div style={{ color: '#dbeefc', fontWeight: 600, fontSize: '0.9rem' }}>
                {isMuted ? 'ENABLE AUDIO' : 'AUDIO: ON'}
              </div>
            </button>
          </div>

          <h1 style={{ margin: 0, color: '#e6f7ff', fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 700, letterSpacing: 1 }}>
            IF I COULD SPEAK
          </h1>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleClose} onMouseEnter={playHover} style={{
              ...panelBase,
              display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', padding: '8px 12px'
            }}>
              <X size={16} />
              <span style={{ color: '#dbeefc', fontWeight: 600 }}>CLOSE</span>
            </button>
          </div>
        </header>

        {/* Sidebar nav */}
        <nav style={{
          gridRow: '2 / span 1',
          background: 'linear-gradient(180deg, rgba(10,20,30,0.55), rgba(8,16,28,0.45))',
          padding: 18,
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          border: '1px solid rgba(70,130,180,0.08)'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#aee6ff', fontWeight: 700, marginBottom: 6 }}>SECTIONS</div>
          <button onClick={() => { playAction(); setSelectedSection('victims'); }} onMouseEnter={playHover}
            style={{
              padding: 12,
              borderRadius: 8,
              textAlign: 'left',
              cursor: 'pointer',
              background: selectedSection === 'victims' ? 'linear-gradient(90deg, rgba(65,130,190,0.14), rgba(40,90,140,0.06))' : 'transparent',
              border: '1px solid rgba(255,255,255,0.03)',
              color: selectedSection === 'victims' ? '#e9fbff' : '#bfe8ff',
              fontWeight: 600
            }}>
            VICTIM STORIES
          </button>

          <button onClick={() => { playAction(); setSelectedSection('disasters'); }} onMouseEnter={playHover}
            style={{
              padding: 12,
              borderRadius: 8,
              textAlign: 'left',
              cursor: 'pointer',
              background: selectedSection === 'disasters' ? 'linear-gradient(90deg, rgba(65,130,190,0.14), rgba(40,90,140,0.06))' : 'transparent',
              border: '1px solid rgba(255,255,255,0.03)',
              color: selectedSection === 'disasters' ? '#e9fbff' : '#bfe8ff',
              fontWeight: 600
            }}>
            DISASTERS FACED
          </button>

          <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: '#9fcff6', opacity: 0.9 }}>
            Lessons & survivor stories — immersive visual design
          </div>
        </nav>

        {/* Main content */}
        <main style={{
          gridRow: '2 / span 1',
          background: 'linear-gradient(180deg, rgba(8,14,26,0.55), rgba(6,12,20,0.6))',
          borderRadius: 12,
          padding: 18,
          overflowY: 'auto',
          border: '1px solid rgba(70,130,180,0.06)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18
          }}>
            {currentStories.map(story => (
              <StoryCard key={story.id} story={story} progress={videoProgress[story.id] || 0}
                onClick={() => handleStoryClick(story)} onMouseEnter={playHover} />
            ))}
          </div>
        </main>
      </div>

      {/* Video modal */}
      {showVideoPlayer && selectedVideo && (
        <VideoPlayerModal video={selectedVideo} onClose={() => setShowVideoPlayer(false)}
          onProgress={(p) => updateVideoProgress(selectedVideo.id, p)} playHover={playHover} playAction={playAction} />
      )}

      {/* scoped styles */}
      <style jsx>{`
        /* scrollbars */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(10,18,28,0.3); }
        ::-webkit-scrollbar-thumb { background: rgba(70,130,180,0.18); border-radius: 6px; }

        @media (max-width: 880px) {
          div[style*="grid-template-columns: minmax(260px, 320px) 1fr"] {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto 1fr !important;
          }
          nav { flex-direction: row; overflow-x: auto; gap: 8px; }
        }
      `}</style>
    </div>
  );
};

/* StoryCard component (keeps same behavior, richer styling) */
const StoryCard = ({ story, progress, onClick, onMouseEnter }) => (
  <div onClick={onClick} onMouseEnter={onMouseEnter} role="button" tabIndex={0}
    style={{
      borderRadius: 12,
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 180ms ease, box-shadow 180ms ease',
      background: 'linear-gradient(180deg, rgba(10,18,28,0.45), rgba(6,12,20,0.5))',
      border: '1px solid rgba(70,130,180,0.06)',
      boxShadow: '0 8px 24px rgba(3,8,14,0.6)',
    }}
    onMouseDown={() => { /* small press effect handled by browser */ }}
    onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
  >
    <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
      <img src={story.thumbnail || 'https://via.placeholder.com/640x360'} alt={story.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', left: 10, top: 10, padding: '6px 8px', borderRadius: 8, background: 'rgba(0,0,0,0.35)', color: '#fff', fontWeight: 700, fontSize: 12 }}>
        {story.status}
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: 'rgba(255,255,255,0.04)' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg,#68b0d8,#bfe8ff)', transition: 'width 280ms ease' }} />
      </div>
    </div>

    <div style={{ padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ color: '#cfeeff', fontWeight: 700 }}>{story.title}</div>
        <Play size={18} color="#bfe8ff" />
      </div>
      <div style={{ color: '#9fd8ff', opacity: 0.95, fontSize: 14 }}>{story.description}</div>
    </div>
  </div>
);

/* Video modal (unchanged behavior, improved visual) */
const VideoPlayerModal = ({ video, onClose, onProgress, playHover, playAction }) => {
  const vidRef = useRef(null);
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const handler = (e) => {
      if (!e.target.duration) return;
      const pct = (e.target.currentTime / e.target.duration) * 100;
      onProgress(pct);
    };
    v.addEventListener('timeupdate', handler);
    return () => v.removeEventListener('timeupdate', handler);
  }, [onProgress]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(3,8,14,0.88)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1200
    }}>
      <div style={{
        width: '92vw', maxWidth: 1100, borderRadius: 12, overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(8,12,18,0.9), rgba(6,10,16,0.95))', border: '1px solid rgba(70,130,180,0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
          <div style={{ color: '#e8f9ff', fontWeight: 700 }}>{video.title}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { playAction(); onClose(); }} onMouseEnter={playHover} style={{
              padding: '8px 10px', borderRadius: 8, cursor: 'pointer', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)', color: '#dbeefc'
            }}><X size={16} /></button>
          </div>
        </div>

        <video ref={vidRef} src={video.video} controls autoPlay style={{ width: '100%', background: '#000' }} />
      </div>
    </div>
  );
};

export default LessonQuizPanel;