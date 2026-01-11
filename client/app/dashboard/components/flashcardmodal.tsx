import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, HelpCircle, BookOpen } from 'lucide-react';

interface Flashcard {
  id: string;
  question_text: string;
  answer_text: string;
  subject_id: string;
  module_no: number;
}

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: string;
  flashcards: Flashcard[];
}

const FlashcardModal: React.FC<FlashcardModalProps> = ({
  isOpen,
  onClose,
  module,
  flashcards
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Theme colors from the site
  const primaryColor = "rgba(255, 140, 90, 1)"; // Orange
  const backgroundColor = "rgba(18, 87, 116, 1)"; // Blue

  if (!isOpen) return null;

  const EmptyCardState = () => (
    <div className="py-8 px-4 text-center">
      <div className="flex justify-center mb-4">
        <HelpCircle className="h-12 w-12 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No FlashCards 🎯
      </h3>
      <p className="text-gray-600 mb-4">
        This module looks too simple for you 😔!
      </p>
      <p className="text-gray-600 mb-4">It might be your lucky day - less to memorize!</p>
      <div className="flex items-center justify-center gap-2 text-blue-600">
        <BookOpen className="h-5 w-5" />
        <span className="text-sm font-medium">Focus on understanding the concepts!</span>
      </div>
    </div>
  );

  const handlePrevCard = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking navigation
    setCurrentCardIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
    setIsFlipped(false);
  };

  const handleNextCard = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking navigation
    setCurrentCardIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handle clicking outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-josefinSans text-2xl font-bold text-gray-800">
            Flashcards - {module}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-3xl font-bold transition-all"
          >
            ×
          </button>
        </div>

        {flashcards.length > 0 ? (
          <div className="space-y-6">
            {/* Card Container */}
            <div className="relative w-full h-[450px]">
              <div
                className="w-full h-full transition-all duration-500 cursor-pointer [transform-style:preserve-3d]"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
                onClick={handleFlip}
              >
                {/* Front of Card (Question) */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl p-10 flex flex-col items-center justify-center [backface-visibility:hidden]  border-4"

                >
                  <div
                    className="absolute top-6 left-6 px-5 py-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <h3 className="font-josefinSans text-sm font-bold text-white">QUESTION</h3>
                  </div>
                  <p className="font-josefinSans text-2xl text-center font-semibold leading-relaxed px-8" style={{ color: backgroundColor }}>
                    {flashcards[currentCardIndex].question_text}
                  </p>
                  <div
                    className="absolute bottom-6 text-sm text-white flex items-center gap-2 px-5 py-2 rounded-full"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <RotateCw className="w-4 h-4" />
                    <span className="font-josefinSans font-medium">Click to reveal answer</span>
                  </div>
                </div>

                {/* Back of Card (Answer) */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl p-10 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl border-4"

                >
                  <div
                    className="absolute top-6 left-6 px-5 py-2 rounded-full"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <h3 className="font-josefinSans text-sm font-bold text-white">ANSWER</h3>
                  </div>
                  <p className="font-josefinSans text-2xl text-center font-semibold leading-relaxed px-8" style={{ color: primaryColor }}>
                    {flashcards[currentCardIndex].answer_text}
                  </p>
                  <div
                    className="absolute bottom-6 text-sm text-white flex items-center gap-2 px-5 py-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <RotateCw className="w-4 h-4" />
                    <span className="font-josefinSans font-medium">Click to see question</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between px-4">
              <button
                onClick={handlePrevCard}
                className="p-3 rounded-full text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                style={{ backgroundColor: backgroundColor }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="text-center bg-gray-100 px-6 py-3 rounded-full border-2" >
                <p className="font-josefinSans text-sm font-bold" style={{ color: backgroundColor }}>
                  Card {currentCardIndex + 1} of {flashcards.length}
                </p>
              </div>

              <button
                onClick={handleNextCard}
                className="p-3 rounded-full text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          <EmptyCardState />
        )}
      </div>
    </div>
  );
};

export default FlashcardModal;