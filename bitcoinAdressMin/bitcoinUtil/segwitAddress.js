var segwit_addr = require('./javascript/segwit_addr.js');
var utils = require('./prototype.js');

function encodeSegWitFromPri(_priKeyHex) {
	let pubKeyHex = utils.getPublicKeyFromPrivate(_priKeyHex).toString('hex');
	_priKeyHex = null;
	return encodeSegWitFromPub(pubKeyHex);
}

//compressed
function encodeSegWitFromPub(_compressPubKeyHex) {
	let hash160B = utils.hash160FromHex(_compressPubKeyHex);
	let address = segwit_addr.encode('bc', 0, hash160B);
	return address;
}

module.exports = {
	encodeSegWitFromPub: encodeSegWitFromPub,
	encodeSegWitFromPri: encodeSegWitFromPri
}