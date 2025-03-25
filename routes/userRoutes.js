import { Router } from 'express';
import User, { find, findById, findByIdAndUpdate, findByIdAndDelete } from './models/User';
const router = Router();

// ✅ CREATE (POST) - Add a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ READ (GET) - Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ READ (GET) - Get a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE (PUT) - Update user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ DELETE (DELETE) - Delete user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
