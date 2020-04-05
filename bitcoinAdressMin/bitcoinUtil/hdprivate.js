var bigInt = require("big-integer");
var prototype = require('./prototype.js');

// child keys use indices 231 through 232-1
var seed = '000102030405060708090a0b0c0d0e0f';
const hardendPlusBI = bigInt(2).pow(31);
const hardendMaxBI = bigInt(2).pow(32).minus(1);
const n = bigInt("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", 16);

const secret = 'Bitcoin seed';

const hardedSep = 2 ** 31;

function generatePrivate(_path, _seed) {


	let pathComponets = parsePath(_path);
	if (!pathComponets) {
		throw new Error('invalid path');
		return;
	}
	// pathComponets 
	// [0,0,2,1]

	let lastKey; // {chaincode,key} buffer
	for (let i = 0; i < pathComponets.length; i++) {
		let nodeNum = pathComponets[i];
		if (i === 0) {
			let masterKey = generateMasterKey(_seed);
			lastKey = masterKey;
			continue;
		} else if (!lastKey || lastKey.key.length < 1) {
			throw new Error('key generate internal errror');
		}
		if (nodeNum < hardedSep) {
			lastKey = generateNextNonHardedKey(lastKey, nodeNum);
		} else {

			lastKey = generateNextHardenedPKey(lastKey, nodeNum);
		}

	}

	return lastKey.key;
}

function parsePath(_path) {
	let test = /^\/m(?:\/\d+'?)*/.test(_path);
	if (!test)
		return null;

	let indexs = _path.split('/');
	indexs = indexs.slice(1);

	if (indexs[0] !== 'm')
		return null;

	indexs[0] = 0;
	for (let i = 1; i < indexs.length; i++) {

		let node = indexs[i];

		let nodeNum = checkHardend(node);
		indexs[i] = nodeNum;
	}
	return indexs;
}


function generateMasterKey(_seed) {

	let result = prototype.hmacSha512FromText(secret, _seed);
	let IL = result.slice(0, 32);
	let IR = result.slice(32);

	let ILBI = bigInt(IL.toString('hex'), 16);
	if (ILBI.compare(0) === 0 || ILBI.compare(n) >= 0) {
		throw new Error('master key wrong chose other seed');
	}
	var res_ = {};
	res_.key = IL;
	res_.chaincode = IR;
	return res_;
}

function generateNextNonHardedKey(_lastKey, _index) {

	let index = Buffer.alloc(4);
	index.writeUInt32BE(_index, 0);
	let compressPubKey = prototype.getPublicKeyFromPrivate(_lastKey.key.toString('hex'), true);
	let totalData = Buffer.concat([compressPubKey, index]);
	let result = prototype.hmacSha512FromBuffer(_lastKey.chaincode, totalData.toString('hex'));

	let key = calculateKeyFromHash(result, _lastKey);
	if (key.isRecompute) {
		return generateNextNonHardedKey(_lastKey, _index + 1);
	}
	return key;
}

//buffer 
function calculateKeyFromHash(_result, _lastKey) {

	let IL = _result.slice(0, 32);
	let IR = _result.slice(32);

	let lastKeyBI = bigInt(_lastKey.key.toString('hex'), 16);
	let ILBI = bigInt(IL.toString('hex'), 16);

	if (ILBI.compare(n) >= 0)
		return {
			isRecompute: true
		};

	let key = bigInt(IL.toString('hex'), 16).add(lastKeyBI).mod(n);
	if (key.compare(bigInt(0)) == 0)
		return {
			isRecompute: true
		};


	//数字和私钥格式有区别
	let keyString = key.toString(16);
	if (keyString.length < 64) {

		for (let i = 0; i < 64 - keyString.length; i++) {
			keyString = '0' + keyString;
		}

	} else if (keyString.length > 64) {
		throw new Error('key calculate internal error');
	}

	var res_ = {};
	res_.key = Buffer.from(keyString, 'hex');
	res_.chaincode = IR;
	// console.log('calculateKeyFromHash key ',key.toString(16))
	return res_;
}

function generateNextHardenedPKey(_lastKey, _index) {
	let prefix = Buffer.from('00', 'hex');
	let index = Buffer.alloc(4);
	index.writeUInt32BE(_index, 0);
	let totalData = Buffer.concat([prefix, _lastKey.key, index]);
	let result = prototype.hmacSha512FromBuffer(_lastKey.chaincode, totalData.toString('hex'));
	let key = calculateKeyFromHash(result, _lastKey);
	if (key.isRecompute) {
		console.log('isRecompute', _index)
		return generateNextHardenedPKey(_lastKey, _index + 1);
	}
	return key;
}

function checkHardend(_nodeStr) {
	if (_nodeStr.slice(-1) === `'`) {
		let index = parseInt(_nodeStr.slice(0, -1), 10);
		index = 2 ** 31 + index;
		return index;
	} else {
		let index = parseInt(_nodeStr, 10);
		return index;
	}
}

// generateSegWitAddressFromPrivateKey(lastKey);
// 
module.exports = {
	generatePrivate: generatePrivate,
	parsePath: parsePath
}