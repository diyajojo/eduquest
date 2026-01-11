import React, { useState, useEffect } from 'react';
import { Loader2, Calendar, CheckCircle, X, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';

interface ScheduleActivity {
  time: string;
  topic: string;
  description: string;
  type: string;
}

interface ScheduleDay {
  date: string;
  display_date: string;
  activities: ScheduleActivity[];
}

interface Assignment {
  date: string;
  display_date: string;
  title: string;
  description: string;
  duration: string;
}

interface ScheduleResponse {
  schedule: ScheduleDay[];
  assignments: Assignment[];
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId: string;
  subjectName: string;
  topics: Array<{ id: string; topic_name: string; subject_id: string; module_no: number | string }>;
  questions: Array<{ id: string; question_text: string; answer_text: string; subject_id: string; module_no: number | string }>;
  flashcards: Array<{ id: string; question_text: string; answer_text: string; subject_id: string; module_no: number }>;
}

const mockExistingSchedule: ScheduleResponse = {
  schedule: [
    {
      date: '2026-01-15',
      display_date: 'Wednesday, January 15, 2026',
      activities: [
        {
          time: '9:00 AM - 11:00 AM',
          topic: 'Introduction to DBMS',
          description: 'Review fundamental concepts and architecture',
          type: 'study'
        },
        {
          time: '2:00 PM - 4:00 PM',
          topic: 'ER Model',
          description: 'Practice ER diagram creation',
          type: 'study'
        }
      ]
    },
    {
      date: '2026-01-16',
      display_date: 'Thursday, January 16, 2026',
      activities: [
        {
          time: '10:00 AM - 12:00 PM',
          topic: 'Relational Model',
          description: 'Study relational algebra and calculus',
          type: 'study'
        },
        {
          time: '3:00 PM - 5:00 PM',
          topic: 'SQL Basics',
          description: 'Practice SQL queries and commands',
          type: 'study'
        }
      ]
    },
    {
      date: '2026-01-17',
      display_date: 'Friday, January 17, 2026',
      activities: [
        {
          time: '9:00 AM - 11:00 AM',
          topic: 'Normalization',
          description: 'Review normal forms and dependencies',
          type: 'study'
        }
      ]
    }
  ],
  assignments: [
    {
      date: '2026-01-18',
      display_date: 'Saturday, January 18, 2026',
      title: 'DBMS Practice Quiz',
      description: 'Complete practice questions on modules 1-3',
      duration: '2 hours'
    },
    {
      date: '2026-01-20',
      display_date: 'Monday, January 20, 2026',
      title: 'SQL Assignment',
      description: 'Write complex queries for the given database schema',
      duration: '3 hours'
    }
  ]
};

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  subjectId,
  subjectName,
  topics,
  questions,
  flashcards
}) => {

  const [scheduleData, setScheduleData] = useState<ScheduleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('schedule');
  const [saved, setSaved] = useState(false);
  const [hasExistingSchedule, setHasExistingSchedule] = useState(true); // Changed to true for demo
  const [existingScheduleData, setExistingScheduleData] = useState<ScheduleResponse | null>(mockExistingSchedule);

  useEffect(() => {
  }, [isOpen, subjectId]);

  const generateSchedule = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const generatedSchedule: ScheduleResponse = {
        schedule: [
          {
            date: '2026-01-13',
            display_date: 'Monday, January 13, 2026',
            activities: [
              {
                time: '9:00 AM - 10:30 AM',
                topic: topics[0]?.topic_name || 'Introduction to DBMS',
                description: 'Review key concepts and definitions',
                type: 'study'
              },
              {
                time: '11:00 AM - 12:30 PM',
                topic: topics[1]?.topic_name || 'ER Model',
                description: 'Practice creating ER diagrams',
                type: 'study'
              },
              {
                time: '2:00 PM - 3:00 PM',
                topic: 'Flashcard Review',
                description: 'Review flashcards from Module 1',
                type: 'study'
              }
            ]
          },
          {
            date: '2026-01-14',
            display_date: 'Tuesday, January 14, 2026',
            activities: [
              {
                time: '9:00 AM - 10:30 AM',
                topic: topics[2]?.topic_name || 'Relational Model',
                description: 'Study relational algebra operations',
                type: 'study'
              },
              {
                time: '11:00 AM - 12:00 PM',
                topic: 'Practice Questions',
                description: 'Solve previous year questions',
                type: 'study'
              }
            ]
          },
          {
            date: '2026-01-15',
            display_date: 'Wednesday, January 15, 2026',
            activities: [
              {
                time: '10:00 AM - 12:00 PM',
                topic: topics[3]?.topic_name || 'SQL',
                description: 'Practice writing SQL queries',
                type: 'study'
              }
            ]
          }
        ],
        assignments: [
          {
            date: '2026-01-16',
            display_date: 'Thursday, January 16, 2026',
            title: `${subjectName} Module Test`,
            description: 'Complete practice test covering all studied modules',
            duration: '2 hours'
          },
          {
            date: '2026-01-18',
            display_date: 'Saturday, January 18, 2026',
            title: 'Project Work',
            description: 'Work on database design project',
            duration: '3 hours'
          }
        ]
      };

      setScheduleData(generatedSchedule);
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'An unexpected error occurred while generating the schedule';

      setError(errorMessage);
      console.error('Full error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeepSchedule = async () => {
    if (!scheduleData) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setSaved(true);
      setTimeout(onClose, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save schedule';
      setError(errorMessage);
      console.error('Save error:', err);
    }
  };

  const renderScheduleContent = (data: ScheduleResponse) => (
    <div className="space-y-4">
      {data.schedule.map((day, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-noto font-semibold text-lg text-gray-800 mb-2">
            {day.display_date}
          </h3>
          <div className="space-y-2">
            {day.activities.map((activity, actIndex) => (
              <div key={actIndex} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                <div className="flex-1">
                  <p className="font-noto font-medium text-gray-700">{activity.time}</p>
                  <p className="font-noto text-gray-600">{activity.topic}</p>
                  <p className="font-noto text-sm text-gray-500">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderAssignmentsContent = (data: ScheduleResponse) => (
    <div className="space-y-4">
      {data.assignments.map((assignment, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <div className="font-noto flex justify-between items-start mb-2">
            <h3 className="font-noto font-semibold text-lg text-gray-800">
              {assignment.display_date}
            </h3>
            <span className="font-noto text-sm font-medium text-gray-600">
              {assignment.duration}
            </span>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <h4 className="font-noto font-medium text-gray-700">{assignment.title}</h4>
            <p className="fonto-noto text-gray-600 mt-1">{assignment.description}</p>
          </div>
        </div>
      ))}
    </div>
  );



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>

        <div className="p-6">
          <div className="mb-8 border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Study Schedule - {subjectName.toLocaleUpperCase()}
            </h2>
            <p className="mt-2 text-gray-600">
              {hasExistingSchedule
                ? 'View your current study schedule and assignments'
                : 'Plan and organize your study sessions effectively'}
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {saved && (
            <Alert className="mb-6 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Schedule and assignments saved successfully!
              </AlertDescription>
            </Alert>
          )}

          {hasExistingSchedule ? (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-blue-600 mr-2" />
                  <p className="text-blue-600">
                    Viewing your current schedule and assignments
                  </p>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
                  <TabsTrigger value="schedule" className="text-lg py-3">
                    Schedule
                  </TabsTrigger>
                  <TabsTrigger value="assignments" className="text-lg py-3">
                    Assignments
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="schedule">
                  {renderScheduleContent(existingScheduleData!)}
                </TabsContent>

                <TabsContent value="assignments">
                  {renderAssignmentsContent(existingScheduleData!)}
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <>
              {!scheduleData && !loading && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-xl text-gray-600 mb-6">
                    Ready to generate your personalized study schedule?
                  </p>
                  <Button
                    onClick={generateSchedule}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
                  >
                    Generate Schedule
                  </Button>
                </div>
              )}

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <span className="ml-3 text-lg text-gray-600">
                    Generating your schedule...
                  </span>
                </div>
              )}

              {scheduleData && (
                <>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
                      <TabsTrigger value="schedule" className="font-noto text-lg py-3">
                        Schedule
                      </TabsTrigger>
                      <TabsTrigger value="assignments" className="font-noto text-lg py-3">
                        Assignments
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="schedule">
                      {renderScheduleContent(scheduleData)}
                    </TabsContent>

                    <TabsContent value="assignments">
                      {renderAssignmentsContent(scheduleData)}
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end mt-8 space-x-4 border-t pt-6">
                    <Button
                      variant="outline"
                      onClick={generateSchedule}
                      className="px-6 py-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      Regenerate Schedule
                    </Button>
                    <Button
                      onClick={handleKeepSchedule}
                      className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Keep This Schedule
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;