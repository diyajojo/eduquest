import React from 'react';
import { X, Book, Library, GraduationCap } from 'lucide-react';

interface ResourceBook {
  id: string;
  title: string;
  author: string;
  subject: string;
  edition?: string;
  coverColor: string;
}

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resources: ResourceBook[] = [
    {
      id: '1',
      title: "Database System Concepts",
      author: "Abraham Silberschatz, Henry F. Korth",
      subject: "Database Management Systems",
      edition: "7th Edition",
      coverColor: "bg-blue-600"
    },
    {
      id: '2',
      title: "Operating System Concepts",
      author: "Abraham Silberschatz, Peter B. Galvin",
      subject: "Operating Systems",
      edition: "10th Edition",
      coverColor: "bg-orange-500"
    },
    {
      id: '3',
      title: "Computer Networking: A Top-Down Approach",
      author: "James F. Kurose, Keith W. Ross",
      subject: "Computer Networks",
      edition: "8th Edition",
      coverColor: "bg-emerald-600"
    },
    {
      id: '4',
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen, Charles E. Leiserson",
      subject: "Design and Analysis of Algorithms",
      edition: "4th Edition",
      coverColor: "bg-purple-600"
    },
    {
      id: '5',
      title: "Fundamentals of Database Systems",
      author: "Ramez Elmasri, Shamkant B. Navathe",
      subject: "Database Management Systems",
      edition: "7th Edition",
      coverColor: "bg-indigo-600"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[600px] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-[#125774] text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Library className="h-8 w-8" />
            <div>
              <h2 className="font-noto text-xl font-bold">RESOURCE LIBRARY</h2>
              <p className="text-blue-200 text-sm font-light">Recommended Reference Books</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1 bg-gray-50">
          <div className="grid gap-4">
            {resources.map((book) => (
              <div
                key={book.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4 transition-transform hover:scale-[1.01] hover:shadow-md"
              >
                <div className={`${book.coverColor} w-16 h-20 rounded shadow-md flex-shrink-0 flex items-center justify-center text-white`}>
                  <Book className="h-8 w-8 opacity-80" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-noto font-bold text-gray-800 text-lg leading-tight mb-1 truncate pr-2">
                      {book.title}
                    </h3>
                    {book.edition && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
                        {book.edition}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-2 truncate">{book.author}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <GraduationCap className="h-4 w-4 text-[#E68A5C]" />
                    <span className="text-xs font-semibold text-[#E68A5C] uppercase tracking-wide">
                      {book.subject}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            These resources are curated based on your current semester curriculum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesModal;
