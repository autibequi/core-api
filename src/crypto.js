const Promise = require('bluebird');
const crypto = Promise.promisifyAll(require('crypto'));
const db = require("./database");

const checkPassword = function (fullhash, password) {
    console.log("LETS CHECK", fullhash, password)
    const hashsplit = fullhash.split('$')

    const algo = hashsplit[0]
    const iter = parseInt(hashsplit[1])
    const salt = hashsplit[2]
    const oldhash = hashsplit[3]

    const derivedKey = crypto.pbkdf2Sync(password, salt, iter, 32, 'sha256')
    var newhash = derivedKey.toString('base64');
    console.log(newhash)
    console.log(oldhash)

    // TODO: Improve promisse error/success handling
    if (oldhash != newhash) {
        return Promise.reject("WRONG PASSWORD")
    }
    return Promise.resolve("GOOD PASSWORD")
}

const createToken = (user) =>
    crypto.randomBytesAsync(20)
        .then(bytes => bytes.toString('hex'))
        // TODO: Change this to REDIS tokens to improve latency
        .then((key) => db.Token.create({ key, user_id: user.get('id') }))

module.exports = { checkPassword, createToken };
