const logger = require('./logger');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) =>

{
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const userExtractor = async (request, response, next) => {
  try {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (decodedToken.id) {
        const user = await User.findById(decodedToken.id);
        request.user = user;
      }
    } else {
      request.user = null;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  else if (error.name ===  'JsonWebTokenError') { 
   return response.status(400).json({ error: 'token missing or invalid' })
  }
  else if (error.name === 'TokenExpiredError') {    
  return response.status(401).json({      error: 'token expired'    })  
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
