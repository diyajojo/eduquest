'use client';
import React, { useState, useEffect } from 'react';
import { Book, Bell, ChevronDown, LogOut, ChevronRight, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EmptyState from './components/emptystate';
import ModuleTopicsModal from './components/topicmodal';
import QuestionAnswerModal from './components/quesmodal';
import FlashcardModal from './components/flashcardmodal';
import ScheduleModal from './components/schedulemodal';
import AssignmentCard from './components/assigmentcard';
import NotificationsModal from './components/notificationmodal';

// Interfaces
interface Profile {
  full_name: string;
  college_name: string;
  branch: string;
  year: string;
}

interface Subject {
  id: string;
  subject_name: string;
}

interface Flashcard {
  id: string;
  question_text: string;
  answer_text: string;
  subject_id: string;
  module_no: number;
}

interface Topic {
  id: string;
  topic_name: string;
  subject_id: string;
  module_no: number | string;
}

interface Question {
  id: string;
  question_text: string;
  answer_text: string;
  subject_id: string;
  module_no: number | string;
}

interface Schedule {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  created_by: string;
}

interface Assignment {
  id: string;
  schedule_id: string;
  title: string;
  description: string;
  duration: string;
  status: 'pending' | 'completed';
  date: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  daysLeft: number;
  type: 'assignment' | 'schedule';
}

const Schedule = () => {
  const router = useRouter();

  // Hardcoded Data
  const profile: Profile = {
    full_name: "Diya Jojo",
    college_name: "Model Engineering College",
    branch: "Computer Science Engineering",
    year: "3"
  };

  const subjects: Subject[] = [
    { id: '1', subject_name: 'Database Management Systems' },
    { id: '2', subject_name: 'Operating Systems' },
    { id: '3', subject_name: 'Computer Networks' },
    { id: '4', subject_name: 'Design and Analysis of Algorithms' }
  ];

  const mockTopics: Topic[] = [
    { id: '1', topic_name: 'Introduction to DBMS', subject_id: '1', module_no: 1 },
    { id: '2', topic_name: 'ER Model', subject_id: '1', module_no: 1 },
    { id: '3', topic_name: 'Relational Model', subject_id: '1', module_no: 2 },
    { id: '4', topic_name: 'SQL', subject_id: '1', module_no: 2 },
    { id: '5', topic_name: 'Normalization', subject_id: '1', module_no: 3 },
    { id: '6', topic_name: 'Transaction Management', subject_id: '1', module_no: 4 },
    { id: '7', topic_name: 'Concurrency Control', subject_id: '1', module_no: 5 },
  ];

  const mockQuestions: Question[] = [
    { id: '1', question_text: 'What is normalization?', answer_text: 'Process of organizing data in a database.', subject_id: '1', module_no: 3 },
    { id: '2', question_text: 'Explain ACID properties.', answer_text: 'Atomicity, Consistency, Isolation, Durability.', subject_id: '1', module_no: 4 },
  ];

  const mockFlashcards: Flashcard[] = [
    { id: '1', question_text: 'What is a Primary Key?', answer_text: 'Unique identifier for a record.', subject_id: '1', module_no: 2 },
    { id: '2', question_text: 'What is normalization in databases?', answer_text: 'Process of organizing data to reduce redundancy.', subject_id: '1', module_no: 2 },
    
  ];

  const mockAssignments: Assignment[] = [
    { id: '1', schedule_id: '1', title: 'DBMS Lab Project', description: 'Complete the hospital management system.', duration: '2 weeks', status: 'pending', date: new Date().toISOString() },
    { id: '2', schedule_id: '1', title: 'OS Assignment 1', description: 'Process scheduling algorithms.', duration: '1 week', status: 'completed', date: new Date(Date.now() - 86400000).toISOString() },
  ];

  const mockNotifications: Notification[] = [
    { id: '1', title: 'DBMS Assignment Due', description: 'Submit by Friday', date: new Date().toISOString(), daysLeft: 2, type: 'assignment' },
    { id: '2', title: 'OS Quiz', description: 'Module 1 and 2', date: new Date(Date.now() + 172800000).toISOString(), daysLeft: 2, type: 'schedule' },
      { id: '3', title: 'CN Tutorial', description: 'Module 1 and 2', date: new Date(Date.now() + 172800000).toISOString(), daysLeft: 2, type: 'schedule' }
  ];

  // State
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(subjects[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Subject Content State
  const [topics] = useState<Topic[]>(mockTopics);
  const [questions] = useState<Question[]>(mockQuestions);
  const [flashcards] = useState<Flashcard[]>(mockFlashcards);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);

  // Modals State
  const [isFlashcardsModalOpen, setIsFlashcardsModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [calendarEvents, setCalendarEvents] = useState<{ [key: string]: any[] }>({}); // Mock events would go here if needed
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([]);
  const [isDateEventsModalOpen, setIsDateEventsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const primaryColor = "rgba(255, 140, 90, 1)";
  const backgroundColor = "rgba(18, 87, 116, 1)";
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helpers
  const handleLogout = async () => {
    // Client-side logout only for UI demo
    router.push('/');
  };

  const getTopicsForModule = (moduleNumber: string): Topic[] => {
    const moduleNum = moduleNumber.split(' ')[1];
    return topics.filter(topic => topic.module_no.toString() === moduleNum);
  };

  const getQuestionsForModule = (moduleNumber: string): Question[] => {
    const moduleNum = moduleNumber.split(' ')[1];
    return questions.filter(question => question.module_no.toString() === moduleNum); // Ensure string/number comparison matches
  };

  const getFlashcardsForModule = (moduleNumber: string): Flashcard[] => {
    const moduleNum = moduleNumber.split(' ')[1];
    return flashcards.filter(flashcard => flashcard.module_no.toString() === moduleNum);
  };

  const handleTopicModuleClick = (moduleNumber: string) => {
    setSelectedModule(moduleNumber);
    setIsTopicsModalOpen(true);
  };

  const handleQuestionModuleClick = (moduleNumber: string) => {
    setSelectedModule(moduleNumber);
    setIsQuestionsModalOpen(true);
  };

  const handleFlashcardModuleClick = (moduleNumber: string) => {
    setSelectedModule(moduleNumber);
    setIsFlashcardsModalOpen(true);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  const handleAssignmentStatusUpdate = (assignmentId: string, newStatus: 'pending' | 'completed') => {
    setAssignments(prev =>
      prev.map(assignment =>
        assignment.id === assignmentId
          ? { ...assignment, status: newStatus }
          : assignment
      )
    );
  };

  const renderCalendar = () => {
    const year = new Date().getFullYear();
    const firstDay = new Date(year, currentMonth, 1);
    const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();

    // Get day of week in IST (approx) or local
    const istFirstDay = new Date(firstDay.getTime() + (5.5 * 60 * 60 * 1000));
    const adjustedFirstDay = istFirstDay.getDay() === 0 ? 6 : istFirstDay.getDay() - 1;

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const paddingDays = Array(adjustedFirstDay > 0 ? adjustedFirstDay : 0).fill(null);

    return [...paddingDays, ...calendarDays].map((day, index) => {
      if (day === null) {
        return <div key={`empty-${index}`} />;
      }

      const currentDate = new Date(year, currentMonth, day);
      const istDate = new Date(currentDate.getTime() + (5.5 * 60 * 60 * 1000));
      const dateKey = istDate.toISOString().split('T')[0];

      const hasEvents = !!calendarEvents[dateKey] && calendarEvents[dateKey].length > 0;
      const isValidDay = day !== null;

      const buttonClasses = isValidDay && hasEvents
        ? "text-center p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
        : "text-center p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200";

      return isValidDay ? (
        <button
          key={dateKey}
          className={buttonClasses}
          onClick={() => {
            if (hasEvents) {
              setSelectedDate(currentDate);
              setSelectedDateEvents(calendarEvents[dateKey]);
              setIsDateEventsModalOpen(true);
            }
          }}
        >
          {day}
        </button>
      ) : null;
    }).filter(Boolean);
  };

  return (
    <div className="flex h-minscreen bg-[#125774]">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4" style={{ background: primaryColor }}>
          <div className="flex items-center gap-2 mb-8">
            <Book className="h-6 w-6 text-gray-800" />
            <div className="font-josefinSans text-2xl font-bold">
              <span>EDU</span>
              <span style={{ color: backgroundColor }}>QUEST</span>
            </div>
          </div>

          {/* Profile Section */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 rounded-full overflow-hidden w-24 h-24 bg-gray-300">
              {/* Use placeholder if image is missing */}
              <img
                src="/assets/pfp.png"
                alt="Profile"
                height={100}
                width={100}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/100';
                }}
              />
            </div>
            <h3 className="font-noto font-bold text-gray-800 text-xl">{profile.full_name}</h3>
          </div>
          <div className="flex flex-col justify-center items-center font-semibold text-sm text-gray-800 text-center mt-3">
            <p>{profile.college_name}</p>
            <p className="font-noto mt-2">{profile.branch}</p>
            <p className="font-noto mt-2">{profile.year}rd year</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 mt-10 p-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-2 text-left rounded-lg bg-blue-50 text-blue-900"
            >
              <div className="font-roboto flex items-center gap-3">
                <Book className="h-5 w-5" />
                <span>My Courses</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
                {subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                    >
                      {subject.subject_name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-sm">
                    No subjects added yet
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsNotificationsModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            {notifications.length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {notifications.length}
              </span>
            )}
          </button>

        </nav>

        <div className="mb-5 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-black hover:bg-red-400/10 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#125774]">
        {selectedSubject ? (
          <div>
            <header className="flex justify-between items-center mb-8">
              <h1 className="font-noto text-2xl font-semibold text-white">
                {selectedSubject.subject_name.toUpperCase()} - OVERVIEW 📚
              </h1>
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="font-noto px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: "rgba(255, 140, 90, 1)" }}
              >
                Create/View schedule
              </button>
            </header>

            <div className="space-y-6">

              {/* Important Topics */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-noto text-lg font-semibold text-gray-800">📚 IMPORTANT TOPICS</h2>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'].map((module) => {
                    const moduleTopics = getTopicsForModule(module);
                    return (
                      <button
                        key={module}
                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 relative"
                        onClick={() => handleTopicModuleClick(module)}
                      >
                        {module}
                        {moduleTopics.length > 0 && (
                          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                            {moduleTopics.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Previous Year Questions Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-noto text-lg font-semibold text-gray-800">❓ REPEATED PREVIOUS YEAR QUESTIONS</h2>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'].map((module) => {
                    const moduleQuestions = getQuestionsForModule(module);
                    return (
                      <button
                        key={module}
                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 relative"
                        onClick={() => handleQuestionModuleClick(module)}
                      >
                        {module}
                        {moduleQuestions.length > 0 && (
                          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                            {moduleQuestions.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flashcards */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-noto text-lg font-semibold text-gray-800">📝 FLASHCARDS</h2>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'].map((module) => {
                    const moduleFlashcards = getFlashcardsForModule(module);
                    return (
                      <button
                        key={module}
                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 relative"
                        onClick={() => handleFlashcardModuleClick(module)}
                      >
                        {module}
                        {moduleFlashcards.length > 0 && (
                          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                            {moduleFlashcards.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calendar and Assignments Grid */}
              <div className="grid grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm max-h-[400px]">
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePreviousMonth} className="text-gray-600 font-semibold hover:text-gray-800">
                      &lt;
                    </button>
                    <h3 className="font-roboto font-semibold text-gray-800">{months[currentMonth].toLocaleUpperCase()}</h3>
                    <button onClick={handleNextMonth} className="text-gray-600 font-semibold hover:text-gray-800">
                      &gt;
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
                      <div key={day} className="text-center text-sm text-black">{day}</div>
                    ))}
                    {renderCalendar()}
                  </div>
                </div>

                {/* Assignments Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm max-h-[400px] flex flex-col">
                  <h2 className="font-noto text-lg font-semibold text-gray-800 mb-4">Assignments</h2>
                  <div className="flex-1 overflow-y-auto">
                    <div className="space-y-3 pr-2">
                      {assignments.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No assignments yet</p>
                      ) : (
                        assignments.map(assignment => (
                          <AssignmentCard
                            key={assignment.id}
                            assignment={assignment}
                            onStatusUpdate={(id, status) => handleAssignmentStatusUpdate(id, status as "pending" | "completed")}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NotificationsModal
              isOpen={isNotificationsModalOpen}
              onClose={() => setIsNotificationsModalOpen(false)}
              notifications={notifications}
            />

            <ModuleTopicsModal
              isOpen={isTopicsModalOpen}
              onClose={() => setIsTopicsModalOpen(false)}
              module={selectedModule}
              topics={getTopicsForModule(selectedModule).map(topic => ({
                ...topic,
                module_number: Number(topic.module_no)
              }))}
            />

            <QuestionAnswerModal
              isOpen={isQuestionsModalOpen}
              onClose={() => setIsQuestionsModalOpen(false)}
              module={selectedModule}
              questions={getQuestionsForModule(selectedModule).map(question => ({
                ...question,
                module_no: Number(question.module_no)
              }))}
            />

            <FlashcardModal
              isOpen={isFlashcardsModalOpen}
              onClose={() => setIsFlashcardsModalOpen(false)}
              module={selectedModule}
              flashcards={getFlashcardsForModule(selectedModule).map(flashcard => ({
                ...flashcard,
                module_no: Number(flashcard.module_no)
              }))}
            />

            <ScheduleModal
              isOpen={isScheduleModalOpen}
              onClose={() => setIsScheduleModalOpen(false)}
              subjectId={selectedSubject.id}
              subjectName={selectedSubject.subject_name}
              topics={topics.map(topic => ({
                ...topic,
                module_number: Number(topic.module_no)
              }))}
              questions={questions.map(question => ({
                ...question,
                module_no: Number(question.module_no)
              }))}
              flashcards={flashcards.map(flashcard => ({
                ...flashcard,
                module_no: Number(flashcard.module_no)
              }))}
            />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default Schedule;