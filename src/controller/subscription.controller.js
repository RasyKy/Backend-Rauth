const { db } = require('../config/firebase');

const getAllPlans = async (req, res) => {
    try {
      const snapshot = await db.collection('SubscriptionPlan').get();
      const plans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching plans: ' + error.message });
    }
};

const createSubscription = async (req, res) => {
    const { planId } = req.body;
    const studentId = req.uid;

    try {
        const planDoc = await db.collection('SubscriptionPlan').doc(planId).get();
        if (!planDoc.exists) return res.status(404).json({ message: 'Plan not found.' });
        
        const plan = planDoc.data();
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + plan.DurationDays);

        const subData = {
            StudentID: studentId, PlanID: planId,
            StartDate: startDate, EndDate: endDate,
            isActive: true, LastPaymentDate: new Date()
        };
        const docRef = await db.collection('UserSubscription').add(subData);
        res.status(201).json({ message: 'Subscription successful!', id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating subscription: ' + error.message });
    }
};

const getMySubscription = async (req, res) => {
    try {
        const snapshot = await db.collection('UserSubscription')
                                 .where('StudentID', '==', req.uid)
                                 .where('isActive', '==', true)
                                 .get();
        if (snapshot.empty) return res.status(404).json({ message: 'No active subscription.'});
        const subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(subs[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscription: ' + error.message });
    }
};

module.exports = {
    getAllPlans,
    createSubscription,
    getMySubscription
};
