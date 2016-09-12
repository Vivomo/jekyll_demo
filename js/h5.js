/**
 * Created by ui on 2016/9/12.
 */

function extend(o1, o2) {
    if(o1 && o2)
        for (var k in o2)
            o1[k] = o2[k]
    return o1;
}

function Print(cfg) {

    if (this.constructor != Print) {
        return new Print(cfg)
    }
    this.cfg = extend({
        pauseTime : 400,//ms
        tag : 'span',
        callback : null
    }, cfg);


}

Print.prototype = {
    constructor : Print,
    write : function (cursor, word) {
        cursor.style.display = 'inline-block';
        var i = 0;
        var interval = setInterval(function () {
            if (i >= word.length) {
                cursor.style.display = 'none';
                return clearInterval(interval);
            }
            this.pushLetter(cursor, word[i++]);
        }.bind(this), this.cfg.pauseTime)
    },
    pushLetter : function (cursor, letter) {
        var elem = document.createElement(this.cfg.tag);
        elem.innerText = letter;
        cursor.parentNode.insertBefore(elem, cursor);
    }

};