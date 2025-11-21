const { db } = require('../config/firebase');

const checkTrialOrSubscription = async (req, res, next) => {
    try {
        const userId = req.uid;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userDoc = await db.collection('Users').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = userDoc.data();

        const subSnapshot = await db.collection('UserSubscription')
            .where('StudentID', '==', userId)
            .where('isActive', '==', true)
            .get();
        if (!subSnapshot.empty) {
            return next();
        }

        let trialStart = user.trialStart;
        if (!trialStart) {
            trialStart = new Date();
            await db.collection('Users').doc(userId).update({ trialStart });
        } else {
            trialStart = new Date(trialStart._seconds ? trialStart._seconds * 1000 : trialStart);
        }

        const now = new Date();
        const diffTime = now - trialStart;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays <= 7) {
            return next();  
        } else {
            return res.status(403).json({ message: 'Your 7-day free trial has expired. Please subscribe to continue.' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Error checking trial/subscription', error: err.message });
    }
};

module.exports.checkTrialOrSubscription = checkTrialOrSubscription;

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
