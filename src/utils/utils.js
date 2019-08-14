const request = require('request');

const Jukebox = require('../models/Jukebox.js');
const Setting = require('../models/Setting.js');

/**
 * General funtion to validate user input
 * @function
 * @param {*} param - take an user input. ex: res.query.settingId 
 * @param {function} checkFunction - fonction used to validate the user input
 * @returns {boolean}
 */
const userInputSanitizer = (param, checkFunction) => {
    return checkFunction(param);
}

/**
 * Validate that settingId is properly formed
 * @function
 * @param {string} id - With that form: 922a8e2b-6278-498a-a54a-fd92206ace67
 * @returns {boolean} 
 */
const isValidSettingID = (id) => {
    if(typeof(id) !== 'string') return false;
    
    let split = id.split('-');
    
    if(id.length !== 36) return false;
    if(split.length !== 5) return false;
    if(split[0].length !== 8) return false;
    if(split[1].length !== 4) return false;
    if(split[2].length !== 4) return false;
    if(split[3].length !== 4) return false;
    if(split[4].length !== 12) return false;
                

    return true
}

/**
 * Use by express
 * Fetch jukebox setting from an api
 * @function
 * @param {Object} - request object
 * @param {Object} - response object
 * @function - express `next()` function
 */
const fetchSetting = (req, res, next) => {
    url = "http://my-json-server.typicode.com/touchtunes/tech-assignment/settings"; //?id=" + req.reqSettingID;
    request.get(url, (err, resdata) => {
        
        if (err) throw err;
        
        let jdata = JSON.parse(resdata.body);
        req.reqSetting = jdata.settings.filter(value => value.id === req.query.settingId)[0];
        
        next();
    });
}

/**
 * Use by express
 * Fetch jukebox and push them to express req.jukeboxList
 * @function
 * @param {Object} - request object
 * @param {Object} - response object
 * @function - express `next()` function
 */
const fetchJukebox = (req, res, next) => {
    if(req.query.settingId === "INVALID") next();
    
    url = "http://my-json-server.typicode.com/touchtunes/tech-assignment/jukes"; //?model=";
    if(typeof req.query.model === 'string'){
        url += '?model=' + req.query.model;
    }
    
    request.get(url, (err, resdata) => {

        if (err) throw err;
        
        let jdata = JSON.parse(resdata.body);
         
        req.jukeboxList = [];
        jdata.forEach(jukebox => {
            req.jukeboxList.push(new Jukebox(jukebox.id, jukebox.model, jukebox.components))
        });
        
        next();
    });
}

/**
 * 
 * @param {array} items - List of items to paginate
 * @param {number} limit - Number of items per page
 * @param {number} offset - Current page
 */
const splitPerPage = (items, limit, offset=1) => {
    let nbPage;
    if(typeof(limit) !== 'undefined' && limit > 0){
        nbPage = Math.trunc(items.length / limit);
        if (items.length % limit > 0) nbPage++;

        let max = offset * limit;
        let min = max - limit;

        if(nbPage >= offset){
            items = items.filter((value, index) => (index >= min && index < max));
        }
        else{
            nbPage = 1;
            offset = 1;
        }
    }
    return {
        totalPage : nbPage || 1,
        offset : offset,
        item : items
    }
}

module.exports = {
    userInputSanitizer: userInputSanitizer,
    isValidSettingID: isValidSettingID,
    fetchSetting: fetchSetting,
    fetchJukebox: fetchJukebox,
    splitPerPage : splitPerPage
}