/**
 * Created by blossom on 2/15/17.
 */

var singleton = function singleton(){
    var addressArray = {};

    for(var i = 1024; i < 65535; i++)
        addressArray[i] = i++
}

/*************************************************************************
 SINGLETON CLASS DEFINITION
 ************************************************************************ */

singleton.instance = null;

/**
 * Singleton getInstance definition
 * @return singleton class
 */
singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
}

module.exports = singleton.getInstance();