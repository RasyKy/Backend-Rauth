const { db } = require('../config/firebase');


const saveLessonProgress = async (req, res) => {
    try {
        const { lessonId, isCompleted } = req.body;
        const studentId = req.uid;
        const docId = `${studentId}_${lessonId}`;

        const progressData = {
            StudentID: studentId,
            LessonID: lessonId,
            isCompleted: isCompleted,
            LastUpdated: new Date()
        };

        await db.collection('LessonProgress').doc(docId).set(progressData, { merge: true });
        res.status(201).json({ message: 'Progress saved!', id: docId });
    } catch (error) {
        res.status(500).json({ message: 'Error saving progress: ' + error.message });
    }
};

const saveQuizAttempt = async (req, res) => {
    try {
        const { quizId, score, timeTaken } = req.body;
        const attemptData = {
            StudentID: req.uid,
            QuizID: quizId,
            Score: score,
            TimeTaken: timeTaken,
            AttemptDate: new Date()
        };
        const docRef = await db.collection('QuizAttempt').add(attemptData);
        res.status(201).json({ message: 'Quiz attempt saved!', id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: 'Error saving quiz attempt: ' + error.message });
    }
};

const saveExamAttempt = async (req, res) => {
    try {
        const { examId, score, timeTaken } = req.body;
        const attemptData = {
            StudentID: req.uid,
            ExamID: examId,
            Score: score,
            TimeTaken: timeTaken,
            AttemptDate: new Date()
        };
        const docRef = await db.collection('ExamAttempt').add(attemptData);
        res.status(201).json({ message: 'Exam attempt saved!', id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: 'Error saving exam attempt: ' + error.message });
    }
};

const getMyLessonProgress = async (req, res) => {
    try {
        const snapshot = await db.collection('LessonProgress')
                                  .where('StudentID', '==', req.uid)
                                  .get();
        const progress = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching progress: ' + error.message });
    }
};

const getMyQuizAttempts = async (req, res) => {
    try {
        const snapshot = await db.collection('QuizAttempt')
                                  .where('StudentID', '==', req.uid)
                                  .where('QuizID', '==', req.params.quizId)
                                  .get();
        const attempts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(attempts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz attempts: ' + error.message });
    }
};

const getMyExamAttempts = async (req, res) => {
    try {
        const snapshot = await db.collection('ExamAttempt')
                                  .where('StudentID', '==', req.uid)
                                  .where('ExamID', '==', req.params.examId)
                                  .get();
        const attempts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(attempts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exam attempts: ' + error.message });
    }
};

const getAllMyQuizAttempts = async (req, res) => {
    try {
        const snapshot = await db.collection('QuizAttempt')
                                  .where('StudentID', '==', req.uid)
                                  .orderBy('AttemptDate', 'desc')
                                  .get();
        const attempts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(attempts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all quiz attempts: ' + error.message });
    }
};

const getAllMyExamAttempts = async (req, res) => {
    try {
        const snapshot = await db.collection('ExamAttempt')
                                  .where('StudentID', '==', req.uid)
                                  .orderBy('AttemptDate', 'desc')
                                  .get();
        const attempts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(attempts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all exam attempts: ' + error.message });
    }
};


module.exports = {
    saveLessonProgress,
    saveQuizAttempt,
    saveExamAttempt,
    getMyLessonProgress,
    getMyQuizAttempts,
    getMyExamAttempts,      
    getAllMyQuizAttempts,   
    getAllMyExamAttempts    
};
