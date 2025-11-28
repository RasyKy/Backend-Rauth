const { db } = require("../config/firebase");

const createExam = async (req, res) => {
  try {
    const { module, title, questions } = req.body;

    if (!module || !title) {
      return res
        .status(400)
        .json({ message: "Missing required fields: module and title." });
    }

    const examData = {
      module,
      title,
      questions: questions || [],
      // ✅ FIX 1: Add this field so it doesn't get filtered out later
      createdAt: new Date(),
    };

    const docRef = await db.collection("mockExams").add(examData);
    res
      .status(201)
      .json({ message: "Mock exam created successfully!", id: docRef.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating exam: " + error.message });
  }
};

const getAllExams = async (req, res) => {
  try {
    // ✅ FIX 2: Removed .orderBy('createdAt') temporarily.
    // This ensures you can see ALL exams, even the old ones missing the date.
    const snapshot = await db.collection("mockExams").get();

    const exams = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(exams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all exams: " + error.message });
  }
};

const getExamsByModule = async (req, res) => {
  try {
    const snapshot = await db
      .collection("mockExams")
      .where("module", "==", req.params.moduleName)
      .get();
    if (snapshot.empty)
      return res
        .status(404)
        .json({ message: "No exams found for this module." });
    const exams = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams: " + error.message });
  }
};

const getExamById = async (req, res) => {
  try {
    const doc = await db.collection("mockExams").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Mock exam not found." });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam: " + error.message });
  }
};

const updateExam = async (req, res) => {
  try {
    const examId = req.params.id;
    const updateData = req.body;

    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required." });
    }

    const docRef = db.collection("mockExams").doc(examId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Mock exam not found." });
    }

    updateData.updatedAt = new Date();
    await docRef.update(updateData);
    res.status(200).json({ message: "Mock exam updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating exam: " + error.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    const examId = req.params.id;

    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required." });
    }

    const docRef = db.collection("mockExams").doc(examId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Mock exam not found." });
    }

    await docRef.delete();
    res.status(200).json({ message: "Mock exam deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exam: " + error.message });
  }
};

module.exports = {
  createExam,
  getExamsByModule,
  getExamById,
  getAllExams,
  updateExam,
  deleteExam,
};
