const { db } = require('../config/firebase');

const createLesson = async (req, res) => {
    try {
        const { title, content, order } = req.body;

        if (!title || !content || order === undefined) {
            return res.status(400).json({ message: 'Missing required fields: title, content, and order.' });
        }

        const lessonData = {
            title,
            content,
            order: Number(order), 
            createdAt: new Date()
        };

        const docRef = await db.collection('lessons').add(lessonData);
        res.status(201).json({ message: 'Lesson created successfully!', id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating lesson: ' + error.message });
    }
};

const getAllLessons = async (req, res) => {
    try {
        const snapshot = await db.collection('lessons').orderBy('order').get();
        const lessons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons: ' + error.message });
    }
};

const getLessonById = async (req, res) => {
    try {
        const doc = await db.collection('lessons').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lesson: ' + error.message });
    }
};

const updateLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const updateData = req.body; 
        if (!lessonId) {
            return res.status(400).json({ message: 'Lesson ID is required.' });
        }

        const docRef = db.collection('lessons').doc(lessonId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }

        updateData.updatedAt = new Date();

        await docRef.update(updateData);
        res.status(200).json({ message: 'Lesson updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating lesson: ' + error.message });
    }
};

const deleteLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;

        if (!lessonId) {
            return res.status(400).json({ message: 'Lesson ID is required.' });
        }

        const docRef = db.collection('lessons').doc(lessonId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }

        await docRef.delete();
        res.status(200).json({ message: 'Lesson deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lesson: ' + error.message });
    }
};

module.exports = {
    createLesson,   
    getAllLessons,  
    getLessonById,  
    updateLesson,   
    deleteLesson    
};