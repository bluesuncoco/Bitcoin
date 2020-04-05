var prototype = require('./prototype.js');


let opcodes = {
	1: Buffer.from("51", 'hex'),
	2: Buffer.from("52", 'hex'),
	3: Buffer.from("53", 'hex'),
	4: Buffer.from("54", 'hex'),
	5: Buffer.from("55", 'hex'),
	6: Buffer.from("56", 'hex'),
	7: Buffer.from("57", 'hex'),
	8: Buffer.from("58", 'hex'),
	9: Buffer.from("59", 'hex'),
	10: Buffer.from("5a", 'hex'),
	11: Buffer.from("5b", 'hex'),
	12: Buffer.from("5c", 'hex'),
	13: Buffer.from("5d", 'hex'),
	14: Buffer.from("5e", 'hex'),
	15: Buffer.from("5f", 'hex'),
	16: Buffer.from("60", 'hex')
};
// OP_CHECKMULTISIG 0xae
const OP_CHECKMULTISIG = Buffer.from('ae', 'hex');
const Prefix = Buffer.from('05','hex');

//integer integer array(string)
function generateMultiSegAddress(_m, _n, _publicKeys) {

	if (_m <= 0 || _n <=0 ) {
		throw new Error('m or n should not less than zero');
	}

	if (_m > _n) {
		throw new Error('m should less or equal to n');
	}

	if (_n > 15) {
		throw new Error('n should not greater than 15');
	}
	if (_publicKeys.length != _n) {
		throw new Error('n should equal to length of provided pulick keys');
	}

	let op_m = opcodes[_m];
	let op_n = opcodes[_n];
	let buffers = [];
	buffers.push(op_m);
	for (let i = 0; i < _publicKeys.length; i++) {
		let pubBuf = Buffer.from(_publicKeys[i],'hex');
		//check valid public key
		let lengthOfPublic = Buffer.alloc(1);
		lengthOfPublic.writeInt8(pubBuf.length,0);
		buffers.push(lengthOfPublic);
		buffers.push(pubBuf);
	}

	buffers.push(op_n);
	buffers.push(OP_CHECKMULTISIG);
	let totalData = Buffer.concat(buffers);
	let hash160 = prototype.hash160FromHex(totalData.toString('hex'));
	let finalData = Buffer.concat([Prefix,hash160]);

	let sha256 = prototype.sha256FromHex(finalData.toString('hex'));
	sha256 = prototype.sha256FromHex(sha256.toString('hex'));
	let checkSum = sha256.slice(0,4);
	// console.log('checkSum ',checkSum.toString('hex'));

	let encodeData = Buffer.concat([finalData,checkSum]);
	return prototype.base58Encode(encodeData);
}

module.exports = {
	generateMultiSegAddress: generateMultiSegAddress
}

