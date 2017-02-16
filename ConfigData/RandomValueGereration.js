/**
 * Created by blossom on 2/15/17.
 */

const crypto = require('crypto');

var randomValueBase64 = function(len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, len)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
};

exports.getRandomValue = function () {
    var cur_d = new Date();
    var msec = '';

    if((parseInt(cur_d.getMilliseconds(), 10) < 10)) {
        msec = ('00' + cur_d.getMilliseconds());
    } else if((parseInt(cur_d.getMilliseconds(), 10) < 100)) {
        msec = ('0' + cur_d.getMilliseconds());
    } else {
        msec = cur_d.getMilliseconds();
    }

    var time = cur_d.toISOString().replace(/-/, '').replace(/-/, '').replace(/T/, '').replace(/:/, '').replace(/:/, '').replace(/\..+/, '') + msec + randomValueBase64(4);

    return time;
}