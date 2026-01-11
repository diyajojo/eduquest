import React from 'react';
import { HashLoader } from 'react-spinners';
import { Book } from 'lucide-react';

const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundColor: "rgba(18, 87, 116, 1)",
        background: `
          radial-gradient(circle at center, 
            rgba(18, 87, 116, 1) 0%, 
            rgba(18, 87, 116, 0.95) 50%, 
            rgba(18, 87, 116, 0.9) 100%
          )
        `,
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="mb-6 md:mb-8 flex items-center gap-2 md:gap-4 animate-pulse">
        <Book
          className="h-8 w-8 md:h-12 md:w-12 text-white"
          strokeWidth={1.5}
        />
        <div className="text-2xl md:text-4xl font-bold">
          <span className="text-white">EDU</span>
          <span className="text-[#FF8C5A]">QUEST</span>
        </div>
      </div>

      <div className="relative">
        <HashLoader
          color="#FF8C5A"
          size={60}
          speedMultiplier={0.7}
          className="scale-75 md:scale-100"
        />

        <div
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,90,0.3) 0%, transparent 70%)',
            zIndex: -1
          }}
        />
      </div>

      <p
        className="mt-6 md:mt-8 text-base md:text-xl text-white/70 tracking-widest uppercase text-center px-4"
        style={{
          animation: 'fadeInOut 2s infinite',
          fontFamily: 'monospace'
        }}
      >
        Preparing Your Learning Journey
      </p>

      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Loader;