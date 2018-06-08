const Promise = require('bluebird');
const crypto = Promise.promisifyAll(require('crypto'));

const checkStreamingPermission = function (token) {
    // IMPLEMENT THE STREAMING AUTHORIZATION ALGORITHM HERE
    return Promise.resolve(true);
}

module.exports = { checkStreamingPermission };