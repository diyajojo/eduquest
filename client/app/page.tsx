'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FeatureCard from './components/featurecard';
import { Book } from 'lucide-react';
import Loader from './components/loader';
import { useState, useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial page loading with a delay
  useEffect(() => {
    const initializePage = async () => {
      try {
        // Simulate some initialization tasks
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay

        // You can add any additional initialization logic here
        // For example, prefetching data, checking authentication, etc.
      } catch (error) {
        console.error('Page initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, []);

  const handleSignupClick = () => {
    router.push('/auth');
  }

  const primaryColor = "rgba(255, 140, 90, 1)";
  const backgroundColor = "rgba(18, 87, 116, 1)";

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main
      className="min-h-screen relative"
      style={{ background: backgroundColor }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/bgimg.jpg"
          alt="Background"
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 mix-blend-multiply" />
      </div>

      <nav className="relative z-10 flex flex-col md:flex-row items-center h-auto md:h-20">
        <div
          className="w-full md:w-1/2 h-20 md:h-full flex items-center justify-center md:justify-start pl-0 md:pl-8"
          style={{ background: primaryColor }}
        >
          <div className="flex items-center justify-center gap-2">
            <Book className="h-6 w-6 text-gray-800" />
            <div className=" font-josefinSans text-2xl font-bold">
              <span className=" text-white">EDU</span>
              <span style={{ color: backgroundColor }}>QUEST</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-20 md:h-full bg-white flex items-center justify-center md:justify-end pr-0 md:pr-8 border-b md:border-none border-gray-100">
          <button
            onClick={handleSignupClick}
            className="font-josefinSans text-white text-xl md:text-2xl px-8 py-2 transition-all duration-300 font-semibold rounded-lg"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-12 md:pt-32 pb-20 md:pb-32 text-center">
        <h1 className="font-noto text-3xl md:text-6xl font-extrabold text-white mb-8 md:mb-12 tracking-tight">
          Level Up Your Learning
        </h1>
        <p className=" font-roboto text-lg md:text-xl text-white mb-12 md:mb-16 max-w-2xl font-medium leading-relaxed px-2">
          Transform your study routine with personalized learning schedules, smart analysis, and integrated calendar management
        </p>

        <div className="mt-8 md:mt-16 w-full max-w-6xl mx-auto">
          <FeatureCard />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-32 h-32 md:w-48 md:h-48">
        <Image
          src="/assets/robot.png"
          alt="AI Robot"
          width={1000}
          height={1000}
          className="object-contain filter hue-rotate-180 brightness-95"
        />
      </div>
    </main>
  );
}

export default Home;