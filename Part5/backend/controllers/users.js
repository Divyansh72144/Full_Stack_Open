const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    try {
      const users = await User.find({}).populate('blogs');
      response.json(users);
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (password === undefined || username === undefined) {
        return response.status(400).json({ error: 'password or username is empty' });
    }

    if (password.length < 3 || username.length < 3) {
        return response.status(400).json({ error: 'password or username must be at least 3 characters' });
    }

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            name,
            passwordHash,
        });

        const savedUser = await user.save();

        response.status(201).json(savedUser);
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return response.status(400).json({ error: 'Username already exists' });
        }
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = usersRouter;
