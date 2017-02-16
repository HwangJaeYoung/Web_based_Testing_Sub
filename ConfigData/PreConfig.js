/**
 * Created by blossom on 2/15/17.
 */

exports.getPreconfigration = function (unusedPortNumber) {
    var configText =
        '[LOGGING]\n' +
        'FileMask := LOG_ALL | DEBUG | ERROR | USER | WARNING | TESTCASE | STATISTICS\n' +
        'ConsoleMask := DEBUG | TESTCASE | PORTEVENT | ERROR | STATISTICS | MATCHING | VERDICTOP_SETVERDICT\n' +
        'SourceInfoFormat := Single\n' +
        'LogFile := "../log /OneM2MTesterLog-%n.log"\n' +
        '#LogSourceInfo := Stack\n\n' +

        '[TESTPORT_PARAMETERS]\n' +
        'system.HTTP_client_port.VERIFYCERTIFICATE := "no\n"' +
        'system.HTTP_server_port.use_notification_ASPs := "no\n"' +
        'system.*.http_debugging := "yes"\n\n' +

        '[MAIN_CONTROLLER]\n' +
        'KillTimer := 1\n' +
        'TCPPort := ' + unusedPortNumber + '\n';

    return configText
}