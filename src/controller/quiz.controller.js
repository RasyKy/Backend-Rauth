const { db } = require("../config/firebase");

const createQuiz = async (req, res) => {
  try {
    const { module, title, questions } = req.body;

    if (!module || !title) {
      return res
        .status(400)
        .json({ message: "Missing required fields: module and title." });
    }

    const quizData = {
      module,
      title,
      questions: questions || [],
      createdAt: new Date(),
    };

    await db.collection("quizzes").add(quizData);
    res.status(201).json({ message: "Quiz created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz: " + error.message });
  }
};

const getQuizzesByModule = async (req, res) => {
  try {
    const snapshot = await db
      .collection("quizzes")
      .where("module", "==", req.params.moduleName)
      .get();
    if (snapshot.empty)
      return res
        .status(404)
        .json({ message: "No quizzes found for this module." });
    const quizzes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(quizzes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching quizzes: " + error.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const doc = await db.collection("quizzes").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Quiz not found." });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz: " + error.message });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const snapshot = await db.collection("quizzes").get();

    const quizzes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(quizzes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all quizzes: " + error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const updateData = req.body;

    if (!quizId) {
      return res.status(400).json({ message: "Quiz ID is required." });
    }

    const docRef = db.collection("quizzes").doc(quizId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(44).json({ message: "Quiz not found." });
    }

    updateData.updatedAt = new Date();

    await docRef.update(updateData);
    res.status(200).json({ message: "Quiz updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz: " + error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;

    if (!quizId) {
      return res.status(400).json({ message: "Quiz ID is required." });
    }

    const docRef = db.collection("quizzes").doc(quizId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    await docRef.delete();
    res.status(200).json({ message: "Quiz deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz: " + error.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzesByModule,
  getQuizById,
  getAllQuizzes,
  updateQuiz,
  deleteQuiz,
};
