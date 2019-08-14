const express = require('express');
const jukebox = express.Router();

const Setting = require('../../models/Setting.js');
const utils = require('../../utils/utils.js')

/**
 * Middleware to sanitize user input
 * @function
 */
jukebox.use((req, res, next) => {
    if(!utils.userInputSanitizer(req.query.settingId, utils.isValidSettingID)){
        req.query.settingId = "INVALID";
    }

    next();
});
/**
 * Middleware to fetch setting
 * @function
 */
jukebox.use(utils.fetchSetting); // fetch setting

/**
 * Middleware to fetch jukebox
 * @function
 */
jukebox.use(utils.fetchJukebox); // fetch jukebox

/**
 * Middleware to filter jukebox by reqested setting and split into a page
 * @functions
 */
jukebox.use((req, res, next) =>{ // Match jukebox setting and split into pages.
    if(req.query.settingId !== "INVALID"){
        req.jukeboxList = utils.splitPerPage(
            req.jukeboxList.filter(juke => juke.matchSetting(req.reqSetting.requires)),
            req.query.limit,
            req.query.offset
        );
    }
    
    next();
});

/**
 * Get a paginate juke list filtered by requested setting 
 * @type {endpoint} - /api/jukebox
 * @method GET
 * @param {string} settingId - Required
 * ex: 922a8e2b-6278-498a-a54a-fd92206ace67
 * @param {sting} model - Only select a jukebox model
 * @param {number} limit - Jukebox per pages
 * @param {number} offset - Reqested page
 * if request page is bigger than total page available, it will return the entire jukebox list
 */
jukebox.get('/', (req, res) => {

    if(req.query.settingId !== "INVALID"){
        res.json(req.jukeboxList);
    }
    else{
        res.status(400);
        res.json("INVALID SETTING ID");
    }
});


module.exports = jukebox;