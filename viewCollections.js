const { db } = require('./src/config/firebase');

async function viewAllCollections() {
    const collections = [
        'USERS',
        'lessons',
        'quizzes',
        'mockExams',
        'LessonProgress',
        'QuizAttempt',
        'ExamAttempt',
        'SubscriptionPlan',
        'UserSubscription'
    ];

    for (const collectionName of collections) {
        console.log(`\n=== ${collectionName} Collection ===`);
        try {
            const snapshot = await db.collection(collectionName).get();
            if (snapshot.empty) {
                console.log('No documents found in collection.');
            } else {
                snapshot.forEach(doc => {
                    console.log('Document ID:', doc.id);
                    console.log('Data:', doc.data());
                    console.log('---');
                });
            }
        } catch (error) {
            console.log(`Error fetching ${collectionName}:`, error.message);
        }
    }
}

viewAllCollections()
    .then(() => console.log('\nFinished viewing all collections'))
    .catch(error => console.error('Error:', error));