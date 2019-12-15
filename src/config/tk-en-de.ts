const aesjs = require('aes-js');

export function encriptTk(token?: string, secret_key?: string) {
    let key = aesjs.utils.utf8.toBytes(secret_key);
    var textBytes = aesjs.utils.utf8.toBytes(token);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    localStorage.setItem('ecr', encryptedHex)
    return encryptedHex;
}

export function decriptTk(data?: string, secret_key?: string) {
    let key = aesjs.utils.utf8.toBytes(secret_key);
    let encryptedHex = localStorage.getItem('ecr');

    if (!encryptedHex) {
        return
    }

    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
}