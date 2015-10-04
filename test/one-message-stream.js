'use strict';

var Readable = require('stream').Readable;
var util = require('util');
util.inherits(OneMessageStream, Readable);

/**
 * A stream which emits one 'data' event with a supplied message.
 * @param {String} message The data to be passed to the 'data' event
 * @param {Error} error If passed, an 'error' event is triggered with it upon reading the stream.
 */
function OneMessageStream(message, error) {
    var readOnce = false;
    Readable.call(this);
    this._read = function(){
        if (!readOnce) {
            this.push(message);
            if (error) {
                this.emit('error', error);
            }
            readOnce = true;
        } else {
            this.push(null);
        }
    };
}

module.exports = OneMessageStream;