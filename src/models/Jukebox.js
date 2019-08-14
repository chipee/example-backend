/**
 * @class - Represent a jukebox
 */
module.exports = class Jukebox{
    /**
     * Represent a jukebox
     * @constructor
     * @param {string} id - The id of a given jukebox
     * @param {string} model - The model name of a given jukebox
     * @param {array} components - A list of component object
     */
    constructor(id, model, components){
        this.id = id;
        this.model = model;
        this.components = components;
    }

    /**
     * Detect if a given jukebox has all settings requirements
     * @function
     * @param {array} requires - A list of requires setting
     * @return {boolean} - return true if all setting is included into jukebox component
     */
    matchSetting(requires){
        let jbCompo = this.components.map(compo => (compo.name));
        
        if(requires.length === 0 && jbCompo.length > 0){
            return false;
        }

        for(let r of requires){
            if(!jbCompo.includes(r)){
                return false;
            }
        }

        return true
    }
}