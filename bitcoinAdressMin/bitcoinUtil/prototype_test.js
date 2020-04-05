var pro = require('./prototype.js');
const assert = require('assert');

var hdp = require('./hdprivate.js'); 

var hmac = pro.hmacSha512FromText('Bitcoin seed','000102030405060708090a0b0c0d0e0f')
assert.equal(hmac.toString('hex'),'e8f32e723decf4051aefac8e2c93c9c5b214313817cdb01a1494b917c8436b35873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508','from text secret hmac wrong');

var hmac2 = pro.hmacSha512FromHex('47fdacbd0f1097043b78c63c20c34ef4ed9a111d980047ad16282c7ae6236141','035A784662A4A20A65BF6AAB9AE98A6C068A81C52E4B032C0FB5400C706CFCCC5600000001');
assert.equal(hmac2.toString('hex'),'4eb9d78157bae7a24115001621c4d91e3a3110e11e143c5259eaa4e55c5ec4bf2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19','hmac from hex wrong');

var sha256 = pro.sha256FromHex('009cbb933aa619d2f352ef91e6e58cefd2d98d5ab86de03a77')
assert.equal(sha256.toString('hex'),'0a5f2194a68f1838368f2b1c2e6971f95391d8f0a43a4eb18a425f24cd1c429a');

var ripemd160 = pro.ripemd160FromHex('009cbb933aa619d2f352ef91e6e58cefd2d98d5ab86de03a77')
assert.equal(ripemd160.toString('hex'),'8e133d1437af3a7aca48ef1572003e2b581bb4f0');


var hash160 = pro.hash160FromHex('009cbb933aa619d2f352ef91e6e58cefd2d98d5ab86de03a77')
assert.equal(hash160.toString('hex'),'9419563c93a3d7b1297448864170a3419fd9904f');

var uncompress = pro.getPublicKeyFromPrivate('71EE3A1DDB8AA96DD93D4A08F9931C0C4254CD238E6E3AFBDEF5480A068AA868',false);
// console.log(uncompress.toString('hex'))
assert.equal(uncompress.toString('hex'),'044cffea626fa0c47abcb97250d7093e335278d92337c140fd50658080a3b0686bd099aed61921a6b4bbfb0ae2431922eb1cac0f67e83f20493d40bb584164c5ee');


var uncompress = pro.getPublicKeyFromPrivate('84175167A9FF20A2C210C420261DB025CF4636A9AF06C20899F1E6272DCD7F60',true);
assert.equal(uncompress.toString('hex'),'032b406305faeb5c4d3db9735c6383752244e2f09c36c340266ad34659c51825c5');


var compressed = pro.getPublicKeyFromPrivate('0f479245fb19a38a1954c5c7c0ebab2f9bdfd96a17563ef28a6a4b1a2a764ef4',true);
console.log('----')
console.log(compressed.toString('hex'));


var base58 = pro.base58Encode(Buffer.from('009cbb933aa619d2f352ef91e6e58cefd2d98d5ab86de03a77','hex'));
// console.log(base58);
assert.equal(base58,'1FHj7sdXEmh4pWTmfHhptZXuQUq3Ja9ujt')

var decodeBase58 = pro.base58Decode('1FHj7sdXEmh4pWTmfHhptZXuQUq3Ja9ujt');
assert.equal(decodeBase58.toString('hex'),'009cbb933aa619d2f352ef91e6e58cefd2d98d5ab86de03a77');


var private = hdp.generatePrivate('/m/0','000102030405060708090a0b0c0d0e0f');
console.log(private.toString('hex'))
assert.equal(private.toString('hex'),'edb2e14f9ee77d26dd93b4ecede8d16ed408ce149b6cd80b0715a2d911a0afea')




