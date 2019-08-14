const express = require('express');
const api = express.Router();

const jukebox = require('./routes/jukebox.js');

/**
 * @typedef {string} endpoint
 */

 /**
  * API documentations url
  * @type {endpoint} - /api 
  */
api.use('/', express.static('docs'));

/**
 * Route to jukebox filtered by setting
 * @type {endpoint} - /api/jukebox
 */
api.use('/jukebox', jukebox);


module.exports = api;