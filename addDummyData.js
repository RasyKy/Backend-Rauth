const { db, auth } = require('./src/config/firebase');

const dummyData = {
    // Users dummy data
    USERS: [
        {
            Username: "john_doe",
            Email: "john@example.com",
            Role: "Student",
            CreatedAt: new Date()
        },
        {
            Username: "admin_user",
            Email: "admin@example.com",
            Role: "Admin",
            CreatedAt: new Date()
        }
    ],

    // Subscription Plans dummy data
    SubscriptionPlan: [
        {
            Name: "Basic Plan",
            Price: 9.99,
            DurationDays: 30,
            Features: ["Access to basic lessons", "Limited quiz attempts"]
        },
        {
            Name: "Premium Plan",
            Price: 19.99,
            DurationDays: 30,
            Features: ["Access to all content", "Unlimited quiz attempts", "Mock exam access"]
        }
    ],

    // User Subscriptions dummy data
    UserSubscription: [
        {
            StudentID: "dummy_user_1",
            PlanID: "basic_plan",
            StartDate: new Date(),
            EndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            isActive: true,
            LastPaymentDate: new Date()
        }
    ],

    // Lesson Progress dummy data
    LessonProgress: [
        {
            StudentID: "dummy_user_1",
            LessonID: "5GIVPtI8TTlkNEIbvjO1", // HTML & CSS lesson
            isCompleted: true,
            LastUpdated: new Date()
        },
        {
            StudentID: "dummy_user_1",
            LessonID: "92dGfNJo84hfixEmldJB", // Node.js lesson
            isCompleted: false,
            LastUpdated: new Date()
        }
    ],

    // Quiz Attempts dummy data
    QuizAttempt: [
        {
            StudentID: "dummy_user_1",
            QuizID: "AHPcNAH40HOCAUYB4aLW", // HTML & CSS quiz
            Score: 80,
            TimeTaken: 15, // minutes
            AttemptDate: new Date()
        },
        {
            StudentID: "dummy_user_1",
            QuizID: "TmwgVzRqEa0E17yFpF7o", // Node.js quiz
            Score: 65,
            TimeTaken: 20,
            AttemptDate: new Date()
        }
    ],

    // Exam Attempts dummy data
    ExamAttempt: [
        {
            StudentID: "dummy_user_1",
            ExamID: "9Yq7ufiuvJN5ulry9KZb", // Frontend exam
            Score: 78,
            TimeTaken: 25,
            AttemptDate: new Date()
        }
    ]
};

// Function to add dummy data to a collection
async function addDummyDataToCollection(collectionName, data) {
    console.log(`Adding dummy data to ${collectionName} collection...`);
    try {
        for (const item of data) {
            const docRef = await db.collection(collectionName).add(item);
            console.log(`Added document with ID: ${docRef.id}`);
        }
        console.log(`Successfully added dummy data to ${collectionName}`);
    } catch (error) {
        console.error(`Error adding dummy data to ${collectionName}:`, error);
    }
}

// Function to add all dummy data
async function addAllDummyData() {
    for (const [collection, data] of Object.entries(dummyData)) {
        await addDummyDataToCollection(collection, data);
    }
    console.log('Finished adding all dummy data');
}

// Run the function
addAllDummyData()
    .then(() => {
        console.log('Successfully added all dummy data to Firebase');
        // View the updated collections
        require('./viewCollections');
    })
    .catch(error => {
        console.error('Error:', error);
    });