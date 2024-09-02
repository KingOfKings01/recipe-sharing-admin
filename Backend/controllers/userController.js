import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const approveUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.approve = true;
      await user.save();
      res.json({ message: 'User approved' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve user' });
  }
};

export const banUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.approve = false;
      await user.save();
      res.json({ message: 'User banned' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to ban user' });
  }
};
