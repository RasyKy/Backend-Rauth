const { db, auth } = require('../config/firebase');

const createProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const profileData = {
            Username: username,
            Email: email,
            Role: 'Student',
            CreatedAt: new Date()
        };
        
        await db.collection('USERS').doc(req.uid).set(profileData);
        res.status(201).json({ message: 'User profile created!', id: req.uid });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile: ' + error.message });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const userDoc = await db.collection('USERS').doc(req.uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User profile not found.'});
        }
        res.status(200).json({ id: userDoc.id, ...userDoc.data() });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile: ' + error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const snapshot = await db.collection('USERS').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users: ' + error.message });
    }
};

const setRole = async (req, res) => {
    const { targetUserId, newRole } = req.body;
    if (newRole !== 'Admin' && newRole !== 'Student') {
        return res.status(400).json({ message: 'Invalid role.'});
    }
    try {
        await auth.setCustomUserClaims(targetUserId, { role: newRole });
        await db.collection('USERS').doc(targetUserId).update({ Role: newRole });
        res.status(200).json({ message: `Successfully set ${targetUserId} role to ${newRole}`});
    } catch (error) {
        res.status(500).json({ message: 'Error setting user role: ' + error.message });
    }
};

module.exports = {
    createProfile,
    getMyProfile,
    getAllUsers,
    setRole
};
