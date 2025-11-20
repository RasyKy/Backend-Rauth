const { db } = require('./admin-init');

const quizzesData = [
  {
    title: 'Khmer Rouge: Core Facts (T/F)',
    module: 'Cambodian History',
    questions: [
      {
        questionText: "The Khmer Rouge regime officially took power and began its rule in 1975.",
        options: [
          "True",
          "False"
        ],
        // The correct answer is True (April 17, 1975)
        correctAnswerIndex: 0 
      },
      {
        questionText: "The capital city, Phnom Penh, was completely evacuated shortly after the Khmer Rouge took control.",
        options: [
          "True",
          "False"
        ],
        // The correct answer is True
        correctAnswerIndex: 0
      },
      {
        questionText: "The leader of the Khmer Rouge was officially known by the name 'Sihanouk'.",
        options: [
          "True",
          "False"
        ],
        // The correct answer is False (The leader was Pol Pot)
        correctAnswerIndex: 1
      }
    ]
  },
  {
    title: 'Khmer Rouge: Policies & End (T/F)',
    module: 'Cambodian History',
    questions: [
      {
        questionText: "The Khmer Rouge aimed to create a purely agrarian (farming) society.",
        options: [
          "True",
          "False"
        ],
        // The correct answer is True
        correctAnswerIndex: 0
      },
      {
        questionText: "Money, private property, and markets were encouraged and protected under the regime.",
        options: [
          "True",
          "False"
        ],
        // The correct answer is False (They were abolished)
        correctAnswerIndex: 1
      },
      {
        questionText: "The regime was overthrown by an invasion from Thailand in late 1978/early 1979.",
        options: [
          "True",
          "False"
        ],
        // The correct answer is False (It was overthrown by Vietnam)
        correctAnswerIndex: 1
      }
    ]
  },
  {
    title: 'The French Colonial Era (1863–1953) - Part 1',
    module: 'History of Cambodia',
    questions: [
      {
        questionText: "In which year did King Norodom sign the treaty establishing the French Protectorate over Cambodia?",
        options: [
          "1853",
          "1863",
          "1873"
        ],
        // 1863
        correctAnswerIndex: 1 
      },
      {
        questionText: "Which two neighboring powers did Cambodia fear, leading it to seek protection from France?",
        options: [
          "China and Japan",
          "Siam (Thailand) and Vietnam",
          "Laos and Burma"
        ],
        // Siam (Thailand) and Vietnam
        correctAnswerIndex: 1
      },
      {
        questionText: "What was the main role of the French Resident-Superior under the Protectorate system?",
        options: [
          "Managing only religious and cultural affairs.",
          "Controlling foreign policy, finance, and public works.",
          "Serving as the King's personal advisor."
        ],
        // Controlling foreign policy, finance, and public works
        correctAnswerIndex: 1
      }
    ]
  },
  {
    title: 'The French Colonial Era (1863–1953) - Part 2',
    module: 'History of Cambodia',
    questions: [
      {
        questionText: "What was the administrative federation that Cambodia belonged to, along with Vietnam and Laos?",
        options: [
          "The Indochinese Commonwealth",
          "The French Union",
          "The French Indochina Union"
        ],
        // The French Indochina Union
        correctAnswerIndex: 2
      },
      {
        questionText: "Which Cambodian King is widely known as the 'Father of Independence' for leading the movement to end French rule?",
        options: [
          "King Norodom Sihanouk",
          "King Sisowath Monivong",
          "King Ang Duong"
        ],
        // King Norodom Sihanouk
        correctAnswerIndex: 0
      },
      {
        questionText: "In which year did Cambodia achieve complete independence from France?",
        options: [
          "1945",
          "1953",
          "1955"
        ],
        // 1953
        correctAnswerIndex: 1
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