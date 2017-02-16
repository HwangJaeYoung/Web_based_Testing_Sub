/**
 * Created by blossom on 2/15/17.
 */

var tcpPortUsed = require('tcp-port-used');

exports.getUsedPort = function (portNumber) {

    var usedPort = '';

    tcpPortUsed.check(portNumber, '127.0.0.1').then(function (inUse) {
        usedPort = inUse;
        console.log('Port usage: ' + inUse);
    }, function (err) {
        console.error('Error on check:', err.message);
    });
    return usedPort;
}