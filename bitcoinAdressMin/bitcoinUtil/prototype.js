// hmac sha512

var crypto = require('crypto');
var bs58 = require('bs58')


// const address = '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS'
// const bytes = bs58.decode(address)
// console.log(out.toString('hex'))
function base58Encode(_buffer) {
	let address = bs58.encode(_buffer)
	return address;
}

// return buffer
function base58Decode(_base58S) {
	return bs58.decode(_base58S);
}

// return buffer 
function hmacSha512(_secret, _hex) {

	var hmac = crypto.createHmac('sha512', _secret);
	hmac.update(_hex, 'hex');
	return hmac.digest()

}

//hex _secret
function hmacSha512FromHex(_secret, _hex) {

	let _secretBuffer = Buffer.from(_secret, 'hex');
	return hmacSha512(_secretBuffer, _hex);

}

function hmacSha512FromBuffer(_secret, _hex) {

	return hmacSha512(_secret, _hex);

}

function hmacSha512FromText(_secret, _hex) {

	let _secretBuffer = Buffer.from(_secret, 'utf8');
	return hmacSha512(_secretBuffer, _hex);
}

function sha256FromHex(_hex) {
	let hash = crypto.createHash('sha256');
	hash.update(_hex, 'hex');
	return hash.digest();
}


function ripemd160FromHex(_hex) {
	let hash = crypto.createHash('RIPEMD160');
	hash.update(_hex, 'hex');
	return hash.digest();
}

function hash160FromHex(_hex) {
	let sha256Hex = sha256FromHex(_hex).toString('hex');
	return ripemd160FromHex(sha256Hex);
}

//return buffer
function getPublicKeyFromPrivate(_privateHex, _compressed = true) {

	compressedFlag = _compressed ? 'compressed' : 'uncompressed';
	let ecdh = crypto.createECDH('secp256k1');
	ecdh.setPrivateKey(_privateHex, 'hex');
	return ecdh.getPublicKey(null, compressedFlag);
}

module.exports = {
	hmacSha512: hmacSha512,
	hmacSha512FromText: hmacSha512FromText,
	hmacSha512FromHex: hmacSha512FromHex,
	hmacSha512FromBuffer:hmacSha512FromBuffer,
	sha256FromHex: sha256FromHex,
	ripemd160FromHex: ripemd160FromHex,
	hash160FromHex: hash160FromHex,
	getPublicKeyFromPrivate: getPublicKeyFromPrivate,
	base58Encode:base58Encode,
	base58Decode:base58Decode
}