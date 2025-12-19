import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

const HoverCard = ({
  // `image` is the small/thumbnail shown on the card preview (left/cover).
  image = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  // `modalImage` is the larger image shown inside the modal when the card is opened.
  // This intentionally does NOT fall back to `image` so you can supply two distinct assets.
  modalImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  text = "This is a beautiful landscape that showcases nature's stunning beauty with mountains, forests, and crystal clear waters.",
  gif = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
  title = "Story Title",
  description = "Story Description",
  // additionalContent is rendered in the modal's extra content area
  additionalContent = "\"Every story matters. Every voice deserves to be heard.\nIn the silence of loss, we find the strength to speak for those who cannot.\"",
  className = "",
  onClick = null
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCardClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* Card */}
      <div
        className={`relative w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 font-ppmond ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        style={{
          background: 'rgba(34, 85, 51, 0.8)',
          border: '1px solid rgba(144, 238, 144, 0.3)',
          boxShadow: 'inset 0 0 18px rgba(144, 238, 144, 0.1), 0 8px 24px rgba(0,0,0,0.4)'
        }}
      >
        {/* Main Image (card thumbnail/preview) - uses `image` prop */}
        <img
          src={image}
          alt={title || "Card image"}
          className="w-full h-full object-cover"
        />
        



        {/* Hover Text Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          {isCompleted ? (
            <div className="flex flex-col items-center space-y-2">
              <Star size={32} className="text-yellow-400 fill-yellow-400" />
              <p className="text-gray-100 text-xl font-bold">Completed</p>
            </div>
          ) : (
            <p className="text-gray-100 text-xl font-bold">Click Me</p>
          )}
        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl font-ppmond"
            style={{
              background: 'rgba(34, 85, 51, 0.95)',
              border: '2px solid rgba(144, 238, 144, 0.5)',
              boxShadow: '0 0 40px rgba(144, 238, 144, 0.3), inset 0 0 40px rgba(144, 238, 144, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(34, 85, 51, 0.8)',
                border: '1px solid rgba(144, 238, 144, 0.5)',
                color: '#e8f5e8'
              }}
            >
              <X size={24} />
            </button>
             <div className="absolute top-4 left-4 z-10">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-green-400 bg-transparent checked:bg-green-400 focus:ring-2 focus:ring-green-400"
                />
                <span className="text-green-500 text-sm">Mark as completed</span>
              </label>
            </div>
            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full ">
              {/* Left side - Image */}
              <div className="relative overflow-hidden">
                {/* Modal image: strictly uses `modalImage` prop. If you want to use the
                    same asset for thumbnail and modal, pass the same URL for both props.
                    We avoid falling back to `image` here so the two fields remain distinct. */}
                <img
                  src={modalImage}
                  alt={title || "Modal image"}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Right side - Content */}
              {/* Right side - Content */}
              <div
                className="p-8 flex flex-col justify-start overflow-y-auto transition-all duration-300 hover:bg-white group"
                style={{
                  background: 'rgba(34, 85, 51, 0.7)',
                  color: '#e8f5e8',
                  maxHeight: '90vh' // 👈 keeps it within viewport
                }}
              >
                <h2
                  className="text-3xl font-bold mb-4 group-hover:text-gray-100 transition-colors duration-300"
                  style={{
                    color: '#e8f5e8',
                    textShadow: '0 0 20px rgba(144, 238, 144, 0.5)'
                  }}
                >
                  {title}
                </h2>

                <p
                  className="text-lg opacity-90 mb-6 group-hover:text-black transition-colors duration-300"
                  style={{ color: '#b8e8b8' }}
                >
                  {description}
                </p>

                <div
                  className="text-xl leading-relaxed flex-1 overflow-y-auto pr-2"
                  style={{
                    color: '#e8f5e8',
                    fontFamily: "'ppmond', monospace"
                  }}
                >
                  <p className="mb-4 group-hover:text-gray-100 transition-colors duration-300">
                    {text}
                  </p>

                  {/* Additional content area (now driven by additionalContent prop) */}
                  <div
                    className="mt-6 p-4 rounded-lg group-hover:bg-gray-100 group-hover:border-gray-300 transition-all duration-300"
                    style={{
                      background: 'rgba(34, 85, 51, 0.6)',
                      border: '1px solid rgba(144, 238, 144, 0.3)'
                    }}
                  >
                    <p className="text-lg opacity-80 group-hover:text-gray-100 group-hover:opacity-100 transition-all duration-300">
                      {additionalContent}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fixed {
          animation: modalFadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default HoverCard;