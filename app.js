/**
 * Created by blossom on 1/10/17.
 */

var fs = require('fs');
var http = require('http');
var cmd=require('node-cmd');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./ConfigData/PreConfig');
var exec = require('child_process').exec, child;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/TesterNode', function (request, response) {

    console.log(config.getPreconfigration());

    var testcase = request.body['TestcaseName'];
    var parameters = request.body['TestcaseParameter'];
    var command = 'python start.py';

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

    fs.writeFile('/home/blossom/work/TitanRel/bin/Config.cfg', rootConfig, function (err) {
        if (err)
            console.log('FATAL An error occurred trying to write in the file: ' + err);
        else {
            console.log('******* Unsubscription Success *******');
            console.log('After 10 seconds, Server is run...');
        }
    });

    /*
    child = exec(command, {cwd: '/home/blossom/work/TitanRel/bin'}, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);

        if (error !== null) {
            response.status(500).send(stdout);
        } else {
            response.status(200).send(stdout);
        }
    });

    /*
    if(parameters =='NoArgument') {
        console.log('in no argument');
        var command = 'python start.py' + " " + testcase + " " + "NoArgument";
        console.log(command);
    }

    else
        var command = 'python start.py' + " " + testcase + " " + parameters;

    child = exec(command, {cwd: '/home/blossom/work/TitanRel/bin'}, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);

        if (error !== null) {
            response.status(500).send(error);
        } else {
            response.status(200).send(stdout);
        }
    }); */

    /* Old Version using node-cmd npm module
    console.log("Entering : " + request.body['TestCase']);
    console.log("Entering2 : " + request.body['Parameters']);

    // Setting the testing config file with parameter from Master node
    var parameters = request.body['Parameters'];
    console.log(typeof (parameters));
        console.log(parameters[i]);
    }

    fs.writeFile('/home/blossom/work/Test/bin/parameterFile.txt', parameters, 'utf8', function(err) {

        // Modifying oneM2M config file
        cmd.get(
            `
                cd /home/blossom/work/Test/bin
                python start.py
            `, function(data){
                console.log('the node-cmd cloned dir contains these files :\n\n', data)
                response.status(200).send(data);
            }
         );
     }); */
});

// Server start
http.createServer(app).listen(62590, function () {
    console.log('Server running port at ' + 'http://192.168.81.133:62590');
});