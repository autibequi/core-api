const Promise = require('bluebird');
const crypto = Promise.promisifyAll(require('crypto'));

const checkStreamingPermission = function (token) {
    return Promise.resolve(true);
}

module.exports = { checkStreamingPermission };