const { db } = require('./admin-init');

const mockExamsData = [
  {
    title: 'Final Backend Development Exam',
    module: 'Backend Development',
    timeLimitMinutes: 45, 
    passMarkPercent: 70, 
    questions: [
      {
        questionText: "What is the purpose of the 'package.json' file?",
        options: [
          "To list all project dependencies",
          "To run the Node.js application",
          "To store user credentials",
          "To define environment variables"
        ],
        correctAnswerIndex: 0
      },
      {
        questionText: "Which HTTP method is typically used to create a new resource in a REST API?",
        options: [
          "GET",
          "PUT",
          "POST",
          "DELETE"
        ],
        correctAnswerIndex: 2
      },
      {
        questionText: "What does 'middleware' mean in the context of Express.js?",
        options: [
          "A function that runs at the end of the request-response cycle",
          "A database for storing session data",
          "A function that has access to the request, response, and next function",
          "The main application file"
        ],
        correctAnswerIndex: 2
      },
      {
        questionText: "How do you get query parameters from a URL in Express? (e.g., /search?q=node)",
        options: [
          "req.params.q",
          "req.body.q",
          "req.query.q",
          "req.data.q"
        ],
        correctAnswerIndex: 2
      },
      {
        questionText: "Which of these is NOT a valid NoSQL database type?",
        options: [
          "Document",
          "Key-Value",
          "Relational",
          "Column-family"
        ],
        correctAnswerIndex: 2
      }
    ]
  },
  {
    title: 'Frontend Fundamentals Exam',
    module: 'Frontend Development',
    timeLimitMinutes: 30,
    passMarkPercent: 75,
    questions: [
       {
        questionText: "What is the 'DOM'?",
        options: [
          "Data Object Model",
          "Document Object Model",
          "Dynamic Object Method",
          "Document Orientation Model"
        ],
        correctAnswerIndex: 1
      },
      {
        questionText: "How do you select an element with the id 'header' in CSS?",
        options: [
          ".header",
          "header",
          "#header",
          "Element.header"
        ],
        correctAnswerIndex: 2
      }
    ]
  }
];

async function addDummyMockExams() {
  console.log('Starting to add dummy mock exams...');

  const addPromises = mockExamsData.map(exam => {
    return db.collection('mockExams').add(exam);
  });

  try {
    const documentReferences = await Promise.all(addPromises);
    
    console.log(`Success! Added ${documentReferences.length} mock exams.`);
    documentReferences.forEach(docRef => {
      console.log(`  - Added mock exam with ID: ${docRef.id}`);
    });

  } catch (error)
 {
    console.error('Error adding dummy mock exams:', error.message);
  }
}

addDummyMockExams();