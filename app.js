/**
 * Created by blossom on 1/10/17.
 */

var fs = require('fs');
var http = require('http');
var cmd=require('node-cmd');
var express = require('express');
var bodyParser = require('body-parser');
var tcpPortUsed = require('tcp-port-used');
var config = require('./ConfigData/PreConfig');
var randomValueGeration = require('./ConfigData/RandomValueGereration');
var exec = require('child_process').exec, child;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/TesterNode', function (request, response) {

    var portUsedCheckFunc= function (portIndex) {
        tcpPortUsed.check(portIndex, '127.0.0.1').then(function (inUse) {
            console.log('Port usage: ' + portIndex + " " + inUse);

            if(portIndex < 1024) {
                if(inUse == true) {
                    portIndex += 1;
                    portUsedCheckFunc(portIndex);
                } else {

                }
            }

        }, function (err) {
            console.error('Error on check:', err.message);
        });
    }

    var portIndex = 1;

    tcpPortUsed.check(portIndex, '127.0.0.1').then(function (inUse) {
        console.log('Port usage: ' + portIndex + " " + inUse);

        if(portIndex < 1024) {
            if(inUse == true) { // Already in use
                portIndex += 1;
                portUsedCheckFunc(portIndex);
            } else {
                console.log("asdf123123123");
                var currentIndex = 0;
                var testcase = request.body['TestcaseName'];
                var parameters = request.body['TestcaseParameter'];
                var configPath = '/home/blossom/work/TitanRel/bin/';

                console.log("asdf");
                console.log(randomValueGeration.getRandomValue());
                // Creating Configuration file Path
                configPath += 'Config' + randomValueGeration.getRandomValue() + '.cfg';

                console.log(configPath);

                // Creating EXECUTE config
                var execution = '\n[EXECUTE]\n';
                for(var i = 0; i < testcase.length; i++)
                    execution += 'OneM2M_Testcases.' + testcase[i] + '\n';

                // Creating MODULE Parameter
                var moduleParameter = '\n[MODULE_PARAMETER]\n';
                for(var i = 0; i < parameters.length; i++)
                    moduleParameter += parameters[i] + '\n';

                var rootConfig = config.getPreconfigration();
                rootConfig += moduleParameter;
                rootConfig += execution;

                fs.writeFile(configPath, rootConfig, function (err) {
                    if (err)
                        console.log('FATAL An error occurred trying to write in the file: ' + err);
                    else {
                        console.log('******* Unsubscription Success *******');
                        console.log('After 10 seconds, Server is run...');
                    }
                });
            }
        }
    }, function (err) {
        console.error('Error on check:', err.message);
    });

    /*
    console.log(config.getPreconfigration());

    var currentIndex = 0;
    var testcase = request.body['TestcaseName'];
    var parameters = request.body['TestcaseParameter'];
    var configPath = '/home/blossom/work/TitanRel/bin/';

    // Creating Configuration file Path
    configPath += 'Confing' + randomValueGeration.getRandomValue() + '.cfg';

    // Creating EXECUTE config
    var execution = '\n[EXECUTE]\n';
    for(var i = 0; i < testcase.length; i++)
        execution += 'OneM2M_Testcases.' + testcase[i] + '\n';

    // Creating MODULE Parameter
    var moduleParameter = '\n[MODULE_PARAMETER]\n';
    for(var i = 0; i < parameters.length; i++)
        moduleParameter += parameters[i] + '\n';

    var rootConfig = config.getPreconfigration();
    rootConfig += moduleParameter;
    rootConfig += execution;

    fs.writeFile(configPath, rootConfig, function (err) {
        if (err)
            console.log('FATAL An error occurred trying to write in the file: ' + err);
        else {
            console.log('******* Unsubscription Success *******');
            console.log('After 10 seconds, Server is run...');
        }
    });


    var command = 'python start.py' + ' ' + configPath;

    child = exec(command, {cwd: '/home/blossom/work/TitanRel/bin'}, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);

        if (error !== null) {
            response.status(500).send(stdout);
        } else {
            response.status(200).send(stdout);
        }
    });*/
});

// Server start
http.createServer(app).listen(62590, function () {
    console.log('Server running port at ' + 'http://192.168.81.133:62590');
});