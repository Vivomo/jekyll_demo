/**
 * spa.js
 * Root namespace module
 */

/*jslint                browser : true,     continue : true,
    devel : true,       indent : 2,         maxerr : 50
    newcap : true,      nomen : true,       pluspus : true,
    regexp : true,      sloppy : true,      vars : false,
    white : true
 */

/*global $, spa*/

var spa = (function () {
    var initModule = function ($container) {
        $container.html('<h1>Hello World</h1>');
    };

    return {initModule : initModule};
}());