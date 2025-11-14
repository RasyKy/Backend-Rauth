const { db } = require('./admin-init');

const quizzesData = [
  {
    title: 'Node.js Basics Quiz',
    module: 'Backend Development',
    questions: [
      {
        questionText: "What is Node.js built on?",
        options: [
          "Google's V8 Engine",
          "Mozilla's SpiderMonkey",
          "Java Virtual Machine"
        ],
        correctAnswerIndex: 0 
      },
      {
        questionText: "Which of the following is a core module in Node.js?",
        options: [
          "react",
          "fs (File System)",
          "lodash"
        ],
        correctAnswerIndex: 1
      },
      {
        questionText: "What command is used to initialize a new Node.js project?",
        options: [
          "npm start",
          "node init",
          "npm init"
        ],
        correctAnswerIndex: 2
      }
    ]
  },
  {
    title: 'HTML & CSS Basics Quiz',
    module: 'Frontend Development',
    questions: [
      {
        questionText: "What does 'HTML' stand for?",
        options: [
          "HyperText Markup Language",
          "High-Level Text Machine Language",
          "Hyperlink and Text Markup"
        ],
        correctAnswerIndex: 0
      },
      {
        questionText: "Which CSS property is used to change the text color?",
        options: [
          "font-color",
          "text-color",
          "color"
        ],
        correctAnswerIndex: 2
      }
    ]
  }
];

async function addDummyQuizzes() {
  console.log('Starting to add dummy quizzes...');

  const addPromises = quizzesData.map(quiz => {
    return db.collection('quizzes').add(quiz);
  });

  try {
    const documentReferences = await Promise.all(addPromises);
    
    console.log(`Success! Added ${documentReferences.length} quizzes.`);
    documentReferences.forEach(docRef => {
      console.log(`  - Added quiz with ID: ${docRef.id}`);
    });

  } catch (error) {
    console.error('Error adding dummy quizzes:', error.message);
  }
}

addDummyQuizzes();