let hd = require('./hdprivate.js');
const assert = require('assert')

let p = hd.parsePath(`/m/32/234/123`);
console.log(p);
assert.deepEqual(p,[0,32,234,123])


let p2 = hd.parsePath(`/m/32'/234/123'`);
console.log(p2);
assert.deepEqual(p2,[0,2147483680,234,2147483771]);


let phard = hd.generatePrivate(`/m/0'/1/2'/2/1000000000`,'000102030405060708090a0b0c0d0e0f');
// console.log(phard.key.toString('hex'));
// console.log(phard.chaincode.toString('hex'));

assert.equal(phard.key.toString('hex'),'471b76e389e528d6de6d816857e012c5455051cad6660850e58372a6c3e6e7c8');
assert.equal(phard.chaincode.toString('hex'),'c783e67b921d2beb8f6b389cc646d7263b4145701dadd2161548a8b078e65e9e');


let phard2 = hd.generatePrivate(`/m/0/2147483647'/1/2147483646'/2`,'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542');

assert.equal(phard2.key.toString('hex'),'bb7d39bdb83ecf58f2fd82b6d918341cbef428661ef01ab97c28a4842125ac23');
assert.equal(phard2.chaincode.toString('hex'),'9452b549be8cea3ecb7a84bec10dcfd94afe4d129ebfd3b3cb58eedf394ed271');


let phard3 = hd.generatePrivate(`/m/0'`,'4b381541583be4423346c643850da4b320e46a87ae3d2a4e6da11eba819cd4acba45d239319ac14f863b8d5ab5a0d0c64d2e8a1e7d1457df2e5a3c51c73235be');
console.log(phard3.key.toString('hex'));
console.log(phard3.chaincode.toString('hex'));

assert.equal(phard3.key.toString('hex'),'491f7a2eebc7b57028e0d3faa0acda02e75c33b03c48fb288c41e2ea44e1daef');
assert.equal(phard3.chaincode.toString('hex'),'e5fea12a97b927fc9dc3d2cb0d1ea1cf50aa5a1fdc1f933e8906bb38df3377bd');