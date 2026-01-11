'use client';
import React, { useState, useEffect } from 'react';
import { Book, Bell, ChevronDown, LogOut, ChevronRight, AlertTriangle, TrendingUp, Target, Zap, Library, Settings, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EmptyState from './components/emptystate';
import ModuleTopicsModal from './components/topicmodal';
import QuestionAnswerModal from './components/quesmodal';
import FlashcardModal from './components/flashcardmodal';
import ScheduleModal from './components/schedulemodal';
import AssignmentCard from './components/assigmentcard';
import NotificationsModal from './components/notificationmodal';
import ResourcesModal from './components/resourcesmodal';
import SettingsModal from './components/settingsmodal';


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
    { id: '2', topic_name: 'Database Architecture', subject_id: '1', module_no: 1 },
    { id: '3', topic_name: 'ER Model and ER Diagrams', subject_id: '1', module_no: 1 },
    { id: '4', topic_name: 'Entity Types and Relationships', subject_id: '1', module_no: 1 },
    { id: '5', topic_name: 'Keys in DBMS', subject_id: '1', module_no: 1 },


    { id: '6', topic_name: 'Relational Model Concepts', subject_id: '1', module_no: 2 },
    { id: '7', topic_name: 'Relational Algebra', subject_id: '1', module_no: 2 },
    { id: '8', topic_name: 'SQL Basics and DDL', subject_id: '1', module_no: 2 },
    { id: '9', topic_name: 'SQL DML and Queries', subject_id: '1', module_no: 2 },
    { id: '10', topic_name: 'Joins and Subqueries', subject_id: '1', module_no: 2 },


    { id: '11', topic_name: 'Functional Dependencies', subject_id: '1', module_no: 3 },
    { id: '12', topic_name: 'Normalization (1NF, 2NF, 3NF)', subject_id: '1', module_no: 3 },
    { id: '13', topic_name: 'BCNF and Higher Normal Forms', subject_id: '1', module_no: 3 },
    { id: '14', topic_name: 'Decomposition and Lossless Join', subject_id: '1', module_no: 3 },


    { id: '15', topic_name: 'Transaction Concepts', subject_id: '1', module_no: 4 },
    { id: '16', topic_name: 'ACID Properties', subject_id: '1', module_no: 4 },
    { id: '17', topic_name: 'Concurrency Control', subject_id: '1', module_no: 4 },
    { id: '18', topic_name: 'Locking Techniques', subject_id: '1', module_no: 4 },
    { id: '19', topic_name: 'Deadlock Handling', subject_id: '1', module_no: 4 },


    { id: '20', topic_name: 'Database Recovery', subject_id: '1', module_no: 5 },
    { id: '21', topic_name: 'Log-Based Recovery', subject_id: '1', module_no: 5 },
    { id: '22', topic_name: 'Indexing and B-Trees', subject_id: '1', module_no: 5 },
    { id: '23', topic_name: 'Query Optimization', subject_id: '1', module_no: 5 },
    { id: '24', topic_name: 'Database Security', subject_id: '1', module_no: 5 },
  ];

  const mockQuestions: Question[] = [

    {
      id: '1',
      question_text: 'Explain the three-schema architecture of DBMS with a neat diagram.',
      answer_text: 'The three-schema architecture divides the database into three levels: External Schema (user views), Conceptual Schema (logical structure of entire database), and Internal Schema (physical storage). This provides data independence where changes at one level do not affect other levels. The external level defines different user views, conceptual level describes what data is stored, and internal level describes how data is physically stored.',
      subject_id: '1',
      module_no: 1
    },
    {
      id: '2',
      question_text: 'Differentiate between entity type and entity set. Explain with examples.',
      answer_text: 'Entity Type is a category or template that defines a collection of entities with same attributes (e.g., STUDENT with attributes: ID, Name, Age). Entity Set is the actual collection of entity instances at a particular time (e.g., all students currently enrolled: {S1: John, 20}, {S2: Mary, 21}). Entity type is the schema, while entity set is the data.',
      subject_id: '1',
      module_no: 1
    },
    {
      id: '3',
      question_text: 'What are the different types of keys in DBMS? Explain each briefly.',
      answer_text: 'Super Key: Any set of attributes that uniquely identifies a tuple. Candidate Key: Minimal super key with no redundant attributes. Primary Key: Selected candidate key to uniquely identify tuples. Foreign Key: Attribute referencing primary key of another relation. Alternate Key: Candidate keys not chosen as primary key. Composite Key: Primary key consisting of multiple attributes.',
      subject_id: '1',
      module_no: 1
    },


    {
      id: '4',
      question_text: 'Explain the different types of JOIN operations in SQL with examples.',
      answer_text: 'INNER JOIN: Returns matching rows from both tables. LEFT JOIN: Returns all rows from left table and matching rows from right table, NULL for non-matches. RIGHT JOIN: Returns all rows from right table and matching rows from left table. FULL OUTER JOIN: Returns all rows from both tables, with NULL where no match exists. CROSS JOIN: Returns Cartesian product of both tables. Example: SELECT * FROM Students INNER JOIN Courses ON Students.course_id = Courses.id',
      subject_id: '1',
      module_no: 2
    },
    {
      id: '5',
      question_text: 'What is the difference between WHERE and HAVING clause in SQL?',
      answer_text: 'WHERE clause filters rows before grouping and cannot use aggregate functions. It is applied on individual rows. HAVING clause filters groups after GROUP BY operation and can use aggregate functions. Example: SELECT dept, COUNT(*) FROM emp WHERE salary > 5000 GROUP BY dept HAVING COUNT(*) > 2. WHERE filters employees with salary > 5000, HAVING filters departments with more than 2 such employees.',
      subject_id: '1',
      module_no: 2
    },
    {
      id: '6',
      question_text: 'Explain Relational Algebra operations: Selection, Projection, and Cartesian Product.',
      answer_text: 'Selection (σ): Selects tuples that satisfy a given condition, returns subset of rows. Example: σ(age>20)(Student). Projection (π): Selects specified attributes, returns subset of columns. Example: π(name,age)(Student). Cartesian Product (×): Combines each tuple of first relation with every tuple of second relation. Example: Student × Course produces all possible combinations.',
      subject_id: '1',
      module_no: 2
    },


    {
      id: '7',
      question_text: 'Define functional dependency and explain its types with examples.',
      answer_text: 'Functional Dependency (X→Y) means value of X uniquely determines value of Y. Types: Trivial FD (Y⊆X, e.g., AB→A), Non-trivial FD (Y⊄X, e.g., StudentID→Name), Complete FD (removing any attribute from X breaks dependency), Partial FD (dependency holds with subset of X), and Transitive FD (X→Y and Y→Z implies X→Z). Example: In Student(ID, Name, Dept, HOD), ID→Name, Dept→HOD, therefore ID→HOD is transitive.',
      subject_id: '1',
      module_no: 3
    },
    {
      id: '8',
      question_text: 'Explain the process of normalization up to 3NF with an example.',
      answer_text: '1NF: Eliminate repeating groups, ensure atomic values. 2NF: Remove partial dependencies (non-prime attributes fully dependent on candidate key). 3NF: Remove transitive dependencies. Example: Student(ID, Name, Dept, HOD) - Not in 2NF if Dept→HOD exists. Solution: Student(ID, Name, Dept) and Department(Dept, HOD). This achieves 3NF as no transitive dependencies remain.',
      subject_id: '1',
      module_no: 3
    },
    {
      id: '9',
      question_text: 'What is BCNF? How is it different from 3NF?',
      answer_text: 'BCNF (Boyce-Codd Normal Form) is stricter than 3NF. In BCNF, for every functional dependency X→Y, X must be a super key. 3NF allows non-prime attributes to depend on candidate keys. A relation in BCNF is always in 3NF, but 3NF relation may not be in BCNF. BCNF eliminates all redundancy based on functional dependencies, while 3NF may allow some redundancy to preserve dependencies.',
      subject_id: '1',
      module_no: 3
    },


    {
      id: '10',
      question_text: 'Explain ACID properties of transactions in detail.',
      answer_text: 'Atomicity: Transaction is all-or-nothing; either all operations complete or none do. Consistency: Transaction brings database from one valid state to another, maintaining all constraints. Isolation: Concurrent transactions execute as if sequential, preventing interference. Durability: Once committed, changes persist even after system failure. Example: Bank transfer must be atomic (debit and credit both occur), consistent (total money unchanged), isolated (other transactions dont see partial state), and durable (survives crashes).',
      subject_id: '1',
      module_no: 4
    },
    {
      id: '11',
      question_text: 'What are the different transaction states? Explain with a state diagram.',
      answer_text: 'Active: Initial state, transaction is executing. Partially Committed: After final operation executed, before commit. Committed: Transaction successfully completed, changes permanent. Failed: Transaction cannot proceed after encountering error. Aborted: Transaction rolled back, database restored to state before transaction started. Terminated: Transaction left the system. Flow: Active → Partially Committed → Committed → Terminated, or Active → Failed → Aborted → Terminated.',
      subject_id: '1',
      module_no: 4
    },
    {
      id: '12',
      question_text: 'Explain Two-Phase Locking (2PL) protocol and its variants.',
      answer_text: 'Two-Phase Locking ensures serializability with two phases: Growing Phase (acquire locks, no release) and Shrinking Phase (release locks, no acquire). Variants: Basic 2PL (described above), Conservative 2PL (acquire all locks before execution), Strict 2PL (hold all locks until commit/abort, prevents cascading rollback), and Rigorous 2PL (hold all locks until transaction ends). Strict and Rigorous 2PL are most commonly used in practice.',
      subject_id: '1',
      module_no: 4
    },


    {
      id: '13',
      question_text: 'Explain log-based recovery techniques: Deferred and Immediate update.',
      answer_text: 'Deferred Update: All updates recorded in log but written to database only after commit. If transaction fails, log entries are discarded. On recovery, only committed transactions need to be redone. Immediate Update: Database updated before commit, changes logged. Failed transactions must be undone using log. Recovery requires both UNDO (uncommitted transactions) and REDO (committed transactions). Deferred is simpler but requires more buffer space.',
      subject_id: '1',
      module_no: 5
    },
    {
      id: '14',
      question_text: 'What is a B-Tree? Explain its properties and advantages in database indexing.',
      answer_text: 'B-Tree is balanced tree structure where: all leaves at same level, each node has maximum m children (order m), minimum ⌈m/2⌉ children (except root), keys sorted within node. Advantages: Logarithmic search time O(log n), efficient for range queries, reduces disk I/O as each node contains multiple keys, maintains balance automatically on insertion/deletion. Used in database indexing because it minimizes disk accesses by storing multiple keys per disk block.',
      subject_id: '1',
      module_no: 5
    },
    {
      id: '15',
      question_text: 'Explain query optimization and the role of query processing phases.',
      answer_text: 'Query Optimization selects most efficient execution plan from possible alternatives. Phases: (1) Parsing and Translation: Convert SQL to relational algebra, check syntax/semantics. (2) Optimization: Generate equivalent expressions, estimate cost using statistics, choose minimum cost plan. (3) Evaluation: Execute selected plan. Optimizer uses heuristics (pushing selections down) and cost-based methods (comparing I/O and CPU costs). Goal is minimizing response time and resource usage.',
      subject_id: '1',
      module_no: 5
    },
  ];

  const mockFlashcards: Flashcard[] = [
    { id: '1', question_text: 'What is a Primary Key?', answer_text: 'A primary key is a unique identifier for each record in a database table. It must contain unique values and cannot contain NULL values. Each table can have only one primary key.', subject_id: '1', module_no: 1 },
    { id: '2', question_text: 'What is Data Independence?', answer_text: 'Data independence is the ability to modify schema at one level without affecting schema at the next higher level. Two types: Logical (modify conceptual schema without changing external schema) and Physical (modify internal schema without changing conceptual schema).', subject_id: '1', module_no: 1 },
    { id: '3', question_text: 'What is an Entity?', answer_text: 'An entity is a real-world object or thing that has an independent existence and can be distinctly identified. Examples include Student, Employee, Course. Each entity has attributes that describe its properties.', subject_id: '1', module_no: 1 },

    { id: '4', question_text: 'What is a Foreign Key?', answer_text: 'A foreign key is an attribute in one table that references the primary key of another table. It establishes relationships between tables and maintains referential integrity in the database.', subject_id: '1', module_no: 2 },
    { id: '5', question_text: 'What is SQL?', answer_text: 'SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. It includes DDL (Data Definition Language), DML (Data Manipulation Language), and DCL (Data Control Language) commands.', subject_id: '1', module_no: 2 },
    { id: '6', question_text: 'What is a View in SQL?', answer_text: 'A view is a virtual table based on the result of an SQL SELECT query. It contains rows and columns just like a real table but does not store data physically. Views provide security and simplify complex queries.', subject_id: '1', module_no: 2 },

    { id: '7', question_text: 'What is Normalization?', answer_text: 'Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing large tables into smaller ones and defining relationships between them using normal forms (1NF, 2NF, 3NF, BCNF).', subject_id: '1', module_no: 3 },
    { id: '8', question_text: 'What is Functional Dependency?', answer_text: 'Functional dependency (X→Y) is a constraint between two sets of attributes where the value of X uniquely determines the value of Y. It is fundamental to database normalization and helps identify keys in relations.', subject_id: '1', module_no: 3 },
    { id: '9', question_text: 'What is 1NF (First Normal Form)?', answer_text: '1NF requires that all attributes contain only atomic (indivisible) values and each attribute contains values of a single type. There should be no repeating groups or arrays within a table.', subject_id: '1', module_no: 3 },

    { id: '10', question_text: 'What is a Transaction?', answer_text: 'A transaction is a logical unit of work that contains one or more SQL statements. It must satisfy ACID properties (Atomicity, Consistency, Isolation, Durability) to ensure database reliability and data integrity.', subject_id: '1', module_no: 4 },
    { id: '11', question_text: 'What is Deadlock?', answer_text: 'Deadlock is a situation where two or more transactions are waiting indefinitely for each other to release locks. It occurs when transactions hold resources and request additional resources held by other transactions, creating a circular wait condition.', subject_id: '1', module_no: 4 },
    { id: '12', question_text: 'What is Serializability?', answer_text: 'Serializability is a property of concurrent transaction execution that ensures the result is equivalent to some serial execution of those transactions. It is the correctness criterion for concurrent executions and ensures consistency.', subject_id: '1', module_no: 4 },

    { id: '13', question_text: 'What is Database Recovery?', answer_text: 'Database recovery is the process of restoring the database to a correct state after a failure. It uses transaction logs to undo incomplete transactions (rollback) and redo committed transactions to ensure ACID properties are maintained.', subject_id: '1', module_no: 5 },
    { id: '14', question_text: 'What is an Index?', answer_text: 'An index is a database structure that improves the speed of data retrieval operations. It works like a book index, allowing quick location of data without scanning the entire table. Common types include B-Tree, Hash, and Bitmap indexes.', subject_id: '1', module_no: 5 },
    { id: '15', question_text: 'What is Query Optimization?', answer_text: 'Query optimization is the process of selecting the most efficient execution plan for a query from multiple alternatives. The optimizer considers factors like available indexes, table statistics, and join methods to minimize execution time and resource usage.', subject_id: '1', module_no: 5 },
  ];

  const mockAssignments: Assignment[] = [
    {
      id: '1',
      schedule_id: '1',
      title: 'DBMS ER Diagram Assignment',
      description: 'Design ER diagram for university management system including students, courses, faculty, and departments.',
      duration: '1 week',
      status: 'pending',
      date: new Date(Date.now() + 172800000).toISOString()
    },
    {
      id: '2',
      schedule_id: '1',
      title: 'SQL Queries Practice',
      description: 'Write complex SQL queries involving joins, subqueries, and aggregate functions for the given database schema.',
      duration: '5 days',
      status: 'pending',
      date: new Date(Date.now() + 432000000).toISOString()
    },
    {
      id: '3',
      schedule_id: '1',
      title: 'Normalization Exercise',
      description: 'Normalize given unnormalized relations up to BCNF and explain each step with functional dependencies.',
      duration: '1 week',
      status: 'completed',
      date: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '4',
      schedule_id: '1',
      title: 'Transaction Management Lab',
      description: 'Implement concurrency control using two-phase locking protocol and demonstrate deadlock scenarios.',
      duration: '10 days',
      status: 'pending',
      date: new Date(Date.now() + 604800000).toISOString()
    },
    {
      id: '5',
      schedule_id: '1',
      title: 'Database Mini Project',
      description: 'Develop a complete database application with frontend for library management including all CRUD operations.',
      duration: '3 weeks',
      status: 'pending',
      date: new Date().toISOString()
    }
  ];

  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'DBMS ER Diagram Assignment Due',
      description: 'Submit ER diagram by end of week',
      date: new Date(Date.now() + 172800000).toISOString(),
      daysLeft: 2,
      type: 'assignment'
    },
    {
      id: '2',
      title: 'SQL Queries Assignment',
      description: 'Practice queries submission in 5 days',
      date: new Date(Date.now() + 432000000).toISOString(),
      daysLeft: 5,
      type: 'assignment'
    },
    {
      id: '3',
      title: 'Database Project Checkpoint',
      description: 'First milestone review tomorrow',
      date: new Date(Date.now() + 86400000).toISOString(),
      daysLeft: 1,
      type: 'schedule'
    },
    {
      id: '4',
      title: 'Module 4 Quiz',
      description: 'Transaction Management quiz next week',
      date: new Date(Date.now() + 604800000).toISOString(),
      daysLeft: 7,
      type: 'schedule'
    }
  ];


  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(subjects[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);


  const [topics] = useState<Topic[]>(mockTopics);
  const [questions] = useState<Question[]>(mockQuestions);
  const [flashcards] = useState<Flashcard[]>(mockFlashcards);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);


  const [isFlashcardsModalOpen, setIsFlashcardsModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [calendarEvents, setCalendarEvents] = useState<{ [key: string]: any[] }>({});
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([]);
  const [isDateEventsModalOpen, setIsDateEventsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  const importantDates = [15, 8, 22, 25, 28];


  const [isProgressOpen, setIsProgressOpen] = useState(false);

  const calculateProgress = () => {
    const totalTopics = mockTopics.length;
    const totalQuestions = mockQuestions.length;
    const totalFlashcards = mockFlashcards.length;
    const totalAssignments = mockAssignments.length;

    const reviewedTopics = 12;
    const answeredQuestions = 7;
    const reviewedFlashcards = 9;
    const completedAssignments = mockAssignments.filter(a => a.status === 'completed').length;

    const topicsProgress = Math.round((reviewedTopics / totalTopics) * 100);
    const questionsProgress = Math.round((answeredQuestions / totalQuestions) * 100);
    const flashcardsProgress = Math.round((reviewedFlashcards / totalFlashcards) * 100);
    const assignmentsProgress = Math.round((completedAssignments / totalAssignments) * 100);

    const overallProgress = Math.round((topicsProgress + questionsProgress + flashcardsProgress + assignmentsProgress) / 4);

    return {
      overall: overallProgress,
      topics: topicsProgress,
      questions: questionsProgress,
      flashcards: flashcardsProgress,
      assignments: assignmentsProgress
    };
  };

  const progress = calculateProgress();

  const getMotivationalMessage = () => {
    if (progress.overall >= 80) {
      return { message: "Amazing work, Diya! You're crushing it! 🌟", color: "text-green-600" };
    } else if (progress.overall >= 60) {
      return { message: "Great progress, Diya! Keep it up! 💪", color: "text-blue-600" };
    } else if (progress.overall >= 40) {
      return { message: "You're getting there, Diya! Stay focused! 🎯", color: "text-yellow-600" };
    } else {
      return { message: "Come on Diya, you got this! Let's push harder! 🚀", color: "text-orange-600" };
    }
  };

  const motivationalMsg = getMotivationalMessage();

  const primaryColor = "rgba(255, 140, 90, 1)";
  const backgroundColor = "rgba(18, 87, 116, 1)";
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleLogout = async () => {
    router.push('/');
  };

  const getTopicsForModule = (moduleNumber: string): Topic[] => {
    const moduleNum = moduleNumber.split(' ')[1];
    return topics.filter(topic => topic.module_no.toString() === moduleNum);
  };

  const getQuestionsForModule = (moduleNumber: string): Question[] => {
    const moduleNum = moduleNumber.split(' ')[1];
    return questions.filter(question => question.module_no.toString() === moduleNum);
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
      const isImportantDate = importantDates.includes(day);

      let buttonClasses = "text-center p-2 rounded-full transition-all";

      if (isImportantDate) {
        buttonClasses += " bg-red-100 text-red-600 hover:bg-red-200 font-semibold";
      } else if (hasEvents) {
        buttonClasses += " bg-green-100 text-green-600 hover:bg-green-200";
      } else {
        buttonClasses += " bg-gray-100 text-gray-600 hover:bg-gray-200";
      }

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
    <div className="flex h-screen bg-[#125774] overflow-hidden flex-col md:flex-row">
      <div className="md:hidden bg-[#125774] p-4 flex items-center justify-between border-b border-white/10 z-20">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6 text-white" />
          <div className="font-josefinSans text-xl font-bold text-white">
            EDU<span className="text-[#ff8c5a]">QUEST</span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl md:shadow-lg flex flex-col h-full
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4" style={{ background: primaryColor }}>
          <div className="flex items-center gap-2 mb-8">
            <Book className="h-6 w-6 text-gray-800" />
            <div className="font-josefinSans text-2xl font-bold">
              <span>EDU</span>
              <span style={{ color: backgroundColor }}>QUEST</span>
            </div>
          </div>

          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 rounded-full overflow-hidden w-24 h-24 bg-gray-300">
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



          <button
            onClick={() => setIsResourcesModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-50 mt-1"
          >
            <Library className="h-5 w-5" />
            <span>Resources</span>
          </button>

          <div className="mt-4">
            <button
              onClick={() => setIsProgressOpen(!isProgressOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5" />
                <span>My Progress</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${isProgressOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProgressOpen && (
              <div className="mt-3 px-2">
                <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-blue-50 border-l-4" style={{ borderColor: primaryColor }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4" style={{ color: primaryColor }} />
                    <p className="font-josefinSans text-xs font-bold text-gray-700">MOTIVATION</p>
                  </div>
                  <p className={`font-josefinSans text-sm font-semibold ${motivationalMsg.color}`}>
                    {motivationalMsg.message}
                  </p>
                </div>

                <div className="mb-4 p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-josefinSans text-xs font-semibold text-gray-700">Overall</span>
                    <span className="font-josefinSans text-xs font-bold" style={{ color: backgroundColor }}>{progress.overall}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${progress.overall}%`,
                        background: `linear-gradient(to right, ${primaryColor}, ${backgroundColor})`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-josefinSans text-xs text-gray-600">Topics Covered</span>
                      <span className="font-josefinSans text-xs font-semibold text-gray-700">{progress.topics}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${progress.topics}%`, backgroundColor: backgroundColor }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-josefinSans text-xs text-gray-600">Questions Solved</span>
                      <span className="font-josefinSans text-xs font-semibold text-gray-700">{progress.questions}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${progress.questions}%`, backgroundColor: primaryColor }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-josefinSans text-xs text-gray-600">Flashcards Reviewed</span>
                      <span className="font-josefinSans text-xs font-semibold text-gray-700">{progress.flashcards}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${progress.flashcards}%`, backgroundColor: '#10b981' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-josefinSans text-xs text-gray-600">Assignments Done</span>
                      <span className="font-josefinSans text-xs font-semibold text-gray-700">{progress.assignments}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${progress.assignments}%`, backgroundColor: '#8b5cf6' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg border-2 border-dashed" style={{ borderColor: primaryColor }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4" style={{ color: primaryColor }} />
                    <span className="font-josefinSans text-xs font-bold text-gray-700">WEEKLY TARGET</span>
                  </div>
                  <p className="font-josefinSans text-xs text-gray-600">Complete 3 more modules to reach 75%</p>
                </div>
              </div>
            )}
          </div>

        </nav>

        <div className="mb-5 p-6 space-y-2">
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-all font-medium"
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-black hover:bg-red-400/10 hover:text-red-400 transition-all font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-[#125774] overflow-y-auto w-full">
        {selectedSubject ? (
          <div>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h1 className="font-noto text-xl md:text-2xl font-semibold text-white leading-tight">
                {selectedSubject.subject_name.toUpperCase()} - OVERVIEW 📚
              </h1>
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="font-noto px-4 py-2 rounded-lg text-white w-full md:w-auto text-sm md:text-base"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-xl shadow-sm max-h-[400px]">
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

            <ResourcesModal
              isOpen={isResourcesModalOpen}
              onClose={() => setIsResourcesModalOpen(false)}
            />

            <SettingsModal
              isOpen={isSettingsModalOpen}
              onClose={() => setIsSettingsModalOpen(false)}
              profile={profile}
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
    </div >
  );
};

export default Schedule;